import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import RouteList, { NavigationProp } from '@common/constants/routes';
import Button from '@common/components/Button';
import Text from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Input from '@common/components/Input';
import CurrencyInput from '@common/components/CurrencyInput';
import { Colors } from '@common/styles';
import { parseCurrency } from '@common/util/currency';

type FormData = {
  amount: string;
  reference: string;
};

export default function PaymentDetailPage() {
  const navigation = useNavigation<NavigationProp>();

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
    navigation.navigate(RouteList.PaymentApprove, {
      amount: data.amount,
      references: data.reference,
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
          <Text>{`Balance: ${'RM 1,000'}`}</Text>
          {errors.amount && (
            <Text variant="bodyMedium" style={styles.errorText}>
              {errors.amount.message}
            </Text>
          )}
          <Spacer variant="large" />

          {/* Payee Details */}
          <Text variant="labelLarge">Payee Name</Text>
          <Text variant="headlineSmall">John Doe</Text>
          <Spacer variant="large" />

          {/* Account Details */}
          <Text variant="titleMedium">Account Info</Text>
          <Text variant="headlineSmall">Public Bank • 88880001</Text>
          <Spacer variant="large" />

          {/* Transfer Type */}
          <Text variant="labelLarge">Transfer Type</Text>
          <Text variant="headlineSmall">Fund Transfer</Text>
          <Spacer variant="large" />

          {/* References */}
          <Text variant="labelLarge">References</Text>
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
  errorText: {
    color: Colors.error,
  },
});
