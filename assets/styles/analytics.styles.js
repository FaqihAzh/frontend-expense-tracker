import { StyleSheet } from "react-native";
import {COLORS_MASTER} from "../../constants/colorsMaster";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_MASTER.background,
  },
  header: {
    padding: 18,
    paddingLeft: 24,
    backgroundColor: COLORS_MASTER.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS_MASTER.text,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    padding: 16,
    marginBottom: 105,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_MASTER.background,
  },
  loadingText: {
    marginTop: 16,
    color: COLORS_MASTER.textSecondary,
    fontSize: 16,
    fontWeight: "500",
  },

  periodSelector: {
    flexDirection: "row",
    marginBottom: 28,
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 20,
    padding: 6,
    shadowColor: COLORS_MASTER.shadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 16,
  },
  periodButtonActive: {
    backgroundColor: COLORS_MASTER.primary,
    shadowColor: COLORS_MASTER.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  periodButtonText: {
    color: COLORS_MASTER.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  periodButtonTextActive: {
    color: COLORS_MASTER.white,
    fontWeight: "700",
  },

  summaryContainer: {
    flexDirection: "row",
    marginBottom: 28,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS_MASTER.textLight,
    marginTop: 8,
    marginBottom: 6,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "800",
  },

  chartCard: {
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },

  chartTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20
  },

  chartTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS_MASTER.text,
    flexDirection: "row",
    alignItems: "center",
  },

  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },

  insightsCard: {
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: COLORS_MASTER.backgroundSecondary,
  },
  insightText: {
    marginLeft: 12,
    flex: 1,
    color: COLORS_MASTER.text,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },

  recentCard: {
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: COLORS_MASTER.backgroundSecondary,
  },
  recentLeft: {
    flex: 1,
    maxWidth: "70%",
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS_MASTER.text,
    marginBottom: 4,
    maxWidth: "100%"
  },
  recentCategory: {
    fontSize: 14,
    color: COLORS_MASTER.textSecondary,
    fontWeight: "500",
    maxWidth: "100%",
  },
  recentAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});