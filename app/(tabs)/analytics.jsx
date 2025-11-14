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
import { PieChart } from 'react-native-chart-kit';
import { CustomAlert } from '../../components/CustomAlert';
import { ChartBarSkeleton, InsightsSkeleton, PeriodSelectorSkeleton, RecentActivitySkeleton, SummaryCardSkeleton } from '../../components/SkeletonLoader';
import { API_BASE_URL } from '../../constants/api';
import { useTheme } from '../../contexts/ThemeContext';
import { formatRupiah } from '../../lib/utils';

const { width: screenWidth } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const API_URL = API_BASE_URL;
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
      marginBottom: 105,
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
  
    periodSelector: {
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
    periodButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 16,
    },
    periodButtonActive: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 3,
    },
    periodButtonText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: "600",
    },
    periodButtonTextActive: {
      color: colors.white,
      fontWeight: "700",
    },
  
    summaryContainer: {
      flexDirection: "row",
      marginBottom: 28,
      gap: 12,
    },
    summaryCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    summaryLabel: {
      fontSize: 10,
      color: colors.textLight,
      marginTop: 8,
      marginBottom: 6,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    summaryValue: {
      fontSize: 12,
      fontWeight: "800",
    },
  
    chartCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 24,
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
  
    chartTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
      flexDirection: "row",
      alignItems: "center",
    },
  
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
  
    insightsCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 24,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    insightItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 16,
      marginBottom: 12,
      backgroundColor: colors.backgroundSecondary,
    },
    insightText: {
      marginLeft: 12,
      flex: 1,
      color: colors.text,
      fontSize: 14,
      lineHeight: 22,
      fontWeight: "500",
    },
  
    recentCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 24,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    recentItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 16,
      marginBottom: 8,
      backgroundColor: colors.backgroundSecondary,
    },
    recentLeft: {
      flex: 1,
      maxWidth: "70%",
    },
    recentTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
      maxWidth: "100%"
    },
    recentCategory: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: "500",
      maxWidth: "100%",
    },
    recentAmount: {
      fontSize: 16,
      fontWeight: "700",
    },
  });

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
        legendFontColor: colors.text,
        legendFontSize: 11,
      }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        

        {isLoading ? (
          <>
            <PeriodSelectorSkeleton />
            <SummaryCardSkeleton />
            <ChartBarSkeleton />
            <InsightsSkeleton />
            <RecentActivitySkeleton />
          </>
        ) : (
          <>
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
                <Ionicons name="wallet" size={24} color={colors.primary} />
                <Text style={styles.summaryLabel}>Balance</Text>
                <Text style={[
                  styles.summaryValue,
                  { color: parseFloat(analytics?.summary?.balance) >= 0 ? colors.income : colors.expense }
                ]}>
                  {formatRupiah(analytics?.summary?.balance) || '0'}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Ionicons name="arrow-up-circle" size={24} color={colors.income} />
                <Text style={styles.summaryLabel}>Income</Text>
                <Text style={[styles.summaryValue, { color: colors.income }]}>
                  {formatRupiah(analytics?.summary?.income) || '0'}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Ionicons name="arrow-down-circle" size={24} color={colors.expense} />
                <Text style={styles.summaryLabel}>Expenses</Text>
                <Text style={[styles.summaryValue, { color: colors.expense }]}>
                  {(formatRupiah(analytics?.summary?.expense) || 0)}
                </Text>
              </View>
            </View>

            {preparePieChartData().length > 0 && (
              <View style={styles.chartCard}>
                <View style={styles.chartTitleWrapper}>
                  <Ionicons name="pie-chart" size={20} color={colors.primary} />
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
                      backgroundColor: colors.card,
                      backgroundGradientFrom: colors.card,
                      backgroundGradientTo: colors.card,
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
                  <Ionicons name="pie-chart" size={20} color={colors.primary} />
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
                      color={insight.type === 'positive' ? colors.income :
                        insight.type === 'warning' ? colors.expense : colors.primary}
                    />
                    <Text style={styles.insightText}>{insight.message}</Text>
                  </View>
                ))}
              </View>
            )}

            {analytics?.recentTransactions && analytics.recentTransactions.length > 0 && (
              <View style={styles.recentCard}>
                <View style={styles.chartTitleWrapper}>
                  <Ionicons name="pie-chart" size={20} color={colors.primary} />
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
                      { color: parseFloat(transaction.amount) >= 0 ? colors.income : colors.expense }
                    ]}>
                      {formatRupiah((transaction.amount))}
                    </Text>
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

export default AnalyticsScreen;