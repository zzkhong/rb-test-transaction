import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentApprovePage() {
  return (
    <View style={style.container}>
      <Text>PaymentApprovePage</Text>
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
