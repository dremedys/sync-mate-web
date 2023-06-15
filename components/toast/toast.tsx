import { ToastPosition, toast as hotToast } from 'react-hot-toast';

import Toast, { ToastTypes } from './toast.component';

export interface ToastOptions {
  id?: string;
  variant?: 'default' | 'gradient' | 'complex_info';
  closeCallback?: () => void;
  duration?: number;
  ariaProps?: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  position?: ToastPosition;
  title?: string;
}

// General function for creating toast types
const createToast = (type: ToastTypes, title: string) => (message: string, options?: ToastOptions) =>
  hotToast.custom(
    t => (
      <Toast
        closeCallback={options?.closeCallback}
        variant={options?.variant}
        message={message}
        toast={t}
        type={type}
        title={options?.title || title}
      />
    ),
    options,
  );

// Overwriting toast types and adding new ones
const success = createToast(ToastTypes.success, 'Success');

const error = createToast(ToastTypes.error, 'Error');

const warning = createToast(ToastTypes.warning, 'Warning');

const info = createToast(ToastTypes.info, 'Information');

export const toast = {
  success,
  error,
  warning,
  info,
};
