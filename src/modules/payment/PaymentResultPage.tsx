import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentResultPage() {
  return (
    <View style={style.container}>
      <Text>PaymentResultPage</Text>
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
