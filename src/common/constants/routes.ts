import { TransactionData } from '@common/interface/transaction';

export type RootStackParamList = {
  Home: undefined;
  PaymentRecipient: undefined;
  PaymentByAccount: undefined;
  PaymentByMobile: undefined;
  PaymentDetail: Pick<
    TransactionData,
    'bankName' | 'accountNo' | 'recipientName'
  >;
  PaymentApprove: Omit<TransactionData, 'id'>;
  PaymentResult: Omit<TransactionData, 'id'> & {
    error?: string;
  };
};
