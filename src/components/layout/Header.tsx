// @ts-ignore
import React from 'react';

import { Logo } from '@components/graphic';
import { Navigation } from '@components/layout';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {}

export const Header = (props: IComponentProps): IGenericComponent => {
  const { className } = props;

  return (
    <header className={[`header__c`, className].css()}>
      <Logo />
      <Navigation />
    </header>
  );
};
