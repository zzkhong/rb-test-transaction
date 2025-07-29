import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentDetailPage() {
  return (
    <View style={style.container}>
      <Text>PaymentDetailPage</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
