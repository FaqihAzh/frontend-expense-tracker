import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from '../../assets/styles/reports.styles';
import { CustomAlert } from '../../components/CustomAlert';
import { ChartBarSkeleton, MonthlySkeleton, PeriodSelectorSkeleton } from '../../components/SkeletonLoader';
import { API_BASE_URL } from "../../constants/api";
import { COLORS_MASTER } from "../../constants/colorsMaster";
import { formatRupiah } from '../../lib/utils';

const { width: screenWidth } = Dimensions.get('window');

const ReportsScreen = () => {
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
          color: (opacity = 1) => COLORS_MASTER.income,
          strokeWidth: 3,
        },
        {
          data: expenseData,
          color: (opacity = 1) => COLORS_MASTER.expense,
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
                <Ionicons name="calendar" size={20} color={COLORS_MASTER.primary} />
                <Text style={styles.cardTitle}>
                  Summary {selectedYear}
                </Text>
              </View>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>
                    {`Total\nIncome`}
                  </Text>
                  <Text style={[styles.summaryValue, { color: COLORS_MASTER.income }]}>
                    {formatRupiah(yearSummary.totalIncome)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>{`Total\nExpenses`}</Text>
                  <Text style={[styles.summaryValue, { color: COLORS_MASTER.expense }]}>
                    {formatRupiah(yearSummary.totalExpense)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Net Income</Text>
                  <Text style={[
                    styles.summaryValue,
                    { color: yearSummary.netIncome >= 0 ? COLORS_MASTER.income : COLORS_MASTER.expense }
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
                  <Ionicons name="trending-up" size={20} color={COLORS_MASTER.primary} />
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
                      backgroundColor: COLORS_MASTER.card,
                      backgroundGradientFrom: COLORS_MASTER.card,
                      backgroundGradientTo: COLORS_MASTER.card,
                      decimalPlaces: 0,
                      color: (opacity = 1) => COLORS_MASTER.primary,
                      labelColor: (opacity = 1) => COLORS_MASTER.text,
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
                  <Ionicons name="trophy" size={20} color={COLORS_MASTER.primary} />
                  <Text style={styles.cardTitle}>
                    Monthly Performance
                  </Text>
                </View>
                <View style={styles.performanceRow}>
                  <View style={styles.performanceItem}>
                    <Ionicons name="trending-up" size={24} color={COLORS_MASTER.income} />
                    <Text style={styles.performanceLabel}>Best Month</Text>
                    <Text style={styles.performanceMonth}>{getMonthName(bestMonth.month)}</Text>
                    <Text style={[styles.performanceValue, { color: COLORS_MASTER.income }]}>
                      {formatRupiah(((bestMonth.income) || 0) - Math.abs(bestMonth.expense || 0))}
                    </Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Ionicons name="trending-down" size={24} color={COLORS_MASTER.expense} />
                    <Text style={styles.performanceLabel}>Worst Month</Text>
                    <Text style={styles.performanceMonth}>{getMonthName(worstMonth.month)}</Text>
                    <Text style={[styles.performanceValue, { color: COLORS_MASTER.expense }]}>
                      {formatRupiah((worstMonth.income || 0) - Math.abs(worstMonth.expense || 0))}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {categoryReport.length > 0 && (
              <View style={styles.categoryCard}>
                <View style={styles.chartTitleWrapper}>
                  <Ionicons name="list" size={20} color={COLORS_MASTER.primary} />
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
                        { color: category.totalAmount >= 0 ? COLORS_MASTER.income : COLORS_MASTER.expense }
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
                  <Ionicons name="calendar-outline" size={20} color={COLORS_MASTER.primary} />
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
                      <Text style={[styles.monthIncome, { color: COLORS_MASTER.income }]}>
                        +{formatRupiah(month.income || 0)}
                      </Text>
                      <Text style={[styles.monthExpense, { color: COLORS_MASTER.expense }]}>
                        -{formatRupiah(Math.abs(month.expense || 0))}
                      </Text>
                      <Text style={[
                        styles.monthBalance,
                        { color: month.balance >= 0 ? COLORS_MASTER.income : COLORS_MASTER.expense }
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