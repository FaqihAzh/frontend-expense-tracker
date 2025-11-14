import { useCallback, useState } from "react";
import { API_BASE_URL } from "../constants/api";

const API_URL = API_BASE_URL

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [analytics, setAnalytics] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [categoryReport, setCategoryReport] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = useCallback(async (filters = {}) => {
    try {
      let url = `${API_URL}/transactions/user/${userId}`;
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.append(key, value);
        }
      });

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }, [userId]);

  const fetchSummary = useCallback(async (filters = {}) => {
    try {
      let url = `${API_URL}/transactions/summary/${userId}`;
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.append(key, value);
        }
      });

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setSummary(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching summary:", error);
      throw error;
    }
  }, [userId]);

  const fetchAnalytics = useCallback(async (period = 'month', filters = {}) => {
    try {
      let url = `${API_URL}/transactions/analytics/${userId}`;
      const params = new URLSearchParams({ period });

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.append(key, value);
        }
      });

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setAnalytics(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  }, [userId]);

  const fetchMonthlyReport = useCallback(async (year) => {
    try {
      const response = await fetch(`${API_URL}/transactions/monthly-report/${userId}/${year}`);
      const data = await response.json();
      setMonthlyReport(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching monthly report:", error);
      throw error;
    }
  }, [userId]);

  const fetchCategoryReport = useCallback(async (filters = {}) => {
    try {
      let url = `${API_URL}/transactions/category-summary/${userId}`;
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.append(key, value);
        }
      });

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setCategoryReport(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching category report:", error);
      throw error;
    }
  }, [userId]);

  const fetchTopCategories = useCallback(async (limit = 5) => {
    try {
      const response = await fetch(`${API_URL}/transactions/top-categories/${userId}?limit=${limit}`);
      const data = await response.json();
      setTopCategories(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching top categories:", error);
      throw error;
    }
  }, [userId]);

  const fetchRecentTransactions = useCallback(async (limit = 10) => {
    try {
      const response = await fetch(`${API_URL}/transactions/recent/${userId}?limit=${limit}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      throw error;
    }
  }, [userId]);

  const fetchTransactionsByMonth = useCallback(async (year, month) => {
    try {
      const response = await fetch(`${API_URL}/transactions/user/${userId}/month/${year}/${month}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching transactions by month:", error);
      throw error;
    }
  }, [userId]);

  const fetchTransactionsByCategory = useCallback(async (category) => {
    try {
      const response = await fetch(`${API_URL}/transactions/user/${userId}/category/${encodeURIComponent(category)}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching transactions by category:", error);
      throw error;
    }
  }, [userId]);

  const fetchTransactionsByDateRange = useCallback(async (startDate, endDate) => {
    try {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      const response = await fetch(`${API_URL}/transactions/user/${userId}/date-range?${params}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching transactions by date range:", error);
      throw error;
    }
  }, [userId]);

  const loadTransactions = useCallback(async (filters = {}) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([
        fetchTransactions(filters),
        fetchSummary(filters),
      ]);
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary]);

  const loadAnalytics = useCallback(async (period = 'month', filters = {}) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await fetchAnalytics(period, filters);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchAnalytics]);

  const loadReports = useCallback(async (year, filters = {}) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([
        fetchMonthlyReport(year),
        fetchCategoryReport(filters),
        fetchTopCategories(),
      ]);
    } catch (error) {
      console.error("Error loading reports:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchMonthlyReport, fetchCategoryReport, fetchTopCategories]);

  const deleteTransaction = async (transactionId, showAlert) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
      });
      console.log(`${API_URL}/transactions/${transactionId}`);
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

  return {
    transactions,
    summary,
    analytics,
    monthlyReport,
    categoryReport,
    topCategories,
    isLoading,

    loadTransactions,
    deleteTransaction,
    createTransaction,
    validateTransactionData,

    loadAnalytics,
    loadReports,
    fetchAnalytics,
    fetchRecentTransactions,

    fetchTransactionsByMonth,
    fetchTransactionsByCategory,
    fetchTransactionsByDateRange,
    fetchMonthlyReport,
    fetchCategoryReport,
    fetchTopCategories,
  };
};