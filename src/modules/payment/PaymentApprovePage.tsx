import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@common/constants/routes';
import Text from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import Button from '@common/components/Button';
import CurrencyInput from '@common/components/CurrencyInput';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentApprove'
>;
type NavRouteProp = RouteProp<RootStackParamList, 'PaymentApprove'>;

export default function PaymentApprovePage() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<NavRouteProp>();

  const handleApprove = React.useCallback(() => {
    // approve action
    navigation.navigate('PaymentResult', params);
  }, [navigation, params]);

  const handleReject = React.useCallback(() => {
    // reject action
    navigation.navigate('PaymentResult', params);
  }, [navigation, params]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
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
        <Text variant="headlineSmall">{params.reference}</Text>
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
