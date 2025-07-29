import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { NavigationProp } from '@common/constants/routes';

import Button from '@common/components/Button';

export default function PaymentResultPage() {
  const navigation = useNavigation<NavigationProp>();

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
