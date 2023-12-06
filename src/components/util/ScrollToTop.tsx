import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {}

const ScrollToTop = ({ children }: IComponentProps): IGenericComponent => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
