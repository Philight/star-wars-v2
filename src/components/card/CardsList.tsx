import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import { getPaginatedData, getObject } from '@api/starwars';
import { useDataContext } from '@contexts/DataContext';
import { Card, CardsPagination, Filters } from '@components/card';
import { Loader } from '@components/graphic';

import { createArrayGroups, useDeviceDimensions, arrayUniqueValues, TDeviceType } from '@utils';

const FILTER_COLUMNS = [
  { name: 'height', type: 'range' },
  { name: 'mass', type: 'range' },
  { name: 'hair_color', type: 'select' },
  { name: 'skin_color', type: 'select' },
  { name: 'eye_color', type: 'select' },
  { name: 'birth_year', type: 'radio' },
  { name: 'gender', type: 'radio' },

  //  { name: 'homeworld', type: 'radio' },
  //  { name: 'species', type: 'select' },
  { name: 'films', type: 'select' },
  { name: 'vehicles', type: 'select' },
  { name: 'starships', type: 'select' },
];

const getGridDimensions = (DEVICE_TYPE: TDeviceType): { rows: number; cols: number } => {
  switch (DEVICE_TYPE) {
    case 'MOBILE_SM':
    case 'MOBILE_LG':
    case 'TABLET_SM':
      return { rows: 10, cols: 1 };
    case 'TABLET_MD':
    case 'TABLET_LG':
      return { rows: 5, cols: 2 };
    case 'DESKTOP_SM':
    case 'DESKTOP_MD':
      return { rows: 5, cols: 3 };
    case 'DESKTOP_LG':
    case 'DESKTOP_XL':
      return { rows: 4, cols: 4 };
    default:
      return { rows: 10, cols: 1 };
  }
};

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  type?: 'standard' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  link?: string;
  icon?: string;
  label?: string;
  withShadow?: boolean;
  disabled?: boolean;
}

export const CardsList = (props: IComponentProps): IGenericComponent => {
  const { className, searchValue } = props;

  const navigate = useNavigate();
  const { DEVICE_TYPE } = useDeviceDimensions();
  const rows = getGridDimensions(DEVICE_TYPE).rows;
  const cols = getGridDimensions(DEVICE_TYPE).cols;

  const context = useDataContext();
  const currentPage = context.currentPage;
  const avatarsData = context.data?.avatars ?? [];
  const loading = context.loading;
  const setCurrentPage = context.setCurrentPage;

  const [activeFilters, setActiveFilters] = useState({});

  const goToDetails = cardUrl => (): void => {
    const cardId = cardUrl.split('/people/')[1].split('/')[0];
    navigate(`/detail/character/${cardId}`);
  };

  const filterData = (data: unknown[]): unknown[] => {
    let filtered = [...data];
    filtered = filtered?.filter(
      elem => elem.name?.toLowerCase().includes(searchValue?.toLowerCase() ?? ''),
    );

    for (const attribute in activeFilters) {
      if (attribute in activeFilters) {
        filtered = filtered.filter(elem => {
          if (['films', 'species', 'vehicles', 'starships'].includes(attribute)) {
            if (!elem[attribute].length) {
              return true;
            }
            // Get Ids
            const ids = elem[attribute].map(url => url.split(`/${attribute}/`)[1].split('/')[0]);
            return ids.some(id => activeFilters[attribute].includes(id));
          } else if (['homeworld'].includes(attribute)) {
            const id = elem.homeworld.split(`/planets/`)[1].split('/')[0];
            return activeFilters[attribute].includes(id);
          }
          return activeFilters[attribute].includes(elem[attribute]);
        });
      }
    }
    return filtered;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={[`cards-list__c f-col f-grid rows-${rows} cols-${cols}`, className].css()}>
      <Filters
        className={`cards-list__filters`}
        columns={FILTER_COLUMNS}
        data={avatarsData}
        activeFilters={activeFilters}
        updateActiveFilters={setActiveFilters}
      />

      <div className={`cards-list__cards-container`}>
        {createArrayGroups(cols, filterData(avatarsData)).map((gridRow, rowIndex) => (
          <div key={rowIndex} className={`f-grid-row`}>
            <AnimatePresence>
              {gridRow.map(cardData => (
                <Card
                  key={`char-id-${cardData.url}`}
                  className={`f-grid-item`}
                  data={cardData}
                  onClick={goToDetails(cardData.url)}
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <CardsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cardsArrLength={Math.round(avatarsData.length)}
      />
    </div>
  );
};
