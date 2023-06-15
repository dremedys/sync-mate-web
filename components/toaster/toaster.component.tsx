import React, { useEffect } from 'react';
import {
  DefaultToastOptions,
  Toaster as HotToaster,
  Toast,
  ToastPosition,
  toast as hotToast,
  useToasterStore,
} from 'react-hot-toast';

export interface ToasterProps {
  position?: ToastPosition;
  toastOptions?: DefaultToastOptions;
  reverseOrder?: boolean;
  gutter?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  toastLimit?: number;
  children?: (toast: Toast) => JSX.Element;
}

/**
 * This component will render all toasts.
 *
 * @param toastLimit - max number of toasts shown at the same time
 *
 *  Demo:
 * - [Toast](https://dms-ui.dar-dev.zone/?path=/story/dms-ui-toast--toaster-component)
 */
const Toaster: React.FC<ToasterProps> = ({ toastLimit = 3, ...props }) => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter(t => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= toastLimit) // Is toast index over limit?
      .forEach(t => hotToast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts, toastLimit]);

  return <HotToaster {...props} />;
};

export default Toaster;
