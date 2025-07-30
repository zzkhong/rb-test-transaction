import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import RouteList, { NavigationProp } from '@common/constants/routes';

import Button from '@common/components/Button';
import Text from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Input from '@common/components/Input';

export default function PaymentDetailPage() {
  const navigation = useNavigation<NavigationProp>();

  const handleContinue = React.useCallback(() => {
    navigation.navigate(RouteList.PaymentApprove);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
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
          <Input placeholder="Enter References" />
          <Spacer />
        </ScrollView>

        <Button style={styles.button} mode="contained" onPress={handleContinue}>
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
