import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS_MASTER } from "../constants/colorsMaster";
import { formatRupiah } from "../lib/utils";

export const BalanceCard = ({ summary }) => {
  const balance = parseFloat(summary.balance);
  const income = parseFloat(summary.income);
  const expense = Math.abs(parseFloat(summary.expense));

  return (
    <View style={styles.balanceCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="wallet" size={20} color={COLORS_MASTER.primary} style={{ marginRight: 8 }} />
        <Text style={styles.balanceTitle}>Total Balance</Text>
      </View>

      <Text style={[
        styles.balanceAmount,
        { color: balance >= 0 ? COLORS_MASTER.text : COLORS_MASTER.error }
      ]}>
        {formatRupiah(balance)}
      </Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
            gap: 4
          }}>
            <Ionicons name="arrow-up" size={16} color={COLORS_MASTER.income} />
            <Text style={styles.balanceStatLabel}>Income</Text>
          </View>
          <Text style={[styles.balanceStatAmount, { color: COLORS_MASTER.income }]}>
            {formatRupiah(income)}
          </Text>
        </View>

        <View style={styles.balanceStatItem}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
            gap: 4
          }}>
            <Ionicons name="arrow-down" size={16} color={COLORS_MASTER.expense} />
            <Text style={styles.balanceStatLabel}>Expenses</Text>
          </View>
          <Text style={[styles.balanceStatAmount, { color: COLORS_MASTER.expense }]}>
            {formatRupiah(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
};