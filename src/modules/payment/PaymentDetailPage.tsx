import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@common/constants/routes';
import Button from '@common/components/Button';
import Text, { ErrorText } from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Input from '@common/components/Input';
import CurrencyInput from '@common/components/CurrencyInput';
import { formatCurrency, parseCurrency } from '@common/util/currency';
import useUserStore from '@common/stores/userStore';

type FormData = {
  amount: string;
  reference: string;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentDetail'
>;
type NavRouteProp = RouteProp<RootStackParamList, 'PaymentDetail'>;

export default function PaymentDetailPage() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<NavRouteProp>();
  const balance = useUserStore(state => state.balance);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: '0.00',
      reference: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    navigation.navigate('PaymentApprove', {
      accountNo: params.accountNo,
      bankName: params.bankName,
      recipientName: params.recipientName,
      amount: parseCurrency(data.amount),
      reference: data.reference,
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Input Amount */}
          <Controller
            name="amount"
            control={control}
            rules={{
              validate: value => {
                const amount = parseCurrency(value);
                if (amount <= 0) return 'Amount must be greater than 0';
                if (amount > 1000) return 'Insufficient balance';
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CurrencyInput
                autoFocus
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Text>{`Balance: ${formatCurrency(balance)}`}</Text>
          {errors.amount && <ErrorText>{errors.amount.message}</ErrorText>}
          <Spacer variant="large" />

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
          <Controller
            name="reference"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter Reference"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Spacer />
        </ScrollView>

        <Button
          style={styles.button}
          mode="contained"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          Continue
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  button: {
    margin: 16,
  },
});
