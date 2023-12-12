import React from 'react';
import { MotionValue } from 'framer-motion';

export type TGenericObject = { [key: string]: unknown };

export type IGenericComponent = JSX.Element | React.ReactNode | null;

export interface IGenericProps {
  className?: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: React.CSSProperties | { [key: string]: MotionValue<any> | null | undefined };
}
