// @ts-ignore
import React from 'react';

import { Logo } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {}

export const Footer = (props: IComponentProps): IGenericComponent => {
  const { className } = props;

  return (
    <footer className={[`footer__c`, className].css()}>
      <Logo />
    </footer>
  );
};
