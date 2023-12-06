import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  type?: 'standard' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  link?: string;
  icon?: string;
  label?: string;
  withShadow?: boolean;
  disabled?: boolean;
}

export const Button = (props: IComponentProps): IGenericComponent => {
  const { className, children, style, type, size, icon, label, withShadow, onClick, disabled } =
    props;

  return (
    <div className={[`button__c f-center`, className].css()} style={style}>
      <button
        className={[
          `button`,
          type && `button--${type}`,
          size && `button--${size}`,
          !withShadow && 'no-shadow',
        ].css()}
        onClick={onClick}
        disabled={disabled}
      >
        {!!icon && <Icon icon={icon} />}
        {!!label && <label>{label}</label>}
        {children}
      </button>
    </div>
  );
};
