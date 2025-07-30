import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import RouteList, { NavigationProp } from '@common/constants/routes';
import Text from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Button from '@common/components/Button';
import CurrencyInput from '@common/components/CurrencyInput';

export default function PaymentApprovePage() {
  const navigation = useNavigation<NavigationProp>();

  const handleApprove = React.useCallback(() => {
    // approve action
    navigation.navigate(RouteList.PaymentResult);
  }, [navigation]);

  const handleReject = React.useCallback(() => {
    // reject action
    navigation.navigate(RouteList.PaymentResult);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Input Amount */}
        <CurrencyInput autoFocus value={String(100000)} editable={false} />
        <Spacer />

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
        <Text variant="headlineSmall">lorem ipsum</Text>
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
