// @ts-ignore
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

import { Icon, Logo } from '@components/graphic';
import { Navigation } from '@components/layout';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {}

export const Header = (props: IComponentProps): IGenericComponent => {
  const { className } = props;
  const [menuIsVisible, setMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    setMenuVisible(false);
  }, []);

  const toggleMenu = () => () => {
    setMenuVisible(prevState => !prevState);
  };

  return (
    <header className={[`header__c`, className].css()}>
      <Navigation className={[``].css()} isOpen={menuIsVisible} />
      <motion.div className={[`header__burger f-center`].css()}>
        <Icon
          className={[`header__burger-icon open`].css()}
          icon="menu"
          animate={{
            transform: `rotateX(${menuIsVisible ? '90deg' : '0'}) rotateY(${
              menuIsVisible ? '90deg' : '0'
            })`,
          }}
          transition={{ ease: 'linear', duration: 0.5 }}
          onClick={toggleMenu()}
        />
        <Icon
          className={[`header__burger-icon close`].css()}
          icon="star-wars-x-mark"
          animate={{
            transform: `rotateX(${!menuIsVisible ? '-90deg' : '0'}) rotateZ(${
              !menuIsVisible ? '-90deg' : '0'
            })`,
          }}
          transition={{ ease: 'linear', duration: 0.5 }}
          onClick={toggleMenu()}
        />
      </motion.div>
      <Logo />
      <Icon className={[`header__darth`].css()} icon="darth-vader" />
    </header>
  );
};
