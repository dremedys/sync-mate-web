export const customStyles: any = {
  container: (base: any) => ({
    ...base,
    borderRadius: '12px',
    background: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  }),
  control: (base: any) => {
    return {
      ...base,
      height: '48px',
      maxHeight: `100%`,
      boxShadow: 'none',
      border: 0,
      background: 'transparent',
      padding: '0 16px',

      '&:hover': {
        cursor: 'pointer',
      },
    };
  },
  placeholder: (base: any) => ({
    ...base,
    fontWeight: 'normal',
    fontSize: '14px',
    color: '#8B8C9E',
  }),
  valueContainer: (base: any) => ({
    ...base,
    maxWidth: '100%',
    padding: 0,
    overflow: 'auto',
    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  }),
  singleValue: (base: any, props: any) => ({
    ...base,
    fontWeight: 'normal',
    fontSize: `15px`,
    lineHeight: `24px`,
  }),
  indicatorSeparator: () => ({}),
  indicatorsContainer: (base: any) => {
    return {
      ...base,
      padding: `0 2px`,
      transition: '0.2s ease-out',
    };
  },
  menu: (base: any) => ({
    ...base,
    top: `calc(100% + 8px)`,
    margin: 0,
    zIndex: 1000,
    padding: 0,
    borderRadius: `8px`,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: `12px 0`,
  }),
  option: (base: Record<string, unknown>, props: any) => ({
    ...base,
    padding: `6px 20px`,
    minHeight: `36px`,
    fontWeight: 'normal',
    lineHeight: `24px`,
    fontSize: `15px`,
    color: 'black',
    background: props.isSelected ? 'lightGray' : 'white',
    transition: 'all cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '&:hover': {
      background: props.isSelected ? 'lightGray' : `var(--color-light-blue)`,
      width: '100%',
    },
  }),
};

export const customStylesError: any = {
  container: (base: any) => ({
    ...base,
    borderRadius: '12px',
    background: 'transparent',
    border: '1px solid #D6331F',
  }),
  control: (base: any) => {
    return {
      ...base,
      height: '48px',
      maxHeight: `100%`,
      boxShadow: 'none',
      border: 0,
      background: 'transparent',
      padding: '0 16px',

      '&:hover': {
        cursor: 'pointer',
      },
    };
  },
  placeholder: (base: any) => ({
    ...base,
    fontWeight: 'normal',
    fontSize: '14px',
    color: '#D6331F',
  }),
  valueContainer: (base: any) => ({
    ...base,
    maxWidth: '100%',
    padding: 0,
    overflow: 'auto',
    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  }),
  singleValue: (base: any, props: any) => ({
    ...base,
    fontWeight: 'normal',
    fontSize: `15px`,
    lineHeight: `24px`,
  }),
  indicatorSeparator: () => ({}),
  indicatorsContainer: (base: any) => {
    return {
      ...base,
      padding: `0 2px`,
      transition: '0.2s ease-out',
    };
  },
  menu: (base: any) => ({
    ...base,
    top: `calc(100% + 8px)`,
    margin: 0,
    zIndex: 1000,
    padding: 0,
    borderRadius: `8px`,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: `12px 0`,
  }),
  option: (base: Record<string, unknown>, props: any) => ({
    ...base,
    padding: `6px 20px`,
    minHeight: `36px`,
    fontWeight: 'normal',
    lineHeight: `24px`,
    fontSize: `15px`,
    color: 'black',
    background: props.isSelected ? 'lightGray' : 'white',
    transition: 'all cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '&:hover': {
      background: props.isSelected ? 'lightGray' : `var(--color-light-blue)`,
      width: '100%',
    },
  }),
};
