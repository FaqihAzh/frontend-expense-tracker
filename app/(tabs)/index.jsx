import { useUser } from '@clerk/clerk-expo'
import {FlatList, RefreshControl, Text, View} from 'react-native'
import {SignOutButton} from "../../components/SignOutButton";
import {useTransactions} from "../../hooks/useTransactions";
import {useEffect, useState} from "react";
import PageLoader from "../../components/PageLoader";
import {styles} from "../../assets/styles/home.styles";
import {Image} from "expo-image";
import {BalanceCard} from "../../components/BalanceCard";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import {useRouter} from "expo-router";
import {TransactionItem} from "../../components/TransactionItem";
import {CustomAlert} from "../../components/CustomAlert";

export default function Page() {
  const { user } = useUser()
  const router = useRouter();

  const { transactions, loadTransactions, deleteTransaction, isLoading, summary } = useTransactions(
    user.id
  )
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
    await loadTransactions();
    setRefreshing(false);
  };

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

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

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <SignOutButton showAlert={showAlert} />
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={[styles.sectionTitle, { marginBottom: 5}]}>Recent Transactions</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.transactionsListContent}
          data={transactions}
          renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
          ListEmptyComponent={<NoTransactionsFound />}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
  )
}