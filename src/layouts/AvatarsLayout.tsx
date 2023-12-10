import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Image } from '@components/media';
import { SearchBar, NavigationArrow } from '@components/action';
import { Header } from '@components/layout';
import { usePageData } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  Page?: React.ElementType;
}

import BackgroundImg from '@images/landing_background.png';

const AvatarsLayout = ({ Page, ...rest }: IComponentProps): IGenericComponent => {
  const { className } = rest;
  const { pageData, setPageData } = usePageData();
  const [searchValue, setSearchValue] = useState('');

  const updateValue = newValue => {
    setSearchValue(newValue);
  };

  const outletContext = {
    layoutProps: {
      searchValue,
    },
    setPageData,
  };

  return (
    <div className={[`layout__c avatars page-${pageData.page} f-col`, className].css()}>
      <Header layout={`AVATARS`} />
      <Image className={`layout__background abs-fill`} src={BackgroundImg} isBkg withOverlay />

      <section className={[`layout__top`].css()}>
        {pageData.page === 'avatars' ? (
          <SearchBar defaultText={`Name..`} onEnter={updateValue} />
        ) : (
          <NavigationArrow label="BACK" />
        )}
      </section>

      {Page && <Page />}
      <Outlet context={outletContext} />
    </div>
  );
};

export default AvatarsLayout;
