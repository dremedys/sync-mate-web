import { CSSObject } from 'styled-components';

export const customStyles: any = {
  container: (base: CSSObject) => ({
    ...base,
    borderRadius: '14px',
    background: 'var(--grayLighter)',
  }),
  control: (base: CSSObject) => {
    return {
      ...base,
      minHeight: '50px',
      maxHeight: `100%`,
      boxShadow: 'none',
      border: 0,
      background: 'transparent',
      padding: '0 20px',

      '&:hover': {
        cursor: 'pointer',
      },
    };
  },
  placeholder: (base: CSSObject) => ({
    ...base,
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '24px',
  }),
  valueContainer: (base: CSSObject) => ({
    ...base,
    maxWidth: '100%',
    padding: 0,
    overflow: 'auto',
    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  }),
  singleValue: (base: CSSObject, { isDisabled }: { isDisabled: boolean }) => ({
    ...base,
    fontWeight: 'normal',
    fontSize: `14px`,
    lineHeight: `24px`,
    color: `var(${(() => {
      if (isDisabled) {
        return '--gray';
      }
      return '--grayDark';
    })()})`,
  }),
  indicatorSeparator: () => ({}),
  indicatorsContainer: (base: CSSObject) => {
    return {
      ...base,
      padding: `0 2px`,
      transition: '0.2s ease-out',
    };
  },
  menu: (base: CSSObject) => ({
    ...base,
    top: `calc(100% + 8px)`,
    margin: 0,
    zIndex: 1000,
    padding: 0,
    borderRadius: `8px`,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  }),
  menuList: (base: CSSObject) => ({
    ...base,
    padding: `12px 0`,
    maxHeight: `203px`,
  }),
  multiValue: (base: CSSObject) => ({
    ...base,
    position: 'relative',
    alignItems: 'center',
    padding: `2px 10px`,
    borderRadius: '8px',
    background: 'var(--primaryDefaultOpacity)',
    cursor: 'default',
  }),
  multiValueRemove: (base: CSSObject) => ({
    ...base,
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    padding: 0,
    background: 'var(--grayDark)',
    borderRadius: '100%',
    transition: 'all 0.3s ease-out',
    svg: {
      width: '10px',
      height: '10px',
      fill: 'var(--white)',
    },
    '&:hover': {
      background: 'var(--grayDark)',
      opacity: 0.7,
      cursor: 'pointer',
    },
  }),
  option: (base: any, { isSelected }: { isSelected: boolean }) => ({
    ...base,
    padding: `6px 20px`,
    minHeight: `36px`,
    fontWeight: 'normal',
    lineHeight: `24px`,
    fontSize: `15px`,
    color: 'var(--black)',
    background: `var(${isSelected ? '--primaryDefaultOpacity' : '--white'})`,
    transition: 'all cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '&:hover': {
      background: `var(--grayLighter)`,
      width: '100%',
    },
  }),
};
