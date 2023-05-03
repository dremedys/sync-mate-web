import { Option } from '@/types/common';
import { ArrowDropDown } from '@mui/icons-material';
import { FC } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import styles from './selectField.module.scss';
import { customStyles, customStylesError } from './selectField.style';

type Props = {
  options: Option[];
  isLoading?: boolean;
  isSearchable?: boolean;
  onChange: (value: string | undefined) => void;
  isCreatable?: boolean;
  placeholder?: string;
  errors?: string;
  hasError?: boolean;
  onLoadOptions?: (value: string) => Promise<Option[]> | void;
  value?: { value: string; label: string };
  disabled?: boolean;
};

export const SelectField: FC<Props> = ({
  options,
  isLoading,
  onChange,
  isCreatable,
  isSearchable,
  placeholder,
  errors,
  hasError,
  onLoadOptions,
  value,
  disabled,
}) => {
  return (
    <div className={`${styles.selectField} ${hasError ? styles.selectFieldError : ''}`}>
      <div className={styles.selectField__select}>
        {isCreatable ? (
          <AsyncCreatableSelect
            isDisabled={disabled}
            isClearable
            isSearchable={isSearchable}
            options={options}
            placeholder={placeholder}
            defaultOptions={options}
            isLoading={isLoading}
            styles={hasError ? customStylesError : customStyles}
            loadOptions={onLoadOptions}
            onChange={v => {
              onChange(v?.value);
            }}
            components={{
              DropdownIndicator: () => <ArrowDropDown />,
              ClearIndicator: () => null,
            }}
            formatCreateLabel={newOption => <span>Add {`"${newOption}"`}</span>}
          />
        ) : (
          <AsyncSelect
            isDisabled={disabled}
            isSearchable={isSearchable}
            isLoading={isLoading}
            placeholder={placeholder}
            options={options}
            defaultOptions={options}
            value={value}
            styles={hasError ? customStylesError : customStyles}
            loadOptions={onLoadOptions}
            components={{
              DropdownIndicator: () => <ArrowDropDown />,
            }}
            onChange={v => {
              onChange(v?.value);
            }}
          />
        )}
      </div>
      <div className={styles.selectField__errors}>{errors}</div>
    </div>
  );
};
