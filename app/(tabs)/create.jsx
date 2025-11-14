import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomAlert } from "../../components/CustomAlert";
import { useTheme } from "../../contexts/ThemeContext";
import { useTransactions } from "../../hooks/useTransactions";
import { formatRupiah } from "../../lib/utils";

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
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    backButton: {
      padding: 5,
    },
    saveButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
    saveButton: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: "600",
    },
    saveButtonDisabledText: {
      color: colors.textLight,
    },
    card: {
      backgroundColor: colors.card,
      margin: 16,
      borderRadius: 16,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    typeSelector: {
      flexDirection: "row",
      marginBottom: 20,
      gap: 10,
    },
    typeButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.border,
    },
    typeButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    typeIcon: {
      marginRight: 8,
    },
    typeButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "500",
    },
    typeButtonTextActive: {
      color: colors.white,
    },
    amountContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 16,
      marginBottom: 20,
    },
    currencySymbol: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.text,
      marginRight: 8,
    },
    amountInput: {
      flex: 1,
      fontSize: 36,
      fontWeight: "bold",
      color: colors.text,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
      backgroundColor: colors.white,
    },
    inputIcon: {
      marginHorizontal: 12,
    },
    input: {
      flex: 1,
      padding: 12,
      fontSize: 16,
      color: colors.text,
    },
    inputError: {
      borderColor: colors.expense,
      borderBottomColor: colors.expense,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      marginTop: -15,
      paddingHorizontal: 0,
    },
    errorText: {
      color: colors.expense,
      fontSize: 12,
      marginLeft: 5,
      flex: 1,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 15,
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    categoryButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.white,
    },
    categoryButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryIcon: {
      marginRight: 6,
    },
    categoryButtonText: {
      color: colors.text,
      fontSize: 14,
    },
    categoryButtonTextActive: {
      color: colors.white,
    },
    loadingContainer: {
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const router = useRouter();
  const { user } = useUser();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");
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

  // Handle amount input with Rupiah formatting
  const handleAmountChange = (text) => {
    // Remove all non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    
    if (numericValue === '') {
      setAmount('');
      setDisplayAmount('');
      return;
    }

    // Convert to number
    const numValue = parseInt(numericValue);
    
    // Set raw amount for validation
    setAmount(numValue.toString());
    
    // Format for display
    setDisplayAmount(formatRupiah(numValue, false));
    
    // Validate
    validateField('amount', numValue.toString());
  };

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
          } else if (numericAmount > 999999999) {
            error = 'Amount cannot exceed Rp 999.999.999';
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
    const hasValidAmount = amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && parseFloat(amount) <= 999999999;
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
    setDisplayAmount("");
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
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  const selectedCategoryData = CATEGORIES.find(cat => cat.name === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
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
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <Text style={[
                  styles.saveButton,
                  !isFormValid() && styles.saveButtonDisabledText
                ]}>
                  Save
                </Text>
                {isFormValid() && <Ionicons name="checkmark" size={18} color={colors.primary} />}
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
                ? `${colors.white}20`
                : `${colors.expense}15`,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
              <Ionicons
                name="arrow-down"
                size={18}
                color={isExpense ? colors.white : colors.expense}
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
                ? `${colors.white}20`
                : `${colors.income}15`,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
              <Ionicons
                name="arrow-up"
                size={18}
                color={!isExpense ? colors.white : colors.income}
              />
            </View>
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>Rp</Text>
          <TextInput
            style={[
              styles.amountInput,
              fieldErrors.amount && styles.inputError
            ]}
            placeholder="0"
            placeholderTextColor={colors.textLight}
            value={displayAmount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />
        </View>
        {fieldErrors.amount ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color={colors.error} />
            <Text style={styles.errorText}>{fieldErrors.amount}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Ionicons
            name="text"
            size={22}
            color={colors.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              fieldErrors.title && styles.inputError
            ]}
            placeholder="What's this transaction for?"
            placeholderTextColor={colors.textLight}
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
            <Ionicons name="alert-circle" size={16} color={colors.error} />
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
                : `${colors.primary}15`,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}>
              <Ionicons
                name="apps"
                size={14}
                color={selectedCategoryData?.color || colors.primary}
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
                    ? `${colors.white}20`
                    : `${category.color}15`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}>
                  <Ionicons
                    name={category.icon}
                    size={14}
                    color={selectedCategory === category.name ? colors.white : category.color}
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
              <Ionicons name="alert-circle" size={16} color={colors.error} />
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