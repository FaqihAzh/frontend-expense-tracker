import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { formatRupiah } from "../lib/utils";

export const BalanceCard = ({ summary }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    balanceCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 28,
      marginBottom: 25,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 24,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    balanceTitle: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: "600",
    },
    balanceAmount: {
      fontSize: 42,
      fontWeight: "800",
      marginTop: 2,
      marginBottom: 18,
      letterSpacing: -1,
    },
    balanceStats: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 24,
    },
    balanceStatItem: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    statHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
      gap: 4,
    },
    balanceStatLabel: {
      fontSize: 13,
      color: colors.textLight,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    balanceStatAmount: {
      fontSize: 18,
      fontWeight: "700",
    },
  });

  const balance = parseFloat(summary.balance);
  const income = parseFloat(summary.income);
  const expense = Math.abs(parseFloat(summary.expense));

  return (
    <View style={styles.balanceCard}>
      <View style={styles.headerRow}>
        <Ionicons
          name="wallet"
          size={20}
          color={colors.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.balanceTitle}>Total Balance</Text>
      </View>

      <Text
        style={[
          styles.balanceAmount,
          { color: balance >= 0 ? colors.text : colors.error },
        ]}
      >
        {formatRupiah(balance)}
      </Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-up" size={16} color={colors.income} />
            <Text style={styles.balanceStatLabel}>Income</Text>
          </View>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: colors.income },
            ]}
          >
            {formatRupiah(income)}
          </Text>
        </View>

        <View style={styles.balanceStatItem}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-down" size={16} color={colors.expense} />
            <Text style={styles.balanceStatLabel}>Expenses</Text>
          </View>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: colors.expense },
            ]}
          >
            {formatRupiah(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
};
