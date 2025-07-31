export interface Transaction {
  id: number;
  payeeName: string;
  accountNo: string;
}

export const initialRecipientData = {
  bankName: '',
  accountNo: '',
};

export type RecipientData = typeof initialRecipientData;

export const initialTransactionData = {
  amount: '0',
  reference: '',
};

export type TransactionData = typeof initialTransactionData;
