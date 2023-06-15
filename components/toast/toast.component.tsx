import { ComplexToast } from '@/ui/complex-toast';
import { GradientToaster } from '@/ui/gradient-toaster/gradient-toaster.component';
import React from 'react';
import { Toast as ToastType, toast as hotToast } from 'react-hot-toast';

export enum ToastTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export type ToastProps = {
  toast: ToastType;
  type: ToastTypes;
  message: string;
  title: string;
  variant?: 'default' | 'gradient' | 'complex_info';
  closeCallback?: () => void;
};

const Toast: React.FC<ToastProps> = ({ toast, type, message, variant = 'default', title, closeCallback }) => {
  const handleClose = () => {
    hotToast.dismiss(toast.id);

    if (closeCallback) {
      closeCallback();
    }
  };

  if (variant === 'gradient') {
    return (
      <GradientToaster visible={toast.visible} title={title || 'Success'} message={message} onClose={handleClose} />
    );
  }

  return <ComplexToast visible={toast.visible} title={title || 'Success'} message={message} onClose={handleClose} />;
};

export default Toast;
