import * as React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Divider } from 'react-native-paper';

import { RootStackParamList } from '@common/constants/routes';
import { Container } from '@common/styles';
import Button from '@common/components/Button';
import Spacer from '@common/components/Spacer';
import Text from '@common/components/Text';
import { TransactionData } from '@common/interface/transaction';
import useTransactionStore from '@common/stores/transactionStore';

function EmptyRecentContent() {
  return (
    <View style={styles.listEmptyContent}>
      <Text>No recent transactions</Text>
    </View>
  );
}

function RecentItem({
  transaction,
  onPress,
}: {
  transaction: TransactionData;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.recentItem}>
      <View>
        <Text variant="bodyMedium">{transaction.recipientName}</Text>
        <Text variant="labelMedium">
          {`${transaction.bankName} - ${transaction.accountNo}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentRecipient'
>;

export default function PaymentRecipientPage() {
  const navigation = useNavigation<NavigationProp>();
  const { recentTransactions } = useTransactionStore();

  const recipientButtons = React.useMemo(
    () => [
      {
        id: 'bank',
        label: 'Account Number',
        icon: 'bank',
        onPress: () => navigation.navigate('PaymentByAccount'),
      },
      {
        id: 'mobile',
        label: 'Mobile Number',
        icon: 'card-account-phone',
        onPress: () => navigation.navigate('PaymentByMobile'),
      },
    ],
    [navigation],
  );

  const handleRecentPress = React.useCallback(
    (transaction: TransactionData) => {
      // Navigate or handle the press event for the transaction
      navigation.navigate('PaymentDetail', {
        recipientName: 'John Doe',
        bankName: transaction.bankName,
        accountNo: transaction.accountNo,
      });
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: TransactionData }) => (
      <RecentItem transaction={item} onPress={() => handleRecentPress(item)} />
    ),
    [handleRecentPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Transfer Option */}
      <View style={styles.buttonRow}>
        {recipientButtons.map(item => (
          <Button
            mode="elevated"
            key={item.id}
            icon={item.icon}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={item.onPress}
          >
            {item.label}
          </Button>
        ))}
      </View>
      <Spacer variant="large" />

      {/* Recent Transfer */}
      <Text variant="headlineSmall">Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyRecentContent />}
      />
      <Spacer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Container.pageContainer,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flexBasis: '50%',
  },
  buttonContent: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    flexWrap: 'wrap',
  },
  listEmptyContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentItem: {
    flex: 1,
    minHeight: 48,
    marginVertical: 4,
    justifyContent: 'center',
  },
});
