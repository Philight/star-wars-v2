import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  link?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

export const Logo = ({ className, link, onClick }: IComponentProps): IGenericComponent => {
  return (
    <figure className={['logo__c ', className].css()} onClick={onClick}>
      {link && <Link to={link} className="fill-absolute" />}
      <Icon icon="logo" isMultiColor />
    </figure>
  );
};
