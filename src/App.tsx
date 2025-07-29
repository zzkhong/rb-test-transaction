import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@modules/main/HomePage';
import PaymentRecipientPage from 'modules/payment/PaymentRecipientPage';
import PaymentDetailPage from '@modules/payment/PaymentDetailPage';
import PaymentApprovePage from '@modules/payment/PaymentApprovePage';
import PaymentResultPage from '@modules/payment/PaymentResultPage';
import RouteList from 'common/constants/routes';

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={RouteList.Home}
          screenOptions={{
            header: () => null,
          }}
        >
          <Stack.Screen name={RouteList.Home} component={HomePage} />

          {/* Payment Module */}
          <Stack.Screen
            name={RouteList.PaymentRecipient}
            component={PaymentRecipientPage}
          />
          <Stack.Screen
            name={RouteList.PaymentDetail}
            component={PaymentDetailPage}
          />
          <Stack.Screen
            name={RouteList.PaymentApprove}
            component={PaymentApprovePage}
          />
          <Stack.Screen
            options={{
              gestureEnabled: false,
            }}
            name={RouteList.PaymentResult}
            component={PaymentResultPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
