import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS_MASTER } from "../constants/colorsMaster";

const NoTransactionsFound = () => {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      {/* <View style={styles.emptyStateHeader}>
        <Ionicons name="flame" size={20} color={COLORS_MASTER.primary} />
        <Text style={styles.title}>Recent Transactions</Text>
      </View> */}

      <View style={styles.emptyStateIconContainer}>
        <View style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${COLORS_MASTER.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <Ionicons
          name="receipt-outline"
          size={40}
          color={COLORS_MASTER.primary}
        />
      </View>

      <Text style={styles.emptyStateTitle}>No transactions yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction.
        Every journey begins with a single step!
      </Text>

      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add" size={20} color={COLORS_MASTER.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoTransactionsFound;