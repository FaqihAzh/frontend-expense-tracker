import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  RefreshControl, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { CustomAlert } from '../../components/CustomAlert';
import NoTransactionsFound from '../../components/NoTransactionsFound';
import { SearchSkeleton, TransactionSkeleton } from '../../components/SkeletonLoader';
import { TransactionItem } from '../../components/TransactionItem';
import { API_BASE_URL } from "../../constants/api";
import { useTheme } from '../../contexts/ThemeContext';
import { useTransactions } from "../../hooks/useTransactions";

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
  const { colors } = useTheme();

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    paddingLeft: 22,
    backgroundColor:colors.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color:colors.text,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    marginBottom: 36,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor:colors.card,
    shadowColor:colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterBadge: {
    backgroundColor:colors.expense,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  filterBadgeText: {
    color:colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:colors.card,
    borderRadius: 12,
    margin: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 15,
    shadowColor:colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color:colors.text,
  },
  activeFiltersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  activeFiltersText: {
    color:colors.textLight,
    fontSize: 14,
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor:colors.expense,
  },
  clearFiltersText: {
    color:colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
    marginBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:colors.background,
  },
  loadingText: {
    marginTop: 10,
    color:colors.textLight,
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    backgroundColor:colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor:colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color:colors.text,
  },
  modalCancel: {
    fontSize: 16,
    color:colors.textLight,
  },
  modalDone: {
    fontSize: 16,
    color:colors.primary,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },

  filterSection: {
    marginBottom: 30,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color:colors.text,
    marginBottom: 12,
  },

  monthYearContainer: {
    gap: 15,
  },
  monthPickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor:colors.border,
  },
  monthPickerText: {
    fontSize: 16,
    color:colors.text,
  },
  yearSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor:colors.border,
    backgroundColor:colors.card,
  },
  yearButtonActive: {
    backgroundColor:colors.primary,
    borderColor:colors.primary,
  },
  yearButtonText: {
    color:colors.text,
    fontSize: 14,
  },
  yearButtonTextActive: {
    color:colors.white,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor:colors.border,
    backgroundColor:colors.card,
  },
  categoryFilterButtonActive: {
    backgroundColor:colors.primary,
    borderColor:colors.primary,
  },
  categoryFilterButtonText: {
    color:colors.text,
    fontSize: 14,
  },
  categoryFilterButtonTextActive: {
    color:colors.white,
  },

  typeButtons: {
    flexDirection: "row",
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor:colors.border,
    backgroundColor:colors.card,
  },
  typeButtonActive: {
    backgroundColor:colors.primary,
    borderColor:colors.primary,
  },
  typeButtonText: {
    color:colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color:colors.white,
  },

  amountInputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  amountInput: {
    flex: 1,
    backgroundColor:colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor:colors.border,
    fontSize: 16,
    color:colors.text,
  },
  amountDivider: {
    color:colors.textLight,
    fontSize: 16,
  },

  dateInputs: {
    gap: 12,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor:colors.border,
  },
  dateButtonText: {
    fontSize: 16,
    color:colors.text,
  },

  clearAllButton: {
    backgroundColor:colors.expense,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  clearAllButtonText: {
    color:colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor:colors.card,
    borderRadius: 16,
    width: "80%",
    maxHeight: "60%",
    shadowColor:colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color:colors.text,
    textAlign: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor:colors.border,
  },
  pickerList: {
    maxHeight: 300,
  },
  pickerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor:colors.border,
  },
  pickerItemActive: {
    backgroundColor:colors.primary,
  },
  pickerItemText: {
    fontSize: 16,
    color:colors.text,
    textAlign: "center",
  },
  pickerItemTextActive: {
    color:colors.white,
    fontWeight: "600",
  },
  pickerCloseButton: {
    padding: 15,
    alignItems: "center",
  },
  pickerCloseText: {
    fontSize: 16,
    color:colors.primary,
    fontWeight: "600",
  },
  });

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color={colors.primary} />
          {getActiveFiltersCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {isLoading && !refreshing ? (
          <>
            <View style={styles.listContent}>
              <View style={{marginBottom: 15, marginTop: 20}}>
                <SearchSkeleton />
              </View>
              <TransactionSkeleton/>
              <TransactionSkeleton/>
              <TransactionSkeleton/>
              <TransactionSkeleton/>
            </View>
          </>
        ) : (
          <>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.textLight} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search transactions..."
                placeholderTextColor={colors.textLight}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={colors.textLight} />
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
          </>
        )}
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
                  <Ionicons name="chevron-down" size={20} color={colors.textLight} />
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
                  placeholderTextColor={colors.textLight}
                  value={minAmount}
                  onChangeText={setMinAmount}
                  keyboardType="numeric"
                />
                <Text style={styles.amountDivider}>to</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Max amount"
                  placeholderTextColor={colors.textLight}
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
                  <Ionicons name="calendar-outline" size={20} color={colors.textLight} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Text style={styles.dateButtonText}>
                    {endDate ? formatDate(endDate) : 'End Date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color={colors.textLight} />
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