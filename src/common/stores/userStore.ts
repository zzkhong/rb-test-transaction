import { create } from 'zustand';

export interface UserStore {
  balance: number;
  setBalance: (amount: number) => void;
}

const useUserStore = create<UserStore>(set => ({
  balance: 123456.78,
  setBalance: amount => set({ balance: amount }),
}));

export default useUserStore;
