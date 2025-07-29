import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@modules/main/HomePage';
import RecipientPage from '@modules/payment/RecipientPage';
import PaymentDetailPage from '@modules/payment/PaymentDetailPage';
import PaymentApprovePage from '@modules/payment/PaymentApprovePage';
import PaymentResultPage from '@modules/payment/PaymentResultPage';

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => null,
          }}
        >
          <Stack.Screen name="Home" component={HomePage} />

          {/* Payment Module */}
          <Stack.Screen name="PaymentRecipient" component={RecipientPage} />
          <Stack.Screen name="PaymentDetail" component={PaymentDetailPage} />
          <Stack.Screen name="PaymentApprove" component={PaymentApprovePage} />
          <Stack.Screen name="PaymentResult" component={PaymentResultPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
