import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export const HomeHeader = ({ user, onSignOut }) => {
  const { theme, toggleTheme, colors } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).leftSection}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dxrz0cg5z/image/upload/v1736253508/WhatsApp_Pp_xmqdq8.jpg",
          }}
          style={styles(colors).profileImage}
        />

        <View>
          <Text style={styles(colors).welcomeText}>Welcome back,</Text>
          <Text style={styles(colors).usernameText}>
            {user?.emailAddresses?.[0]?.emailAddress.split("@")[0]}
          </Text>
        </View>
      </View>

      <View style={styles(colors).rightSection}>
        <TouchableOpacity
          style={styles(colors).iconButton}
          onPress={toggleTheme}
        >
          <Ionicons
            name={theme === "dark" ? "moon" : "sunny"}
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(colors).iconButton}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={styles(colors).overlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles(colors).menu}>
            {/* <TouchableOpacity
              style={styles(colors).menuItem}
              onPress={toggleTheme}
            >
              <Ionicons
                name="color-palette"
                size={18}
                color={colors.primary}
              />
              <Text style={styles(colors).menuText}>Change Theme</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles(colors).menuItem}
              onPress={onSignOut}
            >
              <Ionicons name="log-out-outline" size={18} color={colors.error} />
              <Text style={[styles(colors).menuText, { color: colors.error }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32,
      paddingVertical: 8,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    profileImage: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 16,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    welcomeText: {
      fontSize: 14,
      color: colors.textLight,
      marginBottom: 4,
    },
    usernameText: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.text,
      textTransform: "capitalize",
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    iconButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },

    overlay: {
      flex: 1,
      backgroundColor: "#00000055",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      paddingTop: 80,
      paddingRight: 16,
    },
    menu: {
      backgroundColor: colors.card,
      width: 170,
      borderRadius: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      gap: 10,
    },
    menuText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
  });
