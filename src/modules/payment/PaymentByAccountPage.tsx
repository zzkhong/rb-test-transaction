import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@common/constants/routes';
import Button from '@common/components/Button';
import Text, { ErrorText } from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Input from '@common/components/Input';
import Dropdown from '@common/components/Dropdown';
import { BANK_DATA } from '@common/constants/mockData';
import { getBankName } from '@common/util/string';

type FormData = {
  bankId: string;
  accountNo: string;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentByAccount'
>;

export default function PaymentByAccountPage() {
  const navigation = useNavigation<NavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    defaultValues: {
      bankId: '',
      accountNo: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    navigation.navigate('PaymentDetail', {
      bankName: getBankName(data.bankId),
      accountNo: data.accountNo,
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Payee Details */}
          <Text variant="titleMedium">Bank</Text>
          <Controller
            name="bankId"
            control={control}
            rules={{ required: 'Please select recipient bank' }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                data={BANK_DATA}
                value={value}
                placeholder="Select Recipient Bank"
                labelField="label"
                valueField="id"
                onChange={item => onChange(item.id)}
              />
            )}
          />
          <Spacer variant="large" />

          {/* Account Details */}
          <Text variant="titleMedium">Account Number</Text>

          <Controller
            name="accountNo"
            control={control}
            rules={{
              required: 'Please enter an account number',
              validate: value => {
                if (!/^\d+$/.test(value))
                  return 'Account number must contain only digits';
                if (value.length < 8 || value.length > 12) {
                  return 'Account number must be between 8 and 12 digits';
                }
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter Account Number"
                keyboardType="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.accountNo && (
            <ErrorText>{errors.accountNo.message}</ErrorText>
          )}
          <Spacer variant="large" />
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
