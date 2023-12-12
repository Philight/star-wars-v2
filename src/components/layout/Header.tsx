// @ts-ignore
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Icon, Logo } from '@components/graphic';
import { Navigation } from '@components/layout';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {}

export const Header = (props: IComponentProps): IGenericComponent => {
  const { className } = props;
  const [menuIsVisible, setMenuVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMenuVisible(false);
  }, []);

  const toggleMenu = () => () => {
    setMenuVisible(prevState => !prevState);
  };

  const goToPage = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <header className={[`header__c`, className].css()}>
      <Navigation className={[``].css()} isOpen={menuIsVisible} toggleMenu={toggleMenu()} />
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
      <Logo onClick={goToPage('/')} />
      <Icon className={[`header__darth`].css()} icon="darth-vader" onClick={goToPage('/avatars')} />
    </header>
  );
};
