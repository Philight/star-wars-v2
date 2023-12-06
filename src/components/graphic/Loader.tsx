import React from 'react';
import { motion } from 'framer-motion';

import { Icon, Layer } from '@components/graphic';

const ANIM_PULSE = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [0.95, 1.05, 0.95],
  },
  transition: {
    ease: 'linear',
    duration: 4,
    repeat: Infinity,
  },
};

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  fullscreen?: boolean;
  overlayed?: boolean;
}

export const Loader = (props: IComponentProps): IGenericComponent => {
  const { className, onClick, style, fullscreen, overlayed } = props;

  return (
    <motion.figure
      className={[
        `loader__c f-center`,
        fullscreen && 'full-screen',
        overlayed && 'overlayed',
        className,
      ].css()}
      style={style}
      onClick={onClick}
    >
      <Layer className={'loader__background abs-fill-parent'} />
      <Icon icon="infinity-8" animate={ANIM_PULSE.animate} transition={ANIM_PULSE.transition} />
    </motion.figure>
  );
};
