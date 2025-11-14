import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useState, useRef } from "react";
import { styles } from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { useTransactions } from "../../hooks/useTransactions";
import { CustomAlert } from "../../components/CustomAlert";
import {COLORS_MASTER} from "../../constants/colorsMaster";

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "restaurant", color: "#FF6B6B" },
  { id: "shopping", name: "Shopping", icon: "bag", color: "#4ECDC4" },
  { id: "transportation", name: "Transportation", icon: "car-sport", color: "#45B7D1" },
  { id: "bills", name: "Bills", icon: "receipt", color: "#FECA57" },
  { id: "entertainment", name: "Entertainment", icon: "game-controller", color: "#96CEB4" },
  { id: "income", name: "Income", icon: "trending-up", color: "#6C5CE7" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal-circle", color: "#A0A0A0" },
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'success',
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
    showCancel: false,
  });

  const { createTransaction, validateTransactionData } = useTransactions(user.id);

  const [fieldErrors, setFieldErrors] = useState({
    title: '',
    amount: '',
    category: ''
  });

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'title':
        if (!value || !value.trim()) {
          error = 'Title is required';
        } else if (value.trim().length > 100) {
          error = 'Title must not exceed 100 characters';
        }
        break;

      case 'amount':
        if (!value || value.toString().trim() === '') {
          error = 'Amount is required';
        } else {
          const numericAmount = parseFloat(value);
          if (isNaN(numericAmount)) {
            error = 'Please enter a valid number';
          } else if (numericAmount <= 0) {
            error = 'Amount must be greater than 0';
          } else if (numericAmount > 999999.99) {
            error = 'Amount cannot exceed $999,999.99';
          } else if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
            error = 'Maximum 2 decimal places allowed';
          }
        }
        break;

      case 'category':
        if (!value || !value.trim()) {
          error = 'Please select a category';
        }
        break;
    }

    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return error === '';
  };

  const isFormValid = () => {
    const hasTitle = title && title.trim().length <= 100;
    const hasValidAmount = amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && parseFloat(amount) <= 999999.99;
    const hasCategory = selectedCategory && selectedCategory.trim();
    const noErrors = !fieldErrors.title && !fieldErrors.amount && !fieldErrors.category;

    return hasTitle && hasValidAmount && hasCategory && noErrors;
  };

  const showAlert = (type, title, message, onConfirm = () => {}, onCancel = () => {}, showCancel = false) => {
    setAlertConfig({
      type,
      title,
      message,
      onConfirm: () => {
        setAlertVisible(false);
        onConfirm();
      },
      onCancel: () => {
        setAlertVisible(false);
        onCancel();
      },
      showCancel,
    });
    setAlertVisible(true);
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setSelectedCategory("");
    setIsExpense(true);
    setFieldErrors({
      title: '',
      amount: '',
      category: ''
    });
  };

  const handleCreate = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    const validationErrors = validateTransactionData({
      title,
      amount,
      category: selectedCategory
    });

    if (validationErrors.length > 0) {
      showAlert("error", "Validation Error", validationErrors.join('\n'));
      return;
    }

    if (!isFormValid()) {
      showAlert("error", "Invalid Input", "Please fill in all required fields correctly before saving.");
      return;
    }

    setIsLoading(true);
    try {
      await createTransaction({
        user_id: user.id,
        title,
        amount,
        category: selectedCategory,
        isExpense,
      }, showAlert);

      showAlert("success", "Success", "Transaction created successfully", () => {
        router.back();
      });
    } catch (error) {
      showAlert("error", "Error", error.message || "Failed to create transaction");
      console.error("Error creating transaction:", error);
    } finally {
      setIsLoading(false);
      resetForm()
    }
  };

  const selectedCategoryData = CATEGORIES.find(cat => cat.name === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS_MASTER.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.saveButtonContainer,
              (isLoading || !isFormValid()) && styles.saveButtonDisabled
            ]}
            onPress={handleCreate}
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS_MASTER.white} />
            ) : (
              <>
                <Text style={[
                  styles.saveButton,
                  !isFormValid() && styles.saveButtonDisabledText
                ]}>
                  Save
                </Text>
                {isFormValid() && <Ionicons name="checkmark" size={18} color={COLORS_MASTER.primary} />}
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(true)}
          >
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: isExpense
                ? `${COLORS_MASTER.white}20`
                : `${COLORS_MASTER.expense}15`,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
              <Ionicons
                name="arrow-down"
                size={18}
                color={isExpense ? COLORS_MASTER.white : COLORS_MASTER.expense}
              />
            </View>
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(false)}
          >
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: !isExpense
                ? `${COLORS_MASTER.white}20`
                : `${COLORS_MASTER.income}15`,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
              <Ionicons
                name="arrow-up"
                size={18}
                color={!isExpense ? COLORS_MASTER.white : COLORS_MASTER.income}
              />
            </View>
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={[
              styles.amountInput,
              fieldErrors.amount && styles.inputError
            ]}
            placeholder="0.00"
            placeholderTextColor={COLORS_MASTER.textLight}
            value={amount}
            onChangeText={(value) => {
              setAmount(value);
              validateField('amount', value);
            }}
            onBlur={() => validateField('amount', amount)}
            keyboardType="numeric"
          />
        </View>
        {fieldErrors.amount ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color={COLORS_MASTER.error} />
            <Text style={styles.errorText}>{fieldErrors.amount}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Ionicons
            name="text"
            size={22}
            color={COLORS_MASTER.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              fieldErrors.title && styles.inputError
            ]}
            placeholder="What's this transaction for?"
            placeholderTextColor={COLORS_MASTER.textLight}
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              validateField('title', value);
            }}
            onBlur={() => validateField('title', title)}
            maxLength={100}
          />
        </View>
        {fieldErrors.title ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color={COLORS_MASTER.error} />
            <Text style={styles.errorText}>{fieldErrors.title}</Text>
          </View>
        ) : null}

        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: selectedCategoryData
                ? `${selectedCategoryData.color}15`
                : `${COLORS_MASTER.primary}15`,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}>
              <Ionicons
                name="apps"
                size={14}
                color={selectedCategoryData?.color || COLORS_MASTER.primary}
              />
            </View>
            <Text style={styles.sectionTitle}>Choose Category</Text>
          </View>

          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name && styles.categoryButtonActive,
                  selectedCategory === category.name && {
                    backgroundColor: category.color,
                    borderColor: category.color,
                  }
                ]}
                onPress={() => {
                  setSelectedCategory(category.name);
                  validateField('category', category.name);
                }}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: selectedCategory === category.name
                    ? `${COLORS_MASTER.white}20`
                    : `${category.color}15`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}>
                  <Ionicons
                    name={category.icon}
                    size={14}
                    color={selectedCategory === category.name ? COLORS_MASTER.white : category.color}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.name && styles.categoryButtonTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {fieldErrors.category ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={COLORS_MASTER.error} />
              <Text style={styles.errorText}>{fieldErrors.category}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
        showCancel={alertConfig.showCancel}
      />
    </View>
  );
};

export default CreateScreen;