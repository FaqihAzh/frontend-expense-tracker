import { StyleSheet } from "react-native";
import {Colors} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 18,
    paddingLeft: 24,
    backgroundColor: Colors.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 16,
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: "500",
  },

  periodSelector: {
    flexDirection: "row",
    marginBottom: 28,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 6,
    shadowColor: Colors.shadowLight,
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
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  periodButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  periodButtonTextActive: {
    color: Colors.white,
    fontWeight: "700",
  },

  summaryContainer: {
    flexDirection: "row",
    marginBottom: 28,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  summaryLabel: {
    fontSize: 11,
    color: Colors.textLight,
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
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    color: Colors.text,
    flexDirection: "row",
    alignItems: "center",
  },

  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },

  insightsCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: Colors.backgroundSecondary,
  },
  insightText: {
    marginLeft: 12,
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },

  recentCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: Colors.backgroundSecondary,
  },
  recentLeft: {
    flex: 1,
    maxWidth: "70%",
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
    maxWidth: "100%"
  },
  recentCategory: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
    maxWidth: "100%",
  },
  recentAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});