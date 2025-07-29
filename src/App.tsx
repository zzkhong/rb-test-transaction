import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './modules/HomePage';

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Recipients" component={HomePage} />
        <Stack.Screen name="Payment" component={HomePage} />
        <Stack.Screen name="Approval" component={HomePage} />
        <Stack.Screen name="Result" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
