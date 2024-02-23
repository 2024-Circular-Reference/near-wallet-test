import { create } from 'zustand';
import type { Pathname } from '@src/types/router';

interface RouterState {
  pathname: Pathname;
  setPathname: (pathname: string) => void;
}

export const useRouter = create<RouterState>(set => ({
  pathname: '/',
  setPathname: (pathname: Pathname) => set({ pathname }),
}));
