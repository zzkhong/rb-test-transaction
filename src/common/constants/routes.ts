import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const RouteList = {
  Home: 'Home',
  PaymentRecipient: 'Payment Recipients',
  PaymentDetail: 'Payment Detail',
  PaymentApprove: 'Payment Confirmation',
  PaymentResult: 'Payment Result',
};

const RouteType = {
  [RouteList.Home]: undefined,
  [RouteList.PaymentRecipient]: undefined,
  [RouteList.PaymentDetail]: undefined,
  [RouteList.PaymentApprove]: undefined,
  [RouteList.PaymentResult]: undefined,
};

export type NavigationProp = NativeStackNavigationProp<RouteType, string>;
export type RouteType = typeof RouteType;

export default RouteList;
