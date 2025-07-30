import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const RouteList = {
  Home: 'Home',
  PaymentRecipient: 'Payment Recipients',
  PaymentByAccount: 'Fill in Account Details',
  PaymentByMobile: 'Select Mobile Number',
  PaymentDetail: 'Payment Detail',
  PaymentApprove: 'Payment Confirmation',
  PaymentResult: 'Payment Result',
};

const RouteType = {
  [RouteList.Home]: undefined,
  [RouteList.PaymentRecipient]: undefined,
  [RouteList.PaymentByAccount]: undefined,
  [RouteList.PaymentByMobile]: undefined,
  [RouteList.PaymentDetail]: undefined,
  [RouteList.PaymentApprove]: undefined,
  [RouteList.PaymentResult]: undefined,
};

export type NavigationProp = NativeStackNavigationProp<RouteType, string>;
export type RouteType = typeof RouteType;

export default RouteList;
