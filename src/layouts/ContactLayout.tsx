import React from 'react';
import { Outlet } from 'react-router-dom';

import { usePageData } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
//  Page?: React.FC | React.Component | React.ReactNode | JSX.Element | React.ElementType;
  Page?: React.ElementType;
}

const ContactLayout = ({ Page, ...rest }: IComponentProps): IGenericComponent => {
  const { className } = rest;
  const { pageData, setPageData } = usePageData();

  return (
    <div className={[`layout__c contact page-${pageData.page}`, className].css()}>
      <h1>ContactLayout</h1>
      {Page && <Page />}
      <Outlet context={{ setPageData }} />
    </div>
  );
};

export default ContactLayout;