import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  RefreshControl, ScrollView,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../assets/styles/transactions.styles';
import { TransactionItem } from '../../components/TransactionItem';
import { CustomAlert } from '../../components/CustomAlert';
import NoTransactionsFound from '../../components/NoTransactionsFound';
import {COLORS_MASTER} from "../../constants/colorsMaster";
import {useTransactions} from "../../hooks/useTransactions";
import {API_BASE_URL} from "../../constants/api";

const CATEGORIES = [
  'All Categories',
  'Food & Drinks',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Bills',
  'Income',
  'Other',
];

const TransactionsScreen = () => {
  const API_URL = API_BASE_URL;

  const { user } = useUser();
  const { deleteTransaction } = useTransactions(user.id);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});

  const months = [
    'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

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

  const fetchTransactions = async () => {
    try {
      let url = `${API_URL}/transactions/user/${user.id}`;
      const params = new URLSearchParams();

      if (selectedCategory !== 'All Categories') {
        params.append('category', selectedCategory);
      }
      if (selectedType !== 'all') {
        params.append('type', selectedType);
      }
      if (minAmount) {
        params.append('minAmount', minAmount);
      }
      if (maxAmount) {
        params.append('maxAmount', maxAmount);
      }
      if (startDate) {
        params.append('startDate', startDate.toISOString());
      }
      if (endDate) {
        params.append('endDate', endDate.toISOString());
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.meta.status === 'success') {
        setTransactions(data.data);
      } else {
        showAlert('error', 'Error', 'Failed to load monthly transactions');
      }
    } catch (error) {
      console.error('Error fetching monthly transactions:', error);
      showAlert('error', 'Error', 'Failed to load monthly transactions');
    }
  };

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      if (selectedMonth && selectedMonth !== 'All Months') {
        await fetchMonthlyTransactions();
      } else {
        await fetchTransactions();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    showAlert(
      'confirm',
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      () => deleteTransaction(),
      () => {},
      true
    );
  };

  const applyFilters = useCallback(() => {
    let filtered = [...transactions];
    if (searchQuery.trim()) {
      filtered = filtered.filter(transaction =>
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedType('all');
    setMinAmount('');
    setMaxAmount('');
    setStartDate(null);
    setEndDate(null);
    setSearchQuery('');
    setSelectedMonth('All Months');
    setSelectedYear(new Date().getFullYear());
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'All Categories') count++;
    if (selectedType !== 'all') count++;
    if (minAmount) count++;
    if (maxAmount) count++;
    if (startDate) count++;
    if (endDate) count++;
    if (selectedMonth && selectedMonth !== 'All Months') count++;
    return count;
  };

  useEffect(() => {
    if (user?.id) {
      loadTransactions();
    }
  }, [user?.id, selectedCategory, selectedType, minAmount, maxAmount, startDate, endDate, selectedMonth, selectedYear]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS_MASTER.primary} />
        <Text style={styles.loadingText}>Loading Transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Transactions</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color={COLORS_MASTER.primary} />
          {getActiveFiltersCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS_MASTER.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor={COLORS_MASTER.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS_MASTER.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {getActiveFiltersCount() > 0 && (
          <View style={styles.activeFiltersContainer}>
            <Text style={styles.activeFiltersText}>Active Filters:</Text>
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={filteredTransactions}
          renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<NoTransactionsFound />}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => {
              setShowFilters(false);
              loadTransactions();
            }}>
              <Text style={styles.modalDone}>Done</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Month & Year</Text>
              <View style={styles.monthYearContainer}>
                <TouchableOpacity
                  style={styles.monthPickerButton}
                  onPress={() => setShowMonthPicker(true)}
                >
                  <Text style={styles.monthPickerText}>
                    {selectedMonth || 'All Months'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={COLORS_MASTER.textLight} />
                </TouchableOpacity>

                <View style={styles.yearSelector}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.yearButton,
                        selectedYear === year && styles.yearButtonActive
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text style={[
                        styles.yearButtonText,
                        selectedYear === year && styles.yearButtonTextActive
                      ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Category</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryFilterButton,
                      selectedCategory === category && styles.categoryFilterButtonActive
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[
                      styles.categoryFilterButtonText,
                      selectedCategory === category && styles.categoryFilterButtonTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Transaction Type</Text>
              <View style={styles.typeButtons}>
                {[
                  { key: 'all', label: 'All' },
                  { key: 'income', label: 'Income' },
                  { key: 'expense', label: 'Expense' }
                ].map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.typeButton,
                      selectedType === type.key && styles.typeButtonActive
                    ]}
                    onPress={() => setSelectedType(type.key)}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      selectedType === type.key && styles.typeButtonTextActive
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Amount Range</Text>
              <View style={styles.amountInputs}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Min amount"
                  placeholderTextColor={COLORS_MASTER.textLight}
                  value={minAmount}
                  onChangeText={setMinAmount}
                  keyboardType="numeric"
                />
                <Text style={styles.amountDivider}>to</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Max amount"
                  placeholderTextColor={COLORS_MASTER.textLight}
                  value={maxAmount}
                  onChangeText={setMaxAmount}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Date Range</Text>
              <View style={styles.dateInputs}>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text style={styles.dateButtonText}>
                    {startDate ? formatDate(startDate) : 'Start Date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color={COLORS_MASTER.textLight} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Text style={styles.dateButtonText}>
                    {endDate ? formatDate(endDate) : 'End Date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color={COLORS_MASTER.textLight} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.clearAllButton} onPress={clearFilters}>
              <Text style={styles.clearAllButtonText}>Clear All Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        visible={showMonthPicker}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Select Month</Text>
            <ScrollView style={styles.pickerList}>
              {months.map((month) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.pickerItem,
                    selectedMonth === month && styles.pickerItemActive
                  ]}
                  onPress={() => {
                    setSelectedMonth(month);
                    setShowMonthPicker(false);
                  }}
                >
                  <Text style={[
                    styles.pickerItemText,
                    selectedMonth === month && styles.pickerItemTextActive
                  ]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.pickerCloseButton}
              onPress={() => setShowMonthPicker(false)}
            >
              <Text style={styles.pickerCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
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

export default TransactionsScreen;