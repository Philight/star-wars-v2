// @ts-ignore
import React from 'react';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Navigation = (props: IComponentProps): IGenericComponent => {
  const { className } = props;

  return <nav className={[`navigation__c`, className].css()} />;
};
