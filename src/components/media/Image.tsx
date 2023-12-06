import {
  motion,
  Transition,
  AnimationControls,
  Target,
  TargetAndTransition,
  VariantLabels,
} from 'framer-motion';

import { Shape, Layer } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  src: string;
  alt?: string;
  title?: string;
  withOverlay?: boolean;
  isSquare?: boolean;
  isBkg?: boolean;
  initial?: Target | VariantLabels | boolean;
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
  transition?: Transition;  
}

export const Image = (props: IComponentProps): IGenericComponent => {
  const { className, withOverlay, isBkg, isSquare, src, title, alt, initial, animate, transition } =
    props;

  const sourceProps = isBkg
    ? {
        src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        style: {
          backgroundImage: `url("${src}")`,
        },
        initial,
        animate,
        transition,
      }
    : {
        src,
      };

  return (
    <motion.figure
      className={['image__c', isSquare && 'square', isBkg && 'background', className].css()}
      initial={!isBkg ? initial : undefined}
      animate={!isBkg ? animate : undefined}
      transition={!isBkg ? transition : undefined}
    >
      {withOverlay && <Layer className={['image__overlay overlay'].css()} />}
      {isSquare && <Shape className={['image__placeholder'].css()} />}
      <motion.img
        className="image__image"
        title={title}
        alt={alt}
        loading="lazy"
        {...sourceProps}
      />
    </motion.figure>
  );
};
