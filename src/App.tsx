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
import PaymentByMobilePage from '@modules/payment/PaymentByMobilePage';
import PaymentByAccountPage from '@modules/payment/PaymentByAccountPage';

import { RootStackParamList } from '@common/constants/routes';
import Header from '@common/components/Header';
import { Colors } from '@common/styles';

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            // eslint-disable-next-line react/no-unstable-nested-components
            header: props => <Header {...props} />,
            contentStyle: {
              backgroundColor: Colors.background,
            },
          }}
        >
          <Stack.Screen
            options={{ header: () => null }}
            name="Home"
            component={HomePage}
          />

          {/* Payment Module */}
          <Stack.Screen
            name="PaymentRecipient"
            options={{
              headerTitle: 'Payment Recipients',
            }}
            component={PaymentRecipientPage}
          />
          <Stack.Screen
            name="PaymentByAccount"
            options={{
              headerTitle: 'Fill in Account Details',
            }}
            component={PaymentByAccountPage}
          />
          <Stack.Screen
            name="PaymentByMobile"
            options={{
              headerTitle: 'Select Mobile Number',
            }}
            component={PaymentByMobilePage}
          />
          <Stack.Screen
            name="PaymentDetail"
            options={{
              headerTitle: 'Payment Detail',
            }}
            component={PaymentDetailPage}
          />
          <Stack.Screen
            name="PaymentApprove"
            options={{
              headerTitle: 'Payment Confirmation',
            }}
            component={PaymentApprovePage}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Payment Result',
              gestureEnabled: false,
              header: () => null,
            }}
            name="PaymentResult"
            component={PaymentResultPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
