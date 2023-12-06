import React from 'react';

export type IGenericComponent = JSX.Element | React.ReactNode | null;

export interface IGenericProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
