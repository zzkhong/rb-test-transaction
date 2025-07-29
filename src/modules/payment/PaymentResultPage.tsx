import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { NavigationProp } from '@common/constants/routes';
import { useDisableBackButton } from '@common/hooks';
import Spacer from '@common/components/Spacer';
import Text from '@common/components/Text';

import Button from '@common/components/Button';

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
  button: {
    margin: 16,
  },
});
