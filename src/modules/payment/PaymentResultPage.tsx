import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@common/constants/routes';
import { useDisableBackButton } from '@common/hooks';
import { Colors } from '@common/styles';
import Spacer from '@common/components/Spacer';
import Text from '@common/components/Text';
import Button from '@common/components/Button';
import CurrencyInput from '@common/components/CurrencyInput';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentResult'
>;
type NavRouteProp = RouteProp<RootStackParamList, 'PaymentResult'>;

export default function PaymentResultPage() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<NavRouteProp>();

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
          {params.error ? (
            <>
              <Icon size={120} color={Colors.error} source="alert-circle" />
              <Text variant="headlineSmall">{params.error}</Text>
            </>
          ) : (
            <>
              <Icon size={120} color={Colors.success} source="check-circle" />
              <Text variant="headlineSmall">Payment has been transferred</Text>
            </>
          )}
        </View>
        <Spacer variant="large" />

        {/* Input Amount */}
        <CurrencyInput autoFocus value={params.amount} editable={false} />
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
        <Text variant="headlineSmall">{params.reference || '-'}</Text>
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
