import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getPaginatedData, getObject } from '@api/starwars';
import { useDataContext } from '@contexts/DataContext';
import { Image } from '@components/media';
import { SearchBar, NavigationArrow } from '@components/action';
import { Header } from '@components/layout';
import { usePageData, arrayUniqueValues } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  Page?: React.ElementType;
}

import BackgroundImg from '@images/landing_background.png';

const AvatarsLayout = ({ Page, ...rest }: IComponentProps): IGenericComponent => {
  const { className } = rest;
  const { pageData, setPageData } = usePageData();
  const [searchValue, setSearchValue] = useState<string>('');

  const context = useDataContext();
  const currentPage = context.currentPage;
  const setData = context.setData;
  const setTotalCount = context.setTotalCount;
  const setLoading = context.setLoading;
  const setError = context.setError;

  const updateValue = (newValue: string): void => {
    setSearchValue(newValue);
  };

  useEffect(() => {
    const updateData = async (): Promise<void> => {
      setLoading(true);
      const avatars: any = await getPaginatedData('people', currentPage);
      const totalCount = avatars.count ?? 0;

      const fetches = [];

      const planets: any = arrayUniqueValues(avatars.results.map((char: any) => char.homeworld));
      for (const planet of planets) {
        const id = planet.split('/planets/')[1].split('/')[0];
        fetches.push(getObject('planets', id));
      }

      const films: any = arrayUniqueValues(avatars.results.map((char: any) => char.films).flat());
      for (const film of films) {
        const id = film.split('/films/')[1].split('/')[0];
        fetches.push(getObject('films', id));
      }
      const species: any = arrayUniqueValues(
        avatars.results.map((char: any) => char.species).flat(),
      );
      for (const spec of species) {
        const id = spec.split('/species/')[1].split('/')[0];
        fetches.push(getObject('species', id));
      }
      const vehicles: any = arrayUniqueValues(
        avatars.results.map((char: any) => char.vehicles).flat(),
      );
      for (const vehic of vehicles) {
        const id = vehic.split('/vehicles/')[1].split('/')[0];
        fetches.push(getObject('vehicles', id));
      }
      const starships: any = arrayUniqueValues(
        avatars.results.map((char: any) => char.starships).flat(),
      );
      for (const ship of starships) {
        const id = ship.split('/starships/')[1].split('/')[0];
        fetches.push(getObject('starships', id));
      }
      Promise.all(fetches)
        .then((response: any) => {
          console.log('updateData | fetch all data', response);
          // Filter out failed fetches
          const results = response.filter((res: any) => !(res instanceof Error));
          setData({
            avatars: avatars.results,
            planets: results.filter((res: any) => res.url.includes('planets')),
            films: results.filter((res: any) => res.url.includes('films')),
            species: results.filter((res: any) => res.url.includes('species')),
            vehicles: results.filter((res: any) => res.url.includes('vehicles')),
            starships: results.filter((res: any) => res.url.includes('starships')),
          });
          setTotalCount(totalCount);
          setLoading(false);
        })
        .catch(err => {
          console.error('updateData | fetch all data', err);
          setError(err);
        });
    };

    updateData();
  }, [currentPage]);

  const outletContext = {
    layoutProps: {
      searchValue,
    },
    setPageData,
  };

  return (
    <div className={[`layout__c avatars page-${pageData.page} f-col`, className].css()}>
      <Header />
      <Image className={`layout__background abs-fill`} src={BackgroundImg} isBkg withOverlay />

      <section className={[`layout__top`].css()}>
        {pageData.page === 'avatars' ? (
          <SearchBar placeholder={`Name..`} onEnter={updateValue} />
        ) : (
          <NavigationArrow label="BACK" link="/avatars" />
        )}
      </section>

      {Page && <Page />}
      <Outlet context={outletContext} />
    </div>
  );
};

export default AvatarsLayout;
