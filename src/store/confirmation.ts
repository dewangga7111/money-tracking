import { atom } from 'jotai';

type ConfirmState = {
  isOpen: boolean;
  message: string;
  header: string;
  cancelText: string;
  confirmText: string;
  onConfirm: (() => void) | null;
};

export const confirmationAtom = atom<ConfirmState>({
  isOpen: false,
  message: '',
  header: 'Confirmation',
  cancelText: 'No',
  confirmText: 'Yes',
  onConfirm: null,
});
