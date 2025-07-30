import { useCallback, useState } from "react";

const API_URL = "http://192.168.1.6:5001/api/v1";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/user/${userId}`);
      const data = await response.json();
      setTransactions(data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadTransactions = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([
        fetchTransactions(),
        fetchSummary(),
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading transactions:", error);
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary]);

  const deleteTransaction = async (transactionId, showAlert) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      await loadTransactions();
      showAlert("success", "Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      showAlert("error", "Error", error.message);
    }
  };

  const createTransaction = async ({ user_id, title, amount, category, isExpense }, showAlert) => {
    const validationErrors = validateTransactionData({ title, amount, category });

    if (validationErrors.length > 0) {
      throw new Error(validationErrors[0]);
    }

    const formattedAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));

    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        title: title.trim(),
        amount: formattedAmount,
        category: category.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create transaction");
    }

    await loadTransactions();
  };

  const validateTransactionData = ({ title, amount, category }) => {
    const errors = [];

    if (!title || !title.trim()) {
      errors.push("Transaction title is required");
    } else if (title.trim().length > 100) {
      errors.push("Transaction title must not exceed 100 characters");
    }

    if (!amount || amount.toString().trim() === "") {
      errors.push("Amount is required");
    } else {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        errors.push("Please enter a valid numeric amount");
      } else if (numericAmount <= 0) {
        errors.push("Amount must be greater than 0");
      } else if (numericAmount > 999999.99) {
        errors.push("Amount cannot exceed $999,999.99");
      } else if (!/^\d+(\.\d{1,2})?$/.test(amount.toString())) {
        errors.push("Amount can only have up to 2 decimal places");
      }
    }

    if (!category || !category.trim()) {
      errors.push("Please select a category");
    }

    return errors;
  };

  return { transactions, summary, isLoading, loadTransactions, deleteTransaction, createTransaction, validateTransactionData };
};