import { StyleSheet } from "react-native";
import {COLORS_MASTER} from "../../constants/colorsMaster";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_MASTER.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS_MASTER.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS_MASTER.text,
  },
  backButton: {
    padding: 5,
  },
  saveButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButton: {
    fontSize: 16,
    color: COLORS_MASTER.primary,
    fontWeight: "600",
  },
  saveButtonDisabledText: {
    color: COLORS_MASTER.textLight,
  },
  card: {
    backgroundColor: COLORS_MASTER.card,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS_MASTER.border,
  },
  typeButtonActive: {
    backgroundColor: COLORS_MASTER.primary,
    borderColor: COLORS_MASTER.primary,
  },
  typeIcon: {
    marginRight: 8,
  },
  typeButtonText: {
    color: COLORS_MASTER.text,
    fontSize: 16,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: COLORS_MASTER.white,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS_MASTER.border,
    paddingBottom: 16,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS_MASTER.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS_MASTER.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS_MASTER.border,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    backgroundColor: COLORS_MASTER.white,
  },
  inputIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS_MASTER.text,
  },
  inputError: {
    borderColor: COLORS_MASTER.expense,
    borderBottomColor: COLORS_MASTER.expense,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: -15,
    paddingHorizontal: 0,
  },
  errorText: {
    color: COLORS_MASTER.expense,
    fontSize: 12,
    marginLeft: 5,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS_MASTER.text,
    marginBottom: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS_MASTER.border,
    backgroundColor: COLORS_MASTER.white,
  },
  categoryButtonActive: {
    backgroundColor: COLORS_MASTER.primary,
    borderColor: COLORS_MASTER.primary,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    color: COLORS_MASTER.text,
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: COLORS_MASTER.white,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});