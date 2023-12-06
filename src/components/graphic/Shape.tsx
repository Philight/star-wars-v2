import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEventHandler<HTMLCanvasElement> | undefined;
  width?: number;
  height?: number;
  left?: number;
  bottom?: number;
}
type Ref = HTMLCanvasElement;

export const Shape = forwardRef<Ref, IComponentProps>(
  (
    { className, children, style, onClick, width, height, left, bottom },
    ref,
  ): IGenericComponent => {
    return (
      <motion.canvas
        className={[`shape__c`, className].css()}
        style={{
          width: width,
          height: height,
          marginLeft: left,
          marginBottom: bottom,
          ...style,
        }}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </motion.canvas>
    );
  },
);

export default Shape;
