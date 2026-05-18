'use client';

import { useAtom } from 'jotai';
import { Modal, Button } from '@heroui/react';
import { confirmationAtom } from '@/store/confirmation';

type ConfirmParams = {
  message: string;
  onConfirm: () => void;
  header?: string;
  cancelText?: string;
  confirmText?: string;
};

export const useConfirmation = () => {
  const [, setState] = useAtom(confirmationAtom);

  const confirm = ({
    message,
    onConfirm,
    header = 'Confirmation',
    cancelText = 'No',
    confirmText = 'Yes',
  }: ConfirmParams) => {
    setState({ isOpen: true, message, header, cancelText, confirmText, onConfirm });
  };

  return { confirm };
};

export function ConfirmationModal() {
  const [state, setState] = useAtom(confirmationAtom);

  const close = () => setState((s) => ({ ...s, isOpen: false }));

  const handleConfirm = () => {
    state.onConfirm?.();
    close();
  };

  return (
    <Modal isOpen={state.isOpen} onOpenChange={(open) => !open && close()}>
      <Modal.Backdrop isDismissable={false} variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.Header className="justify-center text-center text-lg font-semibold">
              {state.header}
            </Modal.Header>
            <Modal.Body className="text-center">
              <p className="text-default-600">{state.message}</p>
            </Modal.Body>
            <Modal.Footer className="flex justify-center gap-4">
              <Button variant="secondary" onPress={close} fullWidth>
                {state.cancelText}
              </Button>
              <Button variant="primary" onPress={handleConfirm} fullWidth>
                {state.confirmText}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
