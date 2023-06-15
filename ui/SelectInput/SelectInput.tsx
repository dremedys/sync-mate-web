import { Option } from '@/types/common';
import { ArrowDropDown, Close } from '@mui/icons-material';
import { isEqual } from 'lodash';
import React, { FC, FocusEventHandler, InputHTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { customStyles } from './util/custom-styles';

export interface SelectInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'defaultValue' | 'onBlur'> {
  options?: Option[];
  isMulti?: boolean;
  onChange: (value: string | string[]) => void;
  isCreatable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  inputValue?: string;
  onLoadOptions?: (value: string) => Promise<Option[]> | void;
  onBlur?: FocusEventHandler;
  clearSelect?: () => void;
  selectCustomStyles?: any;
  defaultOptions?: ReadonlyArray<Option> | boolean;
  defaultValue?: Option | Option[] | null;
  isSearchable?: boolean;
  cacheOptions?: boolean;
  readonly?: boolean;
  onCloseMenu?: () => void;
  isPortal?: boolean;
}

const SelectInput: FC<SelectInputProps> = ({
  onChange,
  isCreatable = false,
  isSearchable = true,
  cacheOptions = true,
  readonly = false,
  isClearable,
  options,
  value,
  disabled,
  isMulti,
  className,
  placeholder,
  isLoading,
  selectCustomStyles,
  onLoadOptions,
  clearSelect,
  onBlur,
  onCloseMenu,
  defaultOptions,
  defaultValue = null,
  isPortal,
}) => {
  const [optionsState, setOptionsState] = useState<Option[]>(options || []);

  useEffect(() => {
    if (options) {
      if (isCreatable && options?.length) {
        setOptionsState(options || []);
      }
      if (!isCreatable && Array.isArray(options)) {
        setOptionsState(options || []);
      }
    }
  }, [options, isCreatable]);

  const selectedOption = useMemo(() => {
    if (isMulti) {
      return Array.isArray(value)
        ? value.map(value => optionsState.find(option => isEqual(option.value, value)) || ({} as Option))
        : [];
    }
    const selectedOptionValue = optionsState.find(option => option.value === value);

    return selectedOptionValue
      ? selectedOptionValue
      : value
      ? {
          value,
          label: isLoading ? 'Loading' : value,
        }
      : undefined;
  }, [isLoading, isMulti, optionsState, value]);

  const handleChangeSingle = useCallback(
    (valueType: any) => {
      if (!valueType) {
        return;
      }
      const isSearchedOption = !optionsState.some(({ value }) => valueType?.value === value);
      isSearchedOption && setOptionsState([...optionsState, valueType as Option]);

      const newValue = valueType.value;

      onChange(newValue);
    },
    [onChange, optionsState],
  );

  const handleChangeMulti = useCallback(
    (newSelectedOptions: any) => {
      const selected = (newSelectedOptions || []) as Option[];
      const searchedOptions = selected.filter(
        ({ value: selectedOptionValue }) =>
          !optionsState.some(({ value: existOptionValue }) => selectedOptionValue === existOptionValue),
      );

      setOptionsState([...optionsState, ...searchedOptions]);
      onChange(selected.map(option => option.value));
    },
    [onChange, optionsState],
  );

  const createOption = (label: string) => ({ label, value: label });

  const onCreate = useCallback(
    (inputValue: string) => {
      const trimmedInputValue = inputValue.trim();

      const isExist = optionsState.find(option => option.label === trimmedInputValue);

      if (!isExist) {
        const createdOption = createOption(trimmedInputValue);
        setOptionsState([createdOption, ...optionsState]);

        if (isMulti) {
          if (Array.isArray(selectedOption)) {
            handleChangeMulti([...selectedOption, createdOption]);
          } else handleChangeMulti([createdOption]);
        } else handleChangeSingle(createdOption);
      }
    },
    [handleChangeMulti, handleChangeSingle, isMulti, optionsState, selectedOption],
  );

  const customPlaceholder = placeholder ? placeholder : 'Select';

  return (
    <div className={className}>
      {isCreatable ? (
        <AsyncCreatableSelect
          menuPortalTarget={isPortal ? document.querySelector('body') : undefined}
          components={{
            DropdownIndicator: () => <ArrowDropDown />,
            LoadingIndicator: () => <div />,
            ClearIndicator: () =>
              clearSelect ? (
                <button
                  type="button"
                  onMouseDown={e => {
                    clearSelect();
                    e.stopPropagation();
                  }}>
                  <Close />
                </button>
              ) : null,
          }}
          value={isLoading ? [] : selectedOption || []}
          onChange={isMulti ? handleChangeMulti : handleChangeSingle}
          styles={{ ...customStyles, ...selectCustomStyles }}
          defaultOptions={defaultOptions || optionsState}
          placeholder={customPlaceholder}
          isDisabled={disabled || isLoading}
          isMulti={isMulti}
          isLoading={isLoading}
          isClearable={isClearable}
          loadOptions={onLoadOptions}
          cacheOptions={cacheOptions}
          onMenuClose={onCloseMenu}
          onCreateOption={onCreate}
          isSearchable={isSearchable}
          // readonly={readonly}
        />
      ) : (
        <AsyncSelect
          menuPortalTarget={isPortal ? document.querySelector('body') : undefined}
          components={{
            DropdownIndicator: () => <ArrowDropDown />,
            LoadingIndicator: () => <div />,
            ClearIndicator: () =>
              clearSelect ? (
                <button
                  type="button"
                  onMouseDown={e => {
                    clearSelect();
                    e.stopPropagation();
                  }}>
                  <Close />
                </button>
              ) : null,
          }}
          value={isLoading ? [] : selectedOption || []}
          onChange={isMulti ? handleChangeMulti : handleChangeSingle}
          styles={{ ...customStyles, ...selectCustomStyles }}
          defaultOptions={defaultOptions || optionsState}
          placeholder={customPlaceholder}
          isDisabled={disabled || isLoading}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          loadOptions={onLoadOptions}
          defaultValue={defaultValue}
          cacheOptions={cacheOptions}
          isSearchable={isSearchable}
          onBlur={onBlur}
          onMenuClose={onCloseMenu}
          backspaceRemovesValue={false}
        />
      )}
    </div>
  );
};
export default SelectInput;
