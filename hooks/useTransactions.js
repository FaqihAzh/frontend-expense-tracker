import { useCallback, useState } from "react";
import {Alert} from "react-native";

const API_URL = "http://192.168.103.200:5001/api/v1";

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
      const response = await fetch(`${API_URL}/transactions`);
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

  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      loadTransactions();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  const createTransaction = async ({ user_id, title, amount, category, isExpense }) => {
    if (!title.trim()) {
      throw new Error("Please enter a transaction title");
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      throw new Error("Please enter a valid amount");
    }

    if (!category) {
      throw new Error("Please select a category");
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
        title,
        amount: formattedAmount,
        category,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create transaction");
    }

    await loadTransactions();
  };


  return { transactions, summary, isLoading, loadTransactions, deleteTransaction, createTransaction };
}