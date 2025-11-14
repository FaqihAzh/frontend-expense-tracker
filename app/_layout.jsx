import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import SafeScreen from "../components/SafeScreen";
import { ThemeProvider } from "../contexts/ThemeContext";

if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

ErrorUtils.setGlobalHandler((error, isFatal) => {
  if (__DEV__) {
    console.error('Global error:', error, isFatal);
  }
});

export default function RootLayout() {
  useEffect(() => {
    if (__DEV__) {
      console.log('App initialized');
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ClerkProvider tokenCache={tokenCache}>
          <SafeScreen>
            <Slot />
          </SafeScreen>
        </ClerkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}