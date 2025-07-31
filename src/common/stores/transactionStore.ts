import { create } from 'zustand';
import { TransactionData } from '@common/interface/transaction';

export interface TransactionStore {
  recentTransactions: TransactionData[];
  setRecentTransactions: (transactions: TransactionData[]) => void;
}

const useTransactionStore = create<TransactionStore>(set => ({
  recentTransactions: [],
  setRecentTransactions: transactions =>
    set({ recentTransactions: transactions }),
}));

export default useTransactionStore;
