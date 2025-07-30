import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { Colors } from "../constants/colors";
import { formatDate } from "../lib/utils";

const CATEGORY_ICONS = {
  "Food & Drinks": "restaurant",
  Shopping: "bag",
  Transportation: "car-sport",
  Entertainment: "game-controller",
  Bills: "receipt",
  Income: "trending-up",
  Other: "ellipsis-horizontal-circle",
};

const CATEGORY_COLORS = {
  "Food & Drinks": "#FF6B6B",
  Shopping: "#4ECDC4",
  Transportation: "#45B7D1",
  Entertainment: "#96CEB4",
  Bills: "#FECA57",
  Income: "#6C5CE7",
  Other: "#A0A0A0",
};

export const TransactionItem = ({ item, onDelete }) => {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag";
  const categoryColor = CATEGORY_COLORS[item.category] || Colors.textLight;

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={[
          styles.categoryIconContainer,
          { backgroundColor: `${categoryColor}15` }
        ]}>
          <Ionicons
            name={iconName}
            size={24}
            color={categoryColor}
          />
        </View>

        <View style={styles.transactionLeft}>
          <Text
            style={styles.transactionTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <View style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: categoryColor,
              marginRight: 6,
            }} />
            <Text
              style={styles.transactionCategory}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.category}
            </Text>
          </View>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? Colors.income : Colors.expense }
            ]}
          >
            {isIncome ? `+` : "-"}${Math.abs(parseFloat(item.amount)).toFixed(2)}
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
        <Ionicons name="trash" size={20} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
};