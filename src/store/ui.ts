import { atom } from 'jotai';
import type { UserData } from '@/types/user';

export const sidebarOpenAtom = atom(true);
export const currentUserAtom = atom<UserData | null>(null);
