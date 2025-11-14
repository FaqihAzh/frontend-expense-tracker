import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { BalanceCard } from "../../components/BalanceCard";
import { CustomAlert } from "../../components/CustomAlert";
import { HomeHeader } from "../../components/HomeHeader";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import { QuickStatsWidget } from "../../components/QuickStatsWidget";
import {
  BalanceCardSkeleton,
  TransactionSkeleton
} from "../../components/SkeletonLoader";
import { TransactionItem } from "../../components/TransactionItem";
import { useTheme } from "../../contexts/ThemeContext";
import { useTransactions } from "../../hooks/useTransactions";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { colors } = useTheme();
  
  const { 
    transactions, 
    loadTransactions, 
    deleteTransaction, 
    isLoading, 
    summary 
  } = useTransactions(user?.id);
  
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'success',
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
    showCancel: false,
  });

  const showAlert = (type, title, message, onConfirm = () => {}, onCancel = () => {}, showCancel = false) => {
    setAlertConfig({
      type,
      title,
      message,
      onConfirm: () => {
        setAlertVisible(false);
        onConfirm();
      },
      onCancel: () => {
        setAlertVisible(false);
        onCancel();
      },
      showCancel,
    });
    setAlertVisible(true);
  };

  const handleSignOut = () => {
    showAlert(
      'confirm-sign-out',
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      async () => {
        try {
          await signOut();
        } catch (err) {
          // Silently handle sign out errors to prevent error screen
          if (__DEV__) {
            console.error('Sign out error:', err);
          }
          // Force navigation to sign-in even if there's an error
          // The error boundary will prevent crashes
        }
      },
      () => {},
      true
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadTransactions();
    } catch (error) {
      showAlert('error', 'Error', 'Failed to refresh data');
    }
    setRefreshing(false);
  };

  useEffect(() => {
    if (user?.id) {
      loadTransactions().catch(() => {
        showAlert('error', 'Error', 'Failed to load transactions');
      });
    }
  }, [user?.id]);

  const handleDelete = (id) => {
    showAlert(
      'confirm',
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      () => deleteTransaction(id, showAlert),
      () => {},
      true
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 16,
      paddingBottom: 0,
      marginBottom: 100,
      flex: 1,
    },
    transactionsHeaderContainer: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
      marginBottom: 0,
      paddingBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 0,
    },
  });

  const renderHeader = () => (
    <>
      <HomeHeader user={user} onSignOut={handleSignOut} />

      {isLoading && !refreshing ? (
        <>
          <BalanceCardSkeleton />
          <View style={{ marginBottom: 12 }}>
            <TransactionSkeleton />
            <TransactionSkeleton />
          </View>
        </>
      ) : (
        <>
          <BalanceCard summary={summary} />
          <QuickStatsWidget summary={summary} transactions={transactions} />
        </>
      )}

      {!isLoading && (
        <View style={styles.transactionsHeaderContainer}>
          <Ionicons name="flame" size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={transactions}
          renderItem={({ item }) =>
            !isLoading ? (
              <TransactionItem
                item={item}
                onDelete={handleDelete}
              />
            ) : (
              <View>
                <TransactionSkeleton />
              </View>
            )
          }
          ListEmptyComponent={
            isLoading && !refreshing ? (
              <View>
                <TransactionSkeleton />
              </View>
            ) : (
              <NoTransactionsFound />
            )
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
        showCancel={alertConfig.showCancel}
      />
    </View>
  );
}