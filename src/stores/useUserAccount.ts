import { Seed } from 'near-seed-phrase';
import { create } from 'zustand';

interface UserAccountState {
  accountId: string;
  accountSeed: Seed;
  setUserAccount: (accountId: string, accountSeed: Seed) => void;
}

export const useUserAccount = create<UserAccountState>(set => ({
  accountId: '',
  accountSeed: {
    seedPhrase: '',
    publicKey: '',
    secretKey: '',
  },
  setUserAccount: (accountId: string, accountSeed: Seed) => set({ accountId, accountSeed }),
}));
