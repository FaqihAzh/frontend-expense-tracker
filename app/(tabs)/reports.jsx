import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { styles } from '../../assets/styles/reports.styles';
import { COLORS } from '../../constants/colors';
import { CustomAlert } from '../../components/CustomAlert';

const { width: screenWidth } = Dimensions.get('window');

const ReportsScreen = () => {
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
      // Fetch monthly report
      const monthlyResponse = await fetch(
        `http://192.168.1.6:5001/api/v1/transactions/monthly-report/${user.id}/${selectedYear}`
      );
      const monthlyData = await monthlyResponse.json();

      // Fetch category summary
      const categoryResponse = await fetch(
        `http://192.168.1.6:5001/api/v1/transactions/category-summary/${user.id}?startDate=${selectedYear}-01-01&endDate=${selectedYear}-12-31`
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
          color: (opacity = 1) => COLORS.income,
          strokeWidth: 3,
        },
        {
          data: expenseData,
          color: (opacity = 1) => COLORS.expense,
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Reports...</Text>
      </View>
    );
  }

  const yearSummary = getYearSummary();
  const bestMonth = getBestMonth();
  const worstMonth = getWorstMonth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Financial Reports</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Year Selector */}
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

        {/* Year Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>
            <Ionicons name="calendar" size={18} color={COLORS.text} /> {selectedYear} Summary
          </Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Income</Text>
              <Text style={[styles.summaryValue, { color: COLORS.income }]}>
                ${yearSummary.totalIncome.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Expenses</Text>
              <Text style={[styles.summaryValue, { color: COLORS.expense }]}>
                ${yearSummary.totalExpense.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Net Income</Text>
              <Text style={[
                styles.summaryValue,
                { color: yearSummary.netIncome >= 0 ? COLORS.income : COLORS.expense }
              ]}>
                ${yearSummary.netIncome.toFixed(2)}
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
            <Text style={styles.cardTitle}>
              <Ionicons name="trending-up" size={18} color={COLORS.text} /> Monthly Trends
            </Text>
            <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={prepareLineChartData()}
                width={screenWidth}
                height={220}
                chartConfig={{
                  backgroundColor: COLORS.card,
                  backgroundGradientFrom: COLORS.card,
                  backgroundGradientTo: COLORS.card,
                  decimalPlaces: 0,
                  color: (opacity = 1) => COLORS.primary,
                  labelColor: (opacity = 1) => COLORS.text,
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

        {/* Monthly Performance */}
        {bestMonth.month && worstMonth.month && (
          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>
              <Ionicons name="trophy" size={18} color={COLORS.text} /> Monthly Performance
            </Text>
            <View style={styles.performanceRow}>
              <View style={styles.performanceItem}>
                <Ionicons name="trending-up" size={24} color={COLORS.income} />
                <Text style={styles.performanceLabel}>Best Month</Text>
                <Text style={styles.performanceMonth}>{getMonthName(bestMonth.month)}</Text>
                <Text style={[styles.performanceValue, { color: COLORS.income }]}>
                  ${((bestMonth.income || 0) - Math.abs(bestMonth.expense || 0)).toFixed(2)}
                </Text>
              </View>
              <View style={styles.performanceItem}>
                <Ionicons name="trending-down" size={24} color={COLORS.expense} />
                <Text style={styles.performanceLabel}>Worst Month</Text>
                <Text style={styles.performanceMonth}>{getMonthName(worstMonth.month)}</Text>
                <Text style={[styles.performanceValue, { color: COLORS.expense }]}>
                  ${((worstMonth.income || 0) - Math.abs(worstMonth.expense || 0)).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Top Categories */}
        {categoryReport.length > 0 && (
          <View style={styles.categoryCard}>
            <Text style={styles.cardTitle}>
              <Ionicons name="list" size={18} color={COLORS.text} /> Top Categories
            </Text>
            {categoryReport.slice(0, 5).map((category, index) => (
              <View key={category.category} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <Text style={styles.categoryRank}>#{index + 1}</Text>
                  <Text style={styles.categoryName}>{category.category}</Text>
                </View>
                <View style={styles.categoryRight}>
                  <Text style={[
                    styles.categoryAmount,
                    { color: category.totalAmount >= 0 ? COLORS.income : COLORS.expense }
                  ]}>
                    ${Math.abs(category.totalAmount).toFixed(2)}
                  </Text>
                  <Text style={styles.categoryCount}>
                    {category.transactionCount} transactions
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Monthly Breakdown */}
        {monthlyReport.length > 0 && (
          <View style={styles.monthlyCard}>
            <Text style={styles.cardTitle}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.text} /> Monthly Breakdown
            </Text>
            {monthlyReport.map((month) => (
              <View key={month.month} style={styles.monthItem}>
                <View style={styles.monthLeft}>
                  <Text style={styles.monthName}>{getMonthName(month.month)}</Text>
                  <Text style={styles.monthCount}>{month.count} transactions</Text>
                </View>
                <View style={styles.monthRight}>
                  <Text style={[styles.monthIncome, { color: COLORS.income }]}>
                    +${(month.income || 0).toFixed(2)}
                  </Text>
                  <Text style={[styles.monthExpense, { color: COLORS.expense }]}>
                    -${Math.abs(month.expense || 0).toFixed(2)}
                  </Text>
                  <Text style={[
                    styles.monthBalance,
                    { color: month.balance >= 0 ? COLORS.income : COLORS.expense }
                  ]}>
                    ${month.balance.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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