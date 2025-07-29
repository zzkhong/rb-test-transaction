import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RouteList, { NavigationProp } from '@common/constants/routes';
import { Container } from '@common/styles';
import Button from '@common/components/Button';
import Spacer from '@common/components/Spacer';
import Text from '@common/components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentRecipientPage() {
  const navigation = useNavigation<NavigationProp>();

  const recipientButtons = React.useMemo(
    () => [
      {
        id: 'bank',
        label: 'Account Number',
        icon: 'bank',
        onPress: () => navigation.navigate(RouteList.PaymentDetail),
      },
      {
        id: 'duitnow',
        label: 'Mobile Number',
        icon: 'card-account-phone',
        onPress: () => navigation.navigate(RouteList.PaymentDetail),
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Transfer Option */}
      <View style={styles.buttonRow}>
        {recipientButtons.map(item => (
          <Button
            mode="elevated"
            key={item.id}
            icon={item.icon}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={item.onPress}
          >
            {item.label}
          </Button>
        ))}
      </View>
      <Spacer variant="large" />

      {/* Recent Transfer */}
      <Text variant="headlineSmall">Recent Transactions</Text>
      <Spacer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Container.pageContainer,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flexBasis: '50%',
  },
  buttonContent: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    flexWrap: 'wrap',
  },
});
