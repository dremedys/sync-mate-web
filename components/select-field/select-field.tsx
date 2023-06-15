import { Option } from '@/types/common';
import SelectInput from '@/ui/SelectInput';
import { FormHelperText } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

type Props = {
  name: string;
  options: Option[];
  label?: string;
  className?: string;
  disabled?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  onLoadOptions?: (value: string) => Promise<Option[]> | void;
  clearSelect?: () => void;
  inputValue?: string;
  autoFocus?: boolean;
  isMulti?: boolean;
  tooltipText?: string;
  defaultOptions?: ReadonlyArray<Option> | boolean;
  defaultValue?: Option | Option[] | null;
  onCloseMenu?: () => void;
  submitOutside?: () => void;
  isPortal?: boolean;
  placeholder?: string;
};

export const SelectField: FC<Props> = ({
  name,
  options,
  label,
  className,
  defaultOptions,
  clearSelect,
  defaultValue,
  inputValue,
  onLoadOptions,
  isLoading,
  isPortal,
  disabled,
  isMulti,
  onCloseMenu,
  submitOutside,
  isClearable,
  autoFocus,
  placeholder,
}) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error, isTouched, isDirty },
  } = useController({ name });
  const hasError = error && isTouched && !isDirty;

  const [isInputFocused, setIsInputFocused] = useState(false);
  const unFocus = () => {
    submitOutside && isInputFocused && submitOutside();
    setIsInputFocused(false);
  };
  useEffect(() => {
    window.addEventListener('mousedown', unFocus);
    return () => {
      window.removeEventListener('mousedown', unFocus);
    };
  });

  return (
    <div className={className}>
      {label && <p>{label}</p>}
      <SelectInput
        className="select-input"
        isMulti={isMulti}
        onLoadOptions={onLoadOptions}
        clearSelect={clearSelect}
        inputValue={inputValue}
        isLoading={isLoading}
        options={options}
        autoFocus={autoFocus}
        disabled={disabled || isLoading}
        placeholder={placeholder}
        defaultOptions={defaultOptions}
        defaultValue={defaultValue}
        isSearchable
        isClearable={isClearable}
        onCloseMenu={onCloseMenu}
        isPortal={isPortal}
        value={value}
        onChange={onChange}
      />
      {hasError && !disabled && <FormHelperText>{error?.message}</FormHelperText>}
    </div>
  );
};
