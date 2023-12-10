import React from 'react';
import { motion } from 'framer-motion';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEventHandler<HTMLCanvasElement> | undefined;
}

export const Layer = ({ className, style, onClick }: IComponentProps): IGenericComponent => {
  return (
    <motion.canvas
      className={[`layer__c abs-fill-parent`, className].css()}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
