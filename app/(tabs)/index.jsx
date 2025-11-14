import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { styles } from "../../assets/styles/home.styles";
import { BalanceCard } from "../../components/BalanceCard";
import { CustomAlert } from "../../components/CustomAlert";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import { QuickStatsWidget } from "../../components/QuickStatsWidget";
import { SignOutButton } from "../../components/SignOutButton";
import {
  BalanceCardSkeleton,
  TransactionSkeleton
} from "../../components/SkeletonLoader";
import { TransactionItem } from "../../components/TransactionItem";
import { COLORS_MASTER } from '../../constants/colorsMaster';
import { useTransactions } from "../../hooks/useTransactions";

export default function Page() {
  const { user } = useUser();
  const { 
    transactions, 
    loadTransactions, 
    deleteTransaction, 
    isLoading, 
    summary 
  } = useTransactions(user.id);
  
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

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: "https://res.cloudinary.com/dxrz0cg5z/image/upload/v1753947263/expense-tracker/logo_kaekt4.png" }}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.usernameText}>
              {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <SignOutButton showAlert={showAlert} />
        </View>
      </View>

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
          <Ionicons name="flame" size={20} color={COLORS_MASTER.primary} />
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
          contentContainerStyle={styles.transactionsListContent}
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