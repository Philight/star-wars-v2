//import React from 'react';
//import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { Icon } from '@components/graphic';
import { withPageData } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IPageProps extends IGenericProps {}

const LandingPage = (props: IPageProps): IGenericComponent => {
  const { className } = props;

  return (
    <main className={['page__c landing', className].css()}>
    </main>
  );
};

const pageData = { page: 'landing', img: '' };
export default withPageData(LandingPage, pageData);
