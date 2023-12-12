// @ts-ignore
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'framer-motion';

import { Button } from '@components/action';
import { Layer } from '@components/graphic';

import { IGenericComponent, IGenericProps, TGenericObject } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const Navigation = (props: IComponentProps): IGenericComponent => {
  const { className, isOpen, toggleMenu } = props;
  const navigate = useNavigate();

  const mMenu = useMotionValue(0);
  const aMenuOpacity = useTransform(mMenu, [0, 1], [0, 1]);
  const aMenuScale = useTransform(mMenu, [0, 1], [0.0001, 1]);

  const aMenuItemOpacity = useTransform(mMenu, [1, 2], [0, 1]);
  const aMenuItemX1 = useTransform(mMenu, [1, 2], [-40, 0]);
  const aMenuItemX2 = useTransform(mMenu, [1, 2], [-80, 0]);
  const aMenuItemX3 = useTransform(mMenu, [1, 2], [-120, 0]);

  const ANIMATIONS: {
    [key: string]: MotionValue<any>;
  } = {
    menu: mMenu,
  };

  const animateEffect = async (
    element: string,
    fromValue: number,
    toValue: number,
    options: TGenericObject = {},
  ): Promise<any> => {
    const { delay, ease, duration } = options;
    const motionValue = ANIMATIONS[element];
    return new Promise(resolve => {
      motionValue.set(fromValue);
      // @ts-ignore
      const animation = animate(motionValue, toValue, {
        ease: ease ?? 'linear',
        duration: duration ?? 0.4,
        delay: delay,
        onComplete: () => {
          resolve(true);
        },
      });
      return () => animation.stop();
    });
  };

  useEffect(() => {
    if (isOpen) {
      animateEffect('menu', 0, 1, { ease: 'easeInOut', duration: 0.3 }).then(() => {
        animateEffect('menu', 1, 2, { ease: 'easeInOut', duration: 0.5 });
      });
    } else {
      animateEffect('menu', 2, 1, { ease: 'easeInOut', duration: 0.5 }).then(() => {
        animateEffect('menu', 1, 0, { ease: 'easeInOut', duration: 0.3 });
      });
    }
  }, [isOpen]);

  const goToPage = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
    toggleMenu();
  };

  return (
    <nav className={[`navigation__c f-center`, isOpen && 'open', className].css()}>
      <Layer
        className={`navigation__backdrop`}
        style={{ opacity: aMenuOpacity, scale: aMenuScale }}
      />
      <motion.ul className={[`navigation__menu f-col f-center`].css()}>
        <motion.li
          className={`navigation__menu-item f-center`}
          onClick={goToPage('/')}
          style={{ opacity: aMenuItemOpacity, x: aMenuItemX1 }}
        >
          <Button type="outline" size="lg" role="button" label="Home" />
        </motion.li>
        <motion.li
          className={`navigation__menu-item f-center`}
          onClick={goToPage('/avatars')}
          style={{ opacity: aMenuItemOpacity, x: aMenuItemX2 }}
        >
          <Button type="outline" size="lg" role="button" label="Avatars" />
        </motion.li>
        <motion.li
          className={`navigation__menu-item f-center`}
          onClick={goToPage('/')}
          style={{ opacity: aMenuItemOpacity, x: aMenuItemX3 }}
        >
          <Button type="outline" size="lg" role="button" label="About" />
        </motion.li>
      </motion.ul>
    </nav>
  );
};
