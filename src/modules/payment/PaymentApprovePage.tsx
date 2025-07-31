import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { RootStackParamList } from '@common/constants/routes';
import Text from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Button from '@common/components/Button';
import CurrencyInput from '@common/components/CurrencyInput';
import { useBiometricAuth, useTransfer } from '@common/hooks';
import useUserStore from '@common/stores/userStore';
import { formatCurrency } from '@common/util/currency';
import useTransactionStore from '@common/stores/transactionStore';
import PinModal, { STORED_PIN } from '@common/components/PinModal';

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
  const { mutate: transfer, isPending } = useTransfer();

  const [showPinModal, setShowPinModal] = React.useState(false);

  const handleAuthSuccess = React.useCallback(() => {
    transfer(
      {
        recipientName: params.recipientName,
        accountNo: params.accountNo,
        amount: params.amount,
        bankName: params.bankName,
        reference: params.reference,
      },
      {
        onSuccess: response => {
          setBalance(balance - params.amount);
          setRecentTransactions([
            ...recentTransactions,
            {
              id: response.data.id,
              recipientName: response.data.recipientName,
              accountNo: response.data.accountNo,
              bankName: response.data.bankName,
              amount: response.data.amount,
              reference: response.data.reference,
            },
          ]);
          navigation.navigate('PaymentResult', params);
        },
        onError: err => {
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        },
      },
    );
  }, [
    balance,
    navigation,
    params,
    recentTransactions,
    setBalance,
    setRecentTransactions,
    transfer,
  ]);

  // approve action
  const handleApprove = React.useCallback(() => {
    (async () => {
      const isAuthenticated = await authenticate();

      if (isAuthenticated) {
        handleAuthSuccess();
      } else {
        // Fallback to pin input
        setShowPinModal(true);
      }
    })();
  }, [authenticate, handleAuthSuccess]);

  // reject action
  const handleReject = React.useCallback(() => {
    navigation.navigate('PaymentResult', {
      ...params,
      error: 'Transaction has been rejected',
    });
  }, [navigation, params]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {isPending ? (
        <ActivityIndicator style={styles.loading} size="large" />
      ) : (
        <>
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
            <Text variant="headlineSmall">{params.recipientName}</Text>
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
            <Text variant="headlineSmall">{params.reference || '-'}</Text>
            <Spacer />
          </ScrollView>

          <View style={styles.buttonGroup}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleApprove}
            >
              Approve
            </Button>

            <Button style={styles.button} onPress={handleReject}>
              Reject
            </Button>
          </View>
        </>
      )}

      <PinModal
        visible={showPinModal}
        // If fallback to pin still fail, reject payment
        onConfirm={pin => {
          // Hardcoded pin logic here
          if (pin === STORED_PIN) {
            handleAuthSuccess();
          } else {
            handleReject();
          }
          setShowPinModal(false);
        }}
        onCancel={() => setShowPinModal(false)}
      />
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
  loading: {
    marginVertical: 16,
  },
});
