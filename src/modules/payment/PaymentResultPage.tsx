import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

import { NavigationProp } from '@common/constants/routes';
import { useDisableBackButton } from '@common/hooks';
import { Colors } from '@common/styles';
import Spacer from '@common/components/Spacer';
import Text from '@common/components/Text';
import Button from '@common/components/Button';
import CurrencyInput from '@common/components/CurrencyInput';

export default function PaymentResultPage() {
  const navigation = useNavigation<NavigationProp>();

  useDisableBackButton();

  const handleBack = React.useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Result Indicator */}
        <View style={styles.header}>
          {/* <Icon size={120} color={Colors.error} source="alert-circle" /> */}
          {/* <Text variant="headlineSmall">Payment has been transferred</Text> */}

          <Icon size={120} color={Colors.success} source="check-circle" />
          <Text variant="headlineSmall">Payment has been transferred</Text>
        </View>
        <Spacer variant="large" />

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

      <Button style={styles.button} mode="contained" onPress={handleBack}>
        Back to Home
      </Button>
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
  header: {
    alignItems: 'center',
    margin: 32,
  },
  button: {
    margin: 16,
  },
});
