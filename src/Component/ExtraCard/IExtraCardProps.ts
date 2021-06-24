import { ReactNode } from 'react';

export interface IExtraCardProps {
  header: string;
  subheader: string;
  color: 'attention' | 'info';
  icon: ReactNode;
}
