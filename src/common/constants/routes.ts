import { RecipientData, TransactionData } from '@common/interface/transaction';

export type RootStackParamList = {
  Home: undefined;
  PaymentRecipient: undefined;
  PaymentByAccount: undefined;
  PaymentByMobile: undefined;
  PaymentDetail: RecipientData;
  PaymentApprove: RecipientData & TransactionData;
  PaymentResult: RecipientData & TransactionData & { error?: string };
};
