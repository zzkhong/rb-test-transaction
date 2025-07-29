import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@common/components/Button';
import { Container } from '@common/styles';

export default function PaymentRecipientPage() {
  const recipientButtons = React.useMemo(
    () => [
      {
        id: 'bank',
        label: 'Account Number',
        icon: 'bank',
        onPress: () => null,
      },
      {
        id: 'duitnow',
        label: 'Mobile Number',
        icon: 'card-account-phone',
        onPress: () => null,
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        {recipientButtons.map(item => (
          <Button
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
    </View>
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
