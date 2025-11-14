import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { formatDate, formatRupiah } from "../lib/utils";

const CATEGORY_ICONS = {
  "Food & Drinks": "restaurant",
  "Makanan & Minuman": "restaurant",
  Shopping: "bag",
  Belanja: "bag",
  Transportation: "car-sport",
  Transportasi: "car-sport",
  Entertainment: "game-controller",
  Hiburan: "game-controller",
  Bills: "receipt",
  Tagihan: "receipt",
  Income: "trending-up",
  Pemasukan: "trending-up",
  Other: "ellipsis-horizontal-circle",
  Lainnya: "ellipsis-horizontal-circle",
};

const CATEGORY_COLORS = {
  "Food & Drinks": "#FF6B6B",
  "Makanan & Minuman": "#FF6B6B",
  Shopping: "#4ECDC4",
  Belanja: "#4ECDC4",
  Transportation: "#45B7D1",
  Transportasi: "#45B7D1",
  Entertainment: "#96CEB4",
  Hiburan: "#96CEB4",
  Bills: "#FECA57",
  Tagihan: "#FECA57",
  Income: "#6C5CE7",
  Pemasukan: "#6C5CE7",
  Other: "#A0A0A0",
  Lainnya: "#A0A0A0",
};

export const TransactionItem = ({ item, onDelete }) => {
  const { colors } = useTheme();

  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag";
  const categoryColor =
    CATEGORY_COLORS[item.category] || colors.textLight;

  const styles = StyleSheet.create({
    transactionCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 16,
      marginBottom: 14,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    transactionContent: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    categoryIconContainer: {
      width: 46,
      height: 46,
      borderRadius: 14,
      backgroundColor: `${categoryColor}15`,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    transactionLeft: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    transactionCategory: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.textLight,
    },
    transactionRight: {
      alignItems: "flex-end",
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: "800",
    },
    transactionDate: {
      fontSize: 12,
      marginTop: 3,
      color: colors.textLight,
      fontWeight: "500",
    },
    deleteButton: {
      padding: 6,
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View
          style={[
            styles.categoryIconContainer,
            { backgroundColor: `${categoryColor}20` },
          ]}
        >
          <Ionicons name={iconName} size={24} color={categoryColor} />
        </View>

        {/* LEFT SECTION */}
        <View style={styles.transactionLeft}>
          <Text
            style={styles.transactionTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: categoryColor,
                marginRight: 6,
              }}
            />

            <Text
              style={styles.transactionCategory}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.category}
            </Text>
          </View>
        </View>

        {/* RIGHT SECTION */}
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              {
                color: isIncome ? colors.income : colors.expense,
              },
            ]}
          >
            {isIncome ? "+" : "-"}
            {formatRupiah(Math.abs(parseFloat(item.amount)), false)}
          </Text>

          <Text style={styles.transactionDate}>
            {formatDate(item.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
};
