import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Icon } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  link?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

export const Logo = ({ className, style, link, onClick }: IComponentProps): IGenericComponent => {
  return (
    <motion.figure className={['logo__c ', className].css()} onClick={onClick} style={style}>
      {link && <Link to={link} className="fill-absolute" />}
      <Icon icon="logo" isMultiColor />
    </motion.figure>
  );
};
