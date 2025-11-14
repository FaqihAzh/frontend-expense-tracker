import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { formatCompactNumber } from '../lib/utils';

export const QuickStatsWidget = ({ summary, transactions }) => {
  const { colors } = useTheme();

  const getAverageTransaction = () => {
    if (!transactions || transactions.length === 0) return 0;
    const total = transactions.reduce(
      (sum, t) => sum + Math.abs(parseFloat(t.amount)),
      0
    );
    return Math.round(total / transactions.length);
  };

  const getTodayTransactions = () => {
    if (!transactions) return 0;
    const today = new Date().toDateString();
    return transactions.filter(
      t => new Date(t.createdAt).toDateString() === today
    ).length;
  };

  const getLargestExpense = () => {
    if (!transactions) return 0;
    const expenses = transactions.filter(t => parseFloat(t.amount) < 0);
    if (expenses.length === 0) return 0;
    return Math.abs(Math.min(...expenses.map(t => parseFloat(t.amount))));
  };

  const stats = [
    {
      icon: 'flash',
      label: 'Avg Transaction',
      value: formatCompactNumber(getAverageTransaction()),
      color: colors.primary,
      bgColor: `${colors.primary}15`,
    },
    {
      icon: 'today',
      label: 'Today',
      value: getTodayTransactions(),
      color: colors.income,
      bgColor: colors.incomeLight,
    },
    {
      icon: 'trending-down',
      label: 'Largest Expense',
      value: formatCompactNumber(getLargestExpense()),
      color: colors.expense,
      bgColor: colors.expenseLight,
    },
    {
      icon: 'swap-horizontal',
      label: 'Total Transactions',
      value: transactions?.length || 0,
      color: colors.accent,
      bgColor: colors.accentLight,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 20,
      marginBottom: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    statCard: {
      flex: 1,
      minWidth: '47%',
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    statValue: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 11,
      color: colors.textLight,
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="stats-chart" size={20} color={colors.primary} />
        <Text style={styles.title}>Quick Stats</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: stat.bgColor },
              ]}
            >
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>

            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
