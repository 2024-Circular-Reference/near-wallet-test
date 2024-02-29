import { create } from 'zustand';
import { UserAccount } from '../types/wallet';

interface UserAccountState {
  userAccount: UserAccount | null;
  setUserAccount: (userAccount: UserAccount) => void;
}

export const useUserAccount = create<UserAccountState>(set => ({
  userAccount: null,
  setUserAccount: userAccount => set({ userAccount }),
}));
