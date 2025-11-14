import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLORS_MASTER } from '../constants/colorsMaster';

export const SkeletonBox = ({ width, height, borderRadius = 12, style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    
    animation.start();
    
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  );
};

export const TransactionSkeleton = () => (
  <View style={styles.transactionCard}>
    <View style={styles.transactionContent}>
      <SkeletonBox width={48} height={48} borderRadius={16} />
      <View style={styles.transactionLeft}>
        <SkeletonBox width={120} height={16} style={{ marginBottom: 8 }} />
        <SkeletonBox width={80} height={14} />
      </View>
      <View style={styles.transactionRight}>
        <SkeletonBox width={70} height={18} style={{ marginBottom: 6 }} />
        <SkeletonBox width={60} height={12} />
      </View>
    </View>
  </View>
);

export const SearchSkeleton = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchBar}>
        <SkeletonBox width={40} height={20} borderRadius={10} />
        <SkeletonBox width={"70%"} height={18} />
      </View>
    </View>
  );
};

export const BalanceCardSkeleton = () => (
  <View style={styles.balanceCard}>
    <SkeletonBox width={120} height={20} style={{ marginBottom: 12 }} />
    <SkeletonBox width={180} height={42} style={{ marginBottom: 24 }} />
    <View style={styles.balanceStats}>
      <View style={styles.balanceStatItem}>
        <SkeletonBox width={60} height={14} style={{ marginBottom: 8 }} />
        <SkeletonBox width={80} height={18} />
      </View>
      <View style={styles.balanceStatItem}>
        <SkeletonBox width={60} height={14} style={{ marginBottom: 8 }} />
        <SkeletonBox width={80} height={18} />
      </View>
    </View>
  </View>
);

export const ChartSkeleton = () => (
  <View style={styles.chartCard}>
    <SkeletonBox width={150} height={20} style={{ marginBottom: 20 }} />
    <SkeletonBox width="100%" height={200} borderRadius={16} />
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: COLORS_MASTER.borderLight,
  },
  transactionCard: {
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },
  transactionContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  transactionLeft: {
    flex: 1,
    marginLeft: 16,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  searchBar: {
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceCard: {
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 24,
    padding: 28,
    marginBottom: 25,
    shadowColor: COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  balanceStatItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS_MASTER.backgroundSecondary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
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
});