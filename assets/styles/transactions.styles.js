import { StyleSheet } from "react-native";
import {COLORS_MASTER} from "../../constants/colorsMaster";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS_MASTER.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    paddingLeft: 22,
    backgroundColor:COLORS_MASTER.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color:COLORS_MASTER.text,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    marginBottom: 36,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor:COLORS_MASTER.card,
    shadowColor:COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterBadge: {
    backgroundColor:COLORS_MASTER.expense,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  filterBadgeText: {
    color:COLORS_MASTER.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:COLORS_MASTER.card,
    borderRadius: 12,
    margin: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 15,
    shadowColor:COLORS_MASTER.shadow,
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
    color:COLORS_MASTER.text,
  },
  activeFiltersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  activeFiltersText: {
    color:COLORS_MASTER.textLight,
    fontSize: 14,
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor:COLORS_MASTER.expense,
  },
  clearFiltersText: {
    color:COLORS_MASTER.white,
    fontSize: 12,
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
    marginBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:COLORS_MASTER.background,
  },
  loadingText: {
    marginTop: 10,
    color:COLORS_MASTER.textLight,
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    backgroundColor:COLORS_MASTER.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor:COLORS_MASTER.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color:COLORS_MASTER.text,
  },
  modalCancel: {
    fontSize: 16,
    color:COLORS_MASTER.textLight,
  },
  modalDone: {
    fontSize: 16,
    color:COLORS_MASTER.primary,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },

  filterSection: {
    marginBottom: 30,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color:COLORS_MASTER.text,
    marginBottom: 12,
  },

  monthYearContainer: {
    gap: 15,
  },
  monthPickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:COLORS_MASTER.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor:COLORS_MASTER.border,
  },
  monthPickerText: {
    fontSize: 16,
    color:COLORS_MASTER.text,
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
    borderColor:COLORS_MASTER.border,
    backgroundColor:COLORS_MASTER.card,
  },
  yearButtonActive: {
    backgroundColor:COLORS_MASTER.primary,
    borderColor:COLORS_MASTER.primary,
  },
  yearButtonText: {
    color:COLORS_MASTER.text,
    fontSize: 14,
  },
  yearButtonTextActive: {
    color:COLORS_MASTER.white,
  },

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
    borderColor:COLORS_MASTER.border,
    backgroundColor:COLORS_MASTER.card,
  },
  categoryFilterButtonActive: {
    backgroundColor:COLORS_MASTER.primary,
    borderColor:COLORS_MASTER.primary,
  },
  categoryFilterButtonText: {
    color:COLORS_MASTER.text,
    fontSize: 14,
  },
  categoryFilterButtonTextActive: {
    color:COLORS_MASTER.white,
  },

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
    borderColor:COLORS_MASTER.border,
    backgroundColor:COLORS_MASTER.card,
  },
  typeButtonActive: {
    backgroundColor:COLORS_MASTER.primary,
    borderColor:COLORS_MASTER.primary,
  },
  typeButtonText: {
    color:COLORS_MASTER.text,
    fontSize: 16,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color:COLORS_MASTER.white,
  },

  amountInputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  amountInput: {
    flex: 1,
    backgroundColor:COLORS_MASTER.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor:COLORS_MASTER.border,
    fontSize: 16,
    color:COLORS_MASTER.text,
  },
  amountDivider: {
    color:COLORS_MASTER.textLight,
    fontSize: 16,
  },

  dateInputs: {
    gap: 12,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:COLORS_MASTER.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor:COLORS_MASTER.border,
  },
  dateButtonText: {
    fontSize: 16,
    color:COLORS_MASTER.text,
  },

  clearAllButton: {
    backgroundColor:COLORS_MASTER.expense,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  clearAllButtonText: {
    color:COLORS_MASTER.white,
    fontSize: 16,
    fontWeight: "600",
  },

  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor:COLORS_MASTER.card,
    borderRadius: 16,
    width: "80%",
    maxHeight: "60%",
    shadowColor:COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color:COLORS_MASTER.text,
    textAlign: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor:COLORS_MASTER.border,
  },
  pickerList: {
    maxHeight: 300,
  },
  pickerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor:COLORS_MASTER.border,
  },
  pickerItemActive: {
    backgroundColor:COLORS_MASTER.primary,
  },
  pickerItemText: {
    fontSize: 16,
    color:COLORS_MASTER.text,
    textAlign: "center",
  },
  pickerItemTextActive: {
    color:COLORS_MASTER.white,
    fontWeight: "600",
  },
  pickerCloseButton: {
    padding: 15,
    alignItems: "center",
  },
  pickerCloseText: {
    fontSize: 16,
    color:COLORS_MASTER.primary,
    fontWeight: "600",
  },
});