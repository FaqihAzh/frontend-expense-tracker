import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS_MASTER } from '../constants/colorsMaster';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Filter out certain errors that shouldn't show error screen
    const errorMessage = error?.message || error?.toString() || '';
    
    // Don't show error screen for Clerk sign-out errors or property read errors
    if (
      errorMessage.includes('Cannot read property') ||
      errorMessage.includes('clerk') ||
      errorMessage.includes('sign') ||
      errorMessage.includes('session')
    ) {
      if (__DEV__) {
        console.warn('Non-critical error caught:', errorMessage);
      }
      return { hasError: false, error: null };
    }
    
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const errorMessage = error?.message || error?.toString() || '';
    
    if (__DEV__) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    // Don't set error state for non-critical errors
    if (
      errorMessage.includes('Cannot read property') ||
      errorMessage.includes('clerk') ||
      errorMessage.includes('sign') ||
      errorMessage.includes('session')
    ) {
      this.setState({ hasError: false, error: null });
      return;
    }
    
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons name="alert-circle" size={80} color={COLORS_MASTER.error} />
          </View>
          
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            Don't worry, it's not your fault. We're working to fix this issue.
          </Text>

          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Ionicons name="refresh" size={20} color={COLORS_MASTER.white} />
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>

          {__DEV__ && this.state.error && (
            <View style={styles.errorDetails}>
              <Text style={styles.errorText}>
                {this.state.error.toString()}
              </Text>
            </View>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_MASTER.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS_MASTER.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS_MASTER.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS_MASTER.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 8,
  },
  buttonText: {
    color: COLORS_MASTER.white,
    fontSize: 16,
    fontWeight: '700',
  },
  errorDetails: {
    marginTop: 24,
    padding: 16,
    backgroundColor: COLORS_MASTER.expenseLight,
    borderRadius: 12,
    width: '100%',
  },
  errorText: {
    fontSize: 12,
    color: COLORS_MASTER.error,
    fontFamily: 'monospace',
  },
});

export default ErrorBoundary;