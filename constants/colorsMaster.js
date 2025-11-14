const modern = {
  primary: "#6366F1",
  primaryLight: "#818CF8",
  primaryDark: "#4F46E5",
  background: "#FAFAFA",
  backgroundSecondary: "#F8FAFC",
  text: "#1E293B",
  textSecondary: "#64748B",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  white: "#FFFFFF",
  expense: "#EF4444",
  expenseLight: "#FEF2F2",
  income: "#10B981",
  incomeLight: "#F0FDF4",
  card: "#FFFFFF",
  shadow: "rgba(15, 23, 42, 0.08)",
  shadowLight: "rgba(15, 23, 42, 0.04)",
  accent: "#F59E0B",
  accentLight: "#FEF3C7",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#06B6D4",
};

const dark = {
  primary: "#818CF8",
  primaryLight: "#A5B4FC",
  primaryDark: "#6366F1",
  background: "#0F172A",
  backgroundSecondary: "#1E293B",
  text: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textLight: "#94A3B8",
  border: "#334155",
  borderLight: "#475569",
  white: "#1E293B",
  expense: "#F87171",
  expenseLight: "#450A0A",
  income: "#34D399",
  incomeLight: "#064E3B",
  card: "#1E293B",
  shadow: "rgba(0, 0, 0, 0.25)",
  shadowLight: "rgba(0, 0, 0, 0.15)",
  accent: "#FBBF24",
  accentLight: "#451A03",
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
  info: "#22D3EE",
};

const gradients = {
  primary: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  income: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  expense: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
  card: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
  glass: "rgba(255, 255, 255, 0.1)",
};

export const THEMES = {
  modernTheme: modern,
  darkTheme: dark,
};

export const GRADIENTS_MASTER = gradients;
export const COLORS_MASTER = THEMES.modernTheme;