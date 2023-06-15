export function getStringFromEnum(enumString?: string | null) {
  return enumString ? enumString[0].toUpperCase() + enumString.slice(1).toLowerCase().replaceAll('_', ' ') : '';
}

export function transformEnumToOptions(enums: { [key: string]: string | number }) {
  return (
    Object.keys(enums).map(key => {
      return {
        value: String(enums[key]),
        label: typeof key === 'string' ? getStringFromEnum(key) : String(key),
      };
    }) || []
  );
}
