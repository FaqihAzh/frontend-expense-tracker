import { StyleSheet } from "react-native";
import {Colors} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    paddingLeft: 22,
    backgroundColor: Colors.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterBadge: {
    backgroundColor: Colors.expense,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  filterBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    margin: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
  },
  activeFiltersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  activeFiltersText: {
    color: Colors.textLight,
    fontSize: 14,
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.expense,
  },
  clearFiltersText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 10,
    color: Colors.textLight,
    fontSize: 16,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  modalCancel: {
    fontSize: 16,
    color: Colors.textLight,
  },
  modalDone: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },

  // Filter Section Styles
  filterSection: {
    marginBottom: 30,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },

  // Month Year Container
  monthYearContainer: {
    gap: 15,
  },
  monthPickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  monthPickerText: {
    fontSize: 16,
    color: Colors.text,
  },
  yearSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  yearButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  yearButtonText: {
    color: Colors.text,
    fontSize: 14,
  },
  yearButtonTextActive: {
    color: Colors.white,
  },

  // Category Grid
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  categoryFilterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryFilterButtonText: {
    color: Colors.text,
    fontSize: 14,
  },
  categoryFilterButtonTextActive: {
    color: Colors.white,
  },

  // Type Buttons
  typeButtons: {
    flexDirection: "row",
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  typeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: Colors.white,
  },

  // Amount Inputs
  amountInputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  amountInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
    color: Colors.text,
  },
  amountDivider: {
    color: Colors.textLight,
    fontSize: 16,
  },

  // Date Inputs
  dateInputs: {
    gap: 12,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateButtonText: {
    fontSize: 16,
    color: Colors.text,
  },

  // Clear All Button
  clearAllButton: {
    backgroundColor: Colors.expense,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  clearAllButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  // Picker Modal Styles
  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    width: "80%",
    maxHeight: "60%",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerList: {
    maxHeight: 300,
  },
  pickerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerItemActive: {
    backgroundColor: Colors.primary,
  },
  pickerItemText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
  pickerItemTextActive: {
    color: Colors.white,
    fontWeight: "600",
  },
  pickerCloseButton: {
    padding: 15,
    alignItems: "center",
  },
  pickerCloseText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
});