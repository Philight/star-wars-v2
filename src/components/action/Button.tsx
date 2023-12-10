import React from 'react';
import { motion } from 'framer-motion';

import { Icon, Shape } from '@components/graphic';

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
  const {
    className,
    children,
    style,
    type,
    size,
    role,
    icon,
    label,
    withShadow,
    onClick,
    disabled,
  } = props;

  return (
    <motion.div className={[`button__c f-center`, className].css()} style={style}>
      <button
        className={[`button`, type, size, !withShadow && 'no-shadow'].css()}
        role={role}
        onClick={onClick}
        disabled={disabled}
      >
        {!!icon && <Icon icon={icon} />}
        {!!label && <label>{label}</label>}
        <Shape className={`polygon`} />
        {children}
      </button>
    </motion.div>
  );
};
