import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import RouteList, { NavigationProp } from '@common/constants/routes';

import Button from '@common/components/Button';

export default function PaymentApprovePage() {
  const navigation = useNavigation<NavigationProp>();

  const handleApprove = React.useCallback(() => {
    // approve action
    navigation.navigate(RouteList.PaymentResult);
  }, [navigation]);

  const handleReject = React.useCallback(() => {
    // reject action
    navigation.navigate(RouteList.PaymentResult);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Payee Details */}
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
