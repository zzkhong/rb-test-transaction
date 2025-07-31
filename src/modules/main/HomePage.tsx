import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@common/constants/routes';
import { Container } from '@common/styles';
import Spacer from '@common/components/Spacer';
import Text from '@common/components/Text';
import Button from '@common/components/Button';
import { formatCurrency } from '@common/util/currency';
import useUserStore from '@common/stores/userStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomePage() {
  const navigation = useNavigation<NavigationProp>();
  const balance = useUserStore(state => state.balance);

  const quickActions = React.useMemo(
    () => [
      {
        id: 'transfer',
        label: 'Transfer Money',
        icon: 'bank-transfer',
        onPress: () => navigation.navigate('PaymentRecipient'),
      },
      {
        id: 'qr',
        label: 'Scan QR',
        icon: 'qrcode-scan',
        disabled: true,
      },
      {
        id: 'deposit',
        label: 'Deposit',
        icon: 'bank-transfer-in',
        disabled: true,
      },
    ],
    [navigation],
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Balance */}
      <Text style={styles.fontBold} variant="titleMedium">
        My Balance
      </Text>
      <Spacer variant="small" />

      <Text style={styles.fontBold} variant="displayMedium">
        {formatCurrency(balance)}
      </Text>
      <Spacer variant="large" />

      {/* Quick Actions */}
      <Text variant="headlineSmall">Quick Actions</Text>
      <Spacer />

      <View style={styles.actionGroup}>
        {quickActions.map(item => (
          <React.Fragment key={item.id}>
            <Button
              icon={item.icon}
              mode="elevated"
              disabled={item.disabled}
              onPress={item.onPress}
            >
              {item.label}
            </Button>

            <Spacer />
          </React.Fragment>
        ))}
      </View>
      <Spacer variant="large" />

      {/* Campaigns (Decoration Purpose) */}
      <Text variant="headlineSmall">News For You</Text>
      <Spacer />

      <>
        {[1, 2, 3].map(item => (
          <React.Fragment key={item}>
            <Card>
              <Card.Cover
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
              />
            </Card>
            <Spacer />
          </React.Fragment>
        ))}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Container.pageContainer,
    flex: 1,
  },
  content: {
    paddingVertical: 20,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  actionGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
});
