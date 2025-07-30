import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { styles } from "../../assets/styles/create.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTransactions } from "../../hooks/useTransactions";
import { CustomAlert } from "../../components/CustomAlert";

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();

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

  const handleCreate = async () => {
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
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            (isLoading || !isFormValid()) && styles.saveButtonDisabled
          ]}
          onPress={handleCreate}
          disabled={isLoading || !isFormValid()}
        >
          <Text style={[
            styles.saveButton,
            !isFormValid() && styles.saveButtonDisabledText
          ]}>
            {isLoading ? "Saving..." : "Save"}
          </Text>
          {!isLoading && isFormValid() && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>
        {fieldErrors.category ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color={COLORS.expense} />
            <Text style={styles.errorText}>{fieldErrors.category}</Text>
          </View>
        ) : null}

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={[
              styles.amountInput,
              fieldErrors.amount && styles.inputError
            ]}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
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
            <Ionicons name="alert-circle" size={16} color={COLORS.expense} />
            <Text style={styles.errorText}>{fieldErrors.amount}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              fieldErrors.title && styles.inputError
            ]}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
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
            <Ionicons name="alert-circle" size={16} color={COLORS.expense} />
            <Text style={styles.errorText}>{fieldErrors.title}</Text>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => {
                setSelectedCategory(category.name);
                validateField('category', category.name);
              }}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                style={styles.categoryIcon}
              />
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
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

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