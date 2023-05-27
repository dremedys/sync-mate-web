import { Option } from '@/types/common';
import { ArrowDropDown } from '@mui/icons-material';
import { styled } from '@mui/material';
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
  label?: string;
  className?: string;
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
  className,
  label,
}) => {
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
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
              loadOptions={(s, callback) => {
                setTimeout(
                  () => callback(options.filter(option => option.label.toLowerCase().includes(s.toLowerCase()))),
                  200,
                );
              }}
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
              loadOptions={(s, callback) => {
                setTimeout(
                  () => callback(options.filter(option => option.label.toLowerCase().includes(s.toLowerCase()))),
                  200,
                );
              }}
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
    </div>
  );
};

const Label = styled('label')<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: var(${({ $disabled }) => ($disabled ? '--gray' : '--black')});
`;
