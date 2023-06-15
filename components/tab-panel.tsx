import { FC, ReactNode } from 'react';

interface TabPanelProps {
  children: ReactNode;
  value: number | string;
  index: number | string;
  dismount?: boolean;
  className?: string;
}

export const TabPanel: FC<TabPanelProps> = ({ value, index, dismount, children, className }) => {
  if (dismount && value !== index) {
    return null;
  }
  return (
    <div
      className={className}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {children}
    </div>
  );
};
