import { create } from 'zustand';
import { Transaction } from '@common/interface/transaction';

export interface TransactionStore {
  recentTransactions: Transaction[];
  setRecentTransactions: (transactions: Transaction[]) => void;
}

const useTransactionStore = create<TransactionStore>(set => ({
  recentTransactions: [],
  setRecentTransactions: transactions =>
    set({ recentTransactions: transactions }),
}));

export default useTransactionStore;
