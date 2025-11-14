import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const NoTransactionsFound = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    emptyStateIconContainer: {
      backgroundColor: colors.backgroundSecondary,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderRadius: 18,
    },
    emptyState: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    emptyStateIcon: {
      marginBottom: 20,
    },
    emptyStateTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    emptyStateText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 22,
      fontWeight: "500",
    },
    emptyStateButton: {
      backgroundColor: colors.primary,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    emptyStateButtonText: {
      color: colors.white,
      fontWeight: "600",
      marginLeft: 8,
      fontSize: 15,
    },
  });

  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateIconContainer}>
        <View style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${colors.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <Ionicons
          name="receipt-outline"
          size={40}
          color={colors.primary}
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
        <Ionicons name="add" size={20} color={colors.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoTransactionsFound;