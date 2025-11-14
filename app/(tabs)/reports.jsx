import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { CustomAlert } from '../../components/CustomAlert';
import { ChartBarSkeleton, MonthlySkeleton, PeriodSelectorSkeleton } from '../../components/SkeletonLoader';
import { API_BASE_URL } from "../../constants/api";
import { useTheme } from '../../contexts/ThemeContext';
import { formatRupiah } from '../../lib/utils';

const { width: screenWidth } = Dimensions.get('window');

const ReportsScreen = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 18,
      paddingLeft: 24,
      backgroundColor: colors.card,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.5,
    },
    content: {
      flex: 1,
      padding: 16,
      marginBottom: 100,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: 16,
      color: colors.textSecondary,
      fontSize: 16,
      fontWeight: "500",
    },
  
    yearSelector: {
      flexDirection: "row",
      marginBottom: 28,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 6,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 4,
    },
    yearButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 16,
    },
    yearButtonActive: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 3,
    },
    yearButtonText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: "600",
    },
    yearButtonTextActive: {
      color: colors.white,
      fontWeight: "700",
    },
  
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 28,
      marginBottom: 28,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    chartTitleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 20
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
      flexDirection: "row",
      alignItems: "center",
    },
    summaryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
    summaryItem: {
      flex: 1,
      minWidth: "45%",
      alignItems: "center",
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 20,
      padding: 20,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
    },
    summaryLabel: {
      fontSize: 11,
      color: colors.textLight,
      marginBottom: 8,
      textAlign: "center",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    summaryValue: {
      fontSize: 18,
      fontWeight: "800",
      textAlign: "center",
      color: colors.text,
    },
  
    chartCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 28,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
  
    performanceCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 28,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    performanceRow: {
      flexDirection: "row",
      gap: 16,
    },
    performanceItem: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 20,
      padding: 20,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
    },
    performanceLabel: {
      fontSize: 11,
      color: colors.textLight,
      marginTop: 12,
      marginBottom: 6,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    performanceMonth: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 6,
    },
    performanceValue: {
      fontSize: 18,
      fontWeight: "800",
    },
  
    categoryCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 28,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    categoryItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      marginBottom: 12,
      backgroundColor: colors.backgroundSecondary,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    categoryLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      maxWidth: "75%",
    },
    categoryRank: {
      fontSize: 16,
      fontWeight: "800",
      color: colors.primary,
      width: 32,
      textAlign: "center",
    },
    categoryName: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 8,
      fontWeight: "600",
      maxWidth: "75%",
    },
    categoryRight: {
      alignItems: "flex-end",
    },
    categoryAmount: {
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 4,
    },
    categoryCount: {
      fontSize: 12,
      color: colors.textLight,
      fontWeight: "500",
    },
  
    monthlyCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 28,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    monthItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      marginBottom: 12,
      backgroundColor: colors.backgroundSecondary,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    monthLeft: {
      flex: 1,
    },
    monthName: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    monthCount: {
      fontSize: 13,
      color: colors.textLight,
      fontWeight: "500",
    },
    monthRight: {
      alignItems: "flex-end",
      minWidth: 100,
      gap: 4,
    },
    monthIncome: {
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 2,
    },
    monthExpense: {
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 4,
    },
    monthBalance: {
      fontSize: 16,
      fontWeight: "800",
    },
  });

  const API_URL = API_BASE_URL;

  const { user } = useUser();
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [categoryReport, setCategoryReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const showAlert = (type, title, message, onConfirm = () => {}) => {
    setAlertConfig({
      type,
      title,
      message,
      onConfirm: () => {
        setAlertVisible(false);
        onConfirm();
      },
      showCancel: false,
    });
    setAlertVisible(true);
  };

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const monthlyResponse = await fetch(
        `${API_URL}/transactions/monthly-report/${user.id}/${selectedYear}`
      );
      const monthlyData = await monthlyResponse.json();

      const categoryResponse = await fetch(
        `${API_URL}/transactions/category-summary/${user.id}?startDate=${selectedYear}-01-01&endDate=${selectedYear}-12-31`
      );
      const categoryData = await categoryResponse.json();

      if (monthlyData.meta.status === 'success') {
        setMonthlyReport(monthlyData.data);
      }
      if (categoryData.meta.status === 'success') {
        setCategoryReport(categoryData.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      showAlert('error', 'Error', 'Failed to load reports data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchReports();
    }
  }, [user?.id, selectedYear]);

  const prepareLineChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const incomeData = new Array(12).fill(0);
    const expenseData = new Array(12).fill(0);

    monthlyReport.forEach(item => {
      if (item.month >= 1 && item.month <= 12) {
        incomeData[item.month - 1] = item.income || 0;
        expenseData[item.month - 1] = Math.abs(item.expense) || 0;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          data: incomeData,
          color: (opacity = 1) => colors.income,
          strokeWidth: 3,
        },
        {
          data: expenseData,
          color: (opacity = 1) => colors.expense,
          strokeWidth: 3,
        }
      ],
      legend: ['Income', 'Expenses'],
    };
  };

  const getYearSummary = () => {
    const summary = monthlyReport.reduce((acc, item) => {
      acc.totalIncome += item.income || 0;
      acc.totalExpense += Math.abs(item.expense) || 0;
      acc.totalTransactions += item.count || 0;
      return acc;
    }, { totalIncome: 0, totalExpense: 0, totalTransactions: 0 });

    summary.netIncome = summary.totalIncome - summary.totalExpense;
    return summary;
  };

  const getBestMonth = () => {
    return monthlyReport.reduce((best, current) => {
      const currentNet = (current.income || 0) - Math.abs(current.expense || 0);
      const bestNet = (best.income || 0) - Math.abs(best.expense || 0);
      return currentNet > bestNet ? current : best;
    }, monthlyReport[0] || {});
  };

  const getWorstMonth = () => {
    return monthlyReport.reduce((worst, current) => {
      const currentNet = (current.income || 0) - Math.abs(current.expense || 0);
      const worstNet = (worst.income || 0) - Math.abs(worst.expense || 0);
      return currentNet < worstNet ? current : worst;
    }, monthlyReport[0] || {});
  };

  const getMonthName = (monthNumber) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNumber - 1] || '';
  };

  const yearSummary = getYearSummary();
  const bestMonth = getBestMonth();
  const worstMonth = getWorstMonth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <>
            <PeriodSelectorSkeleton />
            <ChartBarSkeleton />
            <MonthlySkeleton />
          </>
        ) : (
          <>
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

            <View style={styles.summaryCard}>
              <View style={styles.chartTitleWrapper}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
                <Text style={styles.cardTitle}>
                  Summary {selectedYear}
                </Text>
              </View>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>
                    {`Total\nIncome`}
                  </Text>
                  <Text style={[styles.summaryValue, { color: colors.income }]}>
                    {formatRupiah(yearSummary.totalIncome)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>{`Total\nExpenses`}</Text>
                  <Text style={[styles.summaryValue, { color: colors.expense }]}>
                    {formatRupiah(yearSummary.totalExpense)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Net Income</Text>
                  <Text style={[
                    styles.summaryValue,
                    { color: yearSummary.netIncome >= 0 ? colors.income : colors.expense }
                  ]}>
                    {formatRupiah(yearSummary.netIncome)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Transactions</Text>
                  <Text style={styles.summaryValue}>
                    {yearSummary.totalTransactions}
                  </Text>
                </View>
              </View>
            </View>

            {monthlyReport.length > 0 && (
              <View style={styles.chartCard}>
                <View style={styles.chartTitleWrapper}>
                  <Ionicons name="trending-up" size={20} color={colors.primary} />
                  <Text style={styles.cardTitle}>
                    Monthly Trends
                  </Text>
                </View>
                <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
                  <LineChart
                    data={prepareLineChartData()}
                    width={screenWidth}
                    height={220}
                    chartConfig={{
                      backgroundColor: colors.card,
                      backgroundGradientFrom: colors.card,
                      backgroundGradientTo: colors.card,
                      decimalPlaces: 0,
                      color: (opacity = 1) => colors.primary,
                      labelColor: (opacity = 1) => colors.text,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '2',
                        strokeWidth: '2',
                      },
                    }}
                    bezier
                    style={[styles.chart]}
                    withVerticalLines={false}
                  />
                </ScrollView>
              </View>
            )}

            {bestMonth.month && worstMonth.month && (
              <View style={styles.performanceCard}>
                <View style={styles.chartTitleWrapper}>
                  <Ionicons name="trophy" size={20} color={colors.primary} />
                  <Text style={styles.cardTitle}>
                    Monthly Performance
                  </Text>
                </View>
                <View style={styles.performanceRow}>
                  <View style={styles.performanceItem}>
                    <Ionicons name="trending-up" size={24} color={colors.income} />
                    <Text style={styles.performanceLabel}>Best Month</Text>
                    <Text style={styles.performanceMonth}>{getMonthName(bestMonth.month)}</Text>
                    <Text style={[styles.performanceValue, { color: colors.income }]}>
                      {formatRupiah(((bestMonth.income) || 0) - Math.abs(bestMonth.expense || 0))}
                    </Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Ionicons name="trending-down" size={24} color={colors.expense} />
                    <Text style={styles.performanceLabel}>Worst Month</Text>
                    <Text style={styles.performanceMonth}>{getMonthName(worstMonth.month)}</Text>
                    <Text style={[styles.performanceValue, { color: colors.expense }]}>
                      {formatRupiah((worstMonth.income || 0) - Math.abs(worstMonth.expense || 0))}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {categoryReport.length > 0 && (
              <View style={styles.categoryCard}>
                <View style={styles.chartTitleWrapper}>
                  <Ionicons name="list" size={20} color={colors.primary} />
                  <Text style={styles.cardTitle}>
                    Top Categories
                  </Text>
                </View>
                {categoryReport.slice(0, 5).map((category, index) => (
                  <View key={category.category} style={styles.categoryItem}>
                    <View
                      style={styles.categoryLeft}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      <Text style={styles.categoryRank}>#{index + 1}</Text>
                      <Text
                        style={styles.categoryName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {category.category}
                      </Text>
                    </View>
                    <View style={styles.categoryRight}>
                      <Text style={[
                        styles.categoryAmount,
                        { color: category.totalAmount >= 0 ? colors.income : colors.expense }
                      ]}>
                        ${formatRupiah(category.totalAmount)}
                      </Text>
                      <Text style={styles.categoryCount}>
                        {category.transactionCount} transactions
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {monthlyReport.length > 0 && (
              <View style={styles.monthlyCard}>
                <View style={styles.chartTitleWrapper}>
                  <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                  <Text style={styles.cardTitle}>
                    Monthly Breakdown
                  </Text>
                </View>
                {monthlyReport.map((month) => (
                  <View key={month.month} style={styles.monthItem}>
                    <View style={styles.monthLeft}>
                      <Text style={styles.monthName}>{getMonthName(month.month)}</Text>
                      <Text style={styles.monthCount}>{month.count} transactions</Text>
                    </View>
                    <View style={styles.monthRight}>
                      <Text style={[styles.monthIncome, { color: colors.income }]}>
                        +{formatRupiah(month.income || 0)}
                      </Text>
                      <Text style={[styles.monthExpense, { color: colors.expense }]}>
                        -{formatRupiah(Math.abs(month.expense || 0))}
                      </Text>
                      <Text style={[
                        styles.monthBalance,
                        { color: month.balance >= 0 ? colors.income : colors.expense }
                      ]}>
                        {formatRupiah(month.balance)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        showCancel={alertConfig.showCancel}
      />
    </View>
  );
};

export default ReportsScreen;