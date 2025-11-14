import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { styles } from '../../assets/styles/analytics.styles';
import { CustomAlert } from '../../components/CustomAlert';
import { API_BASE_URL } from '../../constants/api';
import { COLORS_MASTER } from "../../constants/colorsMaster";
import { formatRupiah } from '../../lib/utils';

const { width: screenWidth } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const API_URL = API_BASE_URL;

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
        `${API_URL}/transactions/analytics/${user.id}?period=${selectedPeriod}`
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
        legendFontColor: COLORS_MASTER.text,
        legendFontSize: 11,
      }));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS_MASTER.primary} />
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

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Ionicons name="wallet" size={24} color={COLORS_MASTER.primary} />
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={[
              styles.summaryValue,
              { color: parseFloat(analytics?.summary?.balance) >= 0 ? COLORS_MASTER.income : COLORS_MASTER.expense }
            ]}>
              {formatRupiah(analytics?.summary?.balance) || '0'}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="arrow-up-circle" size={24} color={COLORS_MASTER.income} />
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryValue, { color: COLORS_MASTER.income }]}>
              {formatRupiah(analytics?.summary?.income) || '0'}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="arrow-down-circle" size={24} color={COLORS_MASTER.expense} />
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, { color: COLORS_MASTER.expense }]}>
              {(formatRupiah(analytics?.summary?.expense) || 0)}
            </Text>
          </View>
        </View>

        {preparePieChartData().length > 0 && (
          <View style={styles.chartCard}>
            <View style={styles.chartTitleWrapper}>
              <Ionicons name="pie-chart" size={20} color={COLORS_MASTER.primary} />
              <Text style={styles.chartTitle}>
                Spending by Category
              </Text>
            </View>
            <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
              <PieChart
                data={preparePieChartData()}
                width={screenWidth - 80}
                height={180}
                chartConfig={{
                  backgroundColor: COLORS_MASTER.card,
                  backgroundGradientFrom: COLORS_MASTER.card,
                  backgroundGradientTo: COLORS_MASTER.card,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                absolute
              />
            </ScrollView>
          </View>
        )}

        {analytics?.insights && analytics.insights.length > 0 && (
          <View style={styles.insightsCard}>
            <View style={styles.chartTitleWrapper}>
              <Ionicons name="pie-chart" size={20} color={COLORS_MASTER.primary} />
              <Text style={styles.chartTitle}>
                Insights
              </Text>
            </View>
            {analytics.insights.map((insight, index) => (
              <View key={index} style={styles.insightItem}>
                <Ionicons
                  name={insight.type === 'positive' ? 'checkmark-circle' :
                    insight.type === 'warning' ? 'warning' : 'information-circle'}
                  size={20}
                  color={insight.type === 'positive' ? COLORS_MASTER.income :
                    insight.type === 'warning' ? COLORS_MASTER.expense : COLORS_MASTER.primary}
                />
                <Text style={styles.insightText}>{insight.message}</Text>
              </View>
            ))}
          </View>
        )}

        {analytics?.recentTransactions && analytics.recentTransactions.length > 0 && (
          <View style={styles.recentCard}>
            <View style={styles.chartTitleWrapper}>
              <Ionicons name="pie-chart" size={20} color={COLORS_MASTER.primary} />
              <Text style={styles.chartTitle}>
                Recent Activity
              </Text>
            </View>
            {analytics.recentTransactions.slice(0, 5).map((transaction) => (
              <View key={transaction.id} style={styles.recentItem}>
                <View
                  style={styles.recentLeft}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  <Text
                    style={styles.recentTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {transaction.title}
                  </Text>
                  <Text
                    style={styles.recentCategory}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {transaction.category}
                  </Text>
                </View>
                <Text style={[
                  styles.recentAmount,
                  { color: parseFloat(transaction.amount) >= 0 ? COLORS_MASTER.income : COLORS_MASTER.expense }
                ]}>
                  {formatRupiah((transaction.amount))}
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