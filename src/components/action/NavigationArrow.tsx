import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

export const NavigationArrow = (props: IComponentProps): IGenericComponent => {
  const { className, style, type, size, link, label, withShadow, disabled } = props;

  const navigate = useNavigate();

  const goToPage = (path: string) => event => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <motion.a
      className={[
        `navigation-arrow__c f-center`,
        className,
        type,
        size,
        disabled && 'disabled',
      ].css()}
      style={style}
      onClick={goToPage(link)}
      role="link"
    >
      <Icon icon="double-arrow" />
      {!!label && <label>{label}</label>}
    </motion.a>
  );
};
