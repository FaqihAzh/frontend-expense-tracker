import { StyleSheet } from "react-native";

export const useAuthStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
      justifyContent: "center",
    },

    illustration: {
      height: 280,
      width: 280,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 32,
    },

    title: {
      fontSize: 36,
      fontWeight: "800",
      color: colors.text,
      marginVertical: 20,
      textAlign: "center",
      letterSpacing: -1,
    },

    input: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: colors.border,
      fontSize: 16,
      color: colors.text,
      fontWeight: "500",
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 4,
    },

    errorInput: {
      borderColor: colors.error,
      borderWidth: 2,
    },

    button: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      marginTop: 16,
      marginBottom: 24,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    },

    buttonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: "700",
      letterSpacing: 0.5,
    },

    footerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      marginTop: 16,
    },

    footerText: {
      color: colors.textSecondary,
      fontSize: 16,
      fontWeight: "500",
    },

    linkText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "700",
    },

    verificationContainer: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
      justifyContent: "center",
      alignItems: "center",
    },

    verificationTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 24,
      textAlign: "center",
      letterSpacing: -0.5,
    },

    verificationInput: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: colors.border,
      fontSize: 18,
      color: colors.text,
      fontWeight: "600",
      width: "100%",
      textAlign: "center",
      letterSpacing: 4,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 4,
    },

    errorBox: {
      backgroundColor: colors.expenseLight,
      padding: 16,
      borderRadius: 16,
      borderLeftWidth: 4,
      borderLeftColor: colors.error,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      shadowColor: colors.error,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },

    errorText: {
      color: colors.error,
      marginLeft: 12,
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
    },
  });
