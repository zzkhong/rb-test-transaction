import { TransactionData } from '@common/interface/transaction';

export type RootStackParamList = {
  Home: undefined;
  PaymentRecipient: undefined;
  PaymentByAccount: undefined;
  PaymentByMobile: undefined;
  PaymentDetail: Pick<TransactionData, 'bankName' | 'accountNo'>;
  PaymentApprove: Omit<TransactionData, 'recipientName' | 'id'>;
  PaymentResult: Omit<TransactionData, 'recipientName' | 'id'> & {
    error?: string;
  };
};
