// import React from 'react';
// import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

import { withPageData } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IPageProps extends IGenericProps {}

const ContactPage = (props: IPageProps): IGenericComponent => {
  const { className } = props;

  return (
    <main className={['page__c contact', className].css()}>
      <h1>ContactPage</h1>
    </main>
  );
};

const pageData = { page: 'contact', img: '' };
export default withPageData(ContactPage, pageData);
