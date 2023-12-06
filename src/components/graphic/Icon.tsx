import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, Transition, AnimationControls, Target, TargetAndTransition, VariantLabels } from 'framer-motion';

import { useDynamicFileImport } from '@utils';

const noIcon = 'https://ik.imagekit.io/0ovzivqyfai/_personal/icon/no_icon_kaS78G4ne.svg?updatedAt=1701541464211';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  icon: string;
  isMultiColor?: boolean;
  alt?: string;
  title?: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  initial?: Target | VariantLabels | boolean;
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
  transition?: Transition;
}
type Ref = HTMLDivElement;

export const Icon = forwardRef<Ref, IComponentProps>((props, ref): IGenericComponent => {
  const {
    className,
    style,
    icon: iconFromProps,
    isMultiColor: isMultiColorFromProps,
    alt = `icon: ${iconFromProps}`,
    title,
    link,
    onClick,
    initial,
    animate,
    transition,
  } = props;

  const icon = iconFromProps?.toLowerCase();
  const isMultiColor: boolean =
    isMultiColorFromProps || ['kk-primetech', 'coffee-2', 'arrow-nav-down'].includes(icon);

  const { error, loading, svgIcon } = useDynamicFileImport(icon, {
    fileType: 'icons',
    suffix: 'svg',
  });

  const renderProps = isMultiColor
    ? {
        src: svgIcon,
      }
    : {
        style: {
          //        backgroundImage: `url("${getIcon()}")`,
          WebkitMask: `url(${svgIcon}) no-repeat center`,
          mask: `url(${svgIcon}) no-repeat center`,
        },
      };

  const newTabProps = { target: '_blank', rel: 'noopener noreferrer' };

  return error ? (
    <img className={[`icon__c not-found`].css()} src={noIcon} />
  ) : loading ? (
    <img className={[`icon__c not-found`].css()} src={noIcon} />
  ) : (
    <motion.figure
      className={[`icon__c icon-${icon} f-center`, className, isMultiColor && 'multi-color'].css()}
      style={style}
      ref={ref}
      onClick={onClick}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {link && <Link to={link} className="abs-fill" {...newTabProps} />}
      {!loading && (
        <img
          className="icon"
          title={title}
          alt={alt}
          // @ts-ignore
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          loading="lazy"
          {...renderProps}
        />
      )}
    </motion.figure>
  );
});
