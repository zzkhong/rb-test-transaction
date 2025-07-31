import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@common/constants/routes';
import Text from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Button from '@common/components/Button';
import CurrencyInput from '@common/components/CurrencyInput';
import { useBiometricAuth } from '@common/hooks/useBiometricAuth';
import useUserStore from '@common/stores/userStore';
import { formatCurrency } from '@common/util/currency';
import useTransactionStore from '@common/stores/transactionStore';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentApprove'
>;
type NavRouteProp = RouteProp<RootStackParamList, 'PaymentApprove'>;

export default function PaymentApprovePage() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<NavRouteProp>();
  const { authenticate } = useBiometricAuth();
  const { balance, setBalance } = useUserStore();
  const { recentTransactions, setRecentTransactions } = useTransactionStore();

  // approve action
  const handleApprove = React.useCallback(() => {
    (async () => {
      const isAuthenticated = await authenticate();

      if (isAuthenticated) {
        navigation.navigate('PaymentResult', params);
        setBalance(balance - params.amount);
        setRecentTransactions([
          ...recentTransactions,
          {
            id: String(Date.now()),
            recipientName: 'John Doe',
            accountNo: params.accountNo,
            bankName: params.bankName,
            amount: params.amount,
            reference: params.reference,
          },
        ]);
      } else {
        // fallback to pin
      }
    })();
  }, [
    authenticate,
    balance,
    navigation,
    params,
    recentTransactions,
    setBalance,
    setRecentTransactions,
  ]);

  // reject action
  const handleReject = React.useCallback(() => {
    navigation.navigate('PaymentResult', {
      ...params,
      error: 'Transaction has been rejected',
    });
  }, [navigation, params]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Input Amount */}
        <CurrencyInput
          autoFocus
          value={formatCurrency(params.amount)}
          editable={false}
        />
        <Spacer />

        {/* Payee Details */}
        <Text variant="labelLarge">Payee Name</Text>
        <Text variant="headlineSmall">John Doe</Text>
        <Spacer variant="large" />

        {/* Account Details */}
        <Text variant="titleMedium">Account Info</Text>
        <Text variant="headlineSmall">{`${params.bankName} • ${params.accountNo}`}</Text>
        <Spacer variant="large" />

        {/* Transfer Type */}
        <Text variant="labelLarge">Transfer Type</Text>
        <Text variant="headlineSmall">Fund Transfer</Text>
        <Spacer variant="large" />

        {/* Reference */}
        <Text variant="labelLarge">Reference</Text>
        <Text variant="headlineSmall">{params.reference}</Text>
        <Spacer />
      </ScrollView>

      <View style={styles.buttonGroup}>
        <Button style={styles.button} mode="contained" onPress={handleApprove}>
          Approve
        </Button>

        <Button style={styles.button} onPress={handleReject}>
          Reject
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  buttonGroup: {
    marginVertical: 16,
  },
  button: {
    margin: 8,
  },
});
