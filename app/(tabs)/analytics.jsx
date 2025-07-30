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
import { PieChart, BarChart } from 'react-native-chart-kit';
import { styles } from '../../assets/styles/analytics.styles';
import { COLORS } from '../../constants/colors';
import { CustomAlert } from '../../components/CustomAlert';

const { width: screenWidth } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' },
  ];

  console.log(analytics, 'analytics');

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

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://192.168.1.6:5001/api/v1/transactions/analytics/${user.id}?period=${selectedPeriod}`
      );
      const data = await response.json();
      if (data.meta.status === 'success') {
        setAnalytics(data.data);
      } else {
        showAlert('error', 'Error', 'Failed to load analytics data');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      showAlert('error', 'Error', 'Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAnalytics();
    }
  }, [user?.id, selectedPeriod]);

  const preparePieChartData = () => {
    if (!analytics?.categoryBreakdown) return [];

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    return analytics.categoryBreakdown
      .filter(item => Math.abs(item.totalAmount) > 0)
      .slice(0, 6)
      .map((item, index) => ({
        name: item.category,
        population: Math.abs(item.totalAmount),
        color: colors[index % colors.length],
        legendFontColor: COLORS.text,
        legendFontSize: 12,
      }));
  };

  const prepareBarChartData = () => {
    if (!analytics?.categoryBreakdown) return { labels: [], datasets: [] };

    const topCategories = analytics.categoryBreakdown
      .filter(item => Math.abs(item.totalAmount) > 0)
      .slice(0, 5);

    return {
      labels: topCategories.map(item => item.category.substring(0, 8)),
      datasets: [{
        data: topCategories.map(item => Math.abs(item.totalAmount))
      }]
    };
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Analytics...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.periodButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Ionicons name="wallet" size={24} color={COLORS.primary} />
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={[
              styles.summaryValue,
              { color: parseFloat(analytics?.summary?.balance) >= 0 ? COLORS.income : COLORS.expense }
            ]}>
              ${parseFloat(analytics?.summary?.balance)?.toFixed(2) || '0.00'}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="arrow-up-circle" size={24} color={COLORS.income} />
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryValue, { color: COLORS.income }]}>
              ${parseFloat(analytics?.summary?.income)?.toFixed(2) || '0.00'}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="arrow-down-circle" size={24} color={COLORS.expense} />
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, { color: COLORS.expense }]}>
              ${Math.abs(parseFloat(analytics?.summary?.expense) || 0).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Category Breakdown Chart */}
        {preparePieChartData().length > 0 && (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>
              <Ionicons name="pie-chart" size={18} color={COLORS.text} /> Spending by Category
            </Text>
            <PieChart
              data={preparePieChartData()}
              width={screenWidth - 60}
              height={220}
              chartConfig={{
                backgroundColor: COLORS.card,
                backgroundGradientFrom: COLORS.card,
                backgroundGradientTo: COLORS.card,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        )}

        {/* Insights */}
        {analytics?.insights && analytics.insights.length > 0 && (
          <View style={styles.insightsCard}>
            <Text style={styles.chartTitle}>
              <Ionicons name="bulb" size={18} color={COLORS.text} /> Insights
            </Text>
            {analytics.insights.map((insight, index) => (
              <View key={index} style={styles.insightItem}>
                <Ionicons
                  name={insight.type === 'positive' ? 'checkmark-circle' :
                    insight.type === 'warning' ? 'warning' : 'information-circle'}
                  size={20}
                  color={insight.type === 'positive' ? COLORS.income :
                    insight.type === 'warning' ? COLORS.expense : COLORS.primary}
                />
                <Text style={styles.insightText}>{insight.message}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Recent Transactions */}
        {analytics?.recentTransactions && analytics.recentTransactions.length > 0 && (
          <View style={styles.recentCard}>
            <Text style={styles.chartTitle}>
              <Ionicons name="time" size={18} color={COLORS.text} /> Recent Activity
            </Text>
            {analytics.recentTransactions.slice(0, 5).map((transaction) => (
              <View key={transaction.id} style={styles.recentItem}>
                <View style={styles.recentLeft}>
                  <Text style={styles.recentTitle}>{transaction.title}</Text>
                  <Text style={styles.recentCategory}>{transaction.category}</Text>
                </View>
                <Text style={[
                  styles.recentAmount,
                  { color: parseFloat(transaction.amount) >= 0 ? COLORS.income : COLORS.expense }
                ]}>
                  ${Math.abs(parseFloat(transaction.amount)).toFixed(2)}
                </Text>
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

export default AnalyticsScreen;