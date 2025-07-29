import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const RouteList = {
  Home: 'Main_Home',
  PaymentRecipient: 'Payment_Recipient',
  PaymentDetail: 'Payment_Detail',
  PaymentApprove: 'Payment_Approve',
  PaymentResult: 'Payment_Result',
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
