import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import { getPaginatedData, getObject } from '@api/starwars';
import { useDataContext } from '@contexts/DataContext';
import { Card, CardsPagination, Filters } from '@components/card';
import { Loader } from '@components/graphic';

// import { CONFIG } from '@data';
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

const getPageMaxPosts = (DEVICE_TYPE: TDeviceType): number => {
  switch (DEVICE_TYPE) {
    case 'MOBILE_SM':
    case 'MOBILE_LG':
    case 'TABLET_SM':
      return 10;
    case 'TABLET_MD':
    case 'TABLET_LG':
      return 10;
    case 'DESKTOP_SM':
    case 'DESKTOP_MD':
    case 'DESKTOP_LG':
      return 16;
    default:
      return 6;
  }
};

const getGridDimensions = (DEVICE_TYPE: TDeviceType): { rows: number; cols: number } => {
  switch (DEVICE_TYPE) {
    case 'MOBILE_SM':
    case 'MOBILE_LG':
    case 'TABLET_SM':
    case 'TABLET_MD':
      return { rows: 10, cols: 1 };
    case 'TABLET_LG':
    case 'DESKTOP_SM':
      return { rows: 5, cols: 2 }; // 10
    case 'DESKTOP_MD':
    case 'DESKTOP_LG':
    case 'DESKTOP_XL':
      return { rows: 4, cols: 3 };
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
  const error = context.error;
  const setData = context.setData;
  const setTotalCount = context.setTotalCount;
  const setLoading = context.setLoading;
  const setError = context.setError;
  const setCurrentPage = context.setCurrentPage;

  //  const [ filteredData, setFilteredData ] = useState(DATA_AVATARS);
  const [activeFilters, setActiveFilters] = useState({});
  const COUNT_PER_PAGE = getPageMaxPosts(DEVICE_TYPE);

  useEffect(() => {
    const updateData = async (): void => {
      setLoading(true);
      const avatars = await getPaginatedData('people', currentPage);
      const totalCount = avatars.count;

      const fetches = [];

      const planets = arrayUniqueValues(avatars.results.map(char => char.homeworld));
      for (const planet of planets) {
        const id = planet.split('/planets/')[1].split('/')[0];
        fetches.push(getObject('planets', id));
      }

      const films = arrayUniqueValues(avatars.results.map(char => char.films).flat());
      for (const film of films) {
        const id = film.split('/films/')[1].split('/')[0];
        fetches.push(getObject('films', id));
      }
      const species = arrayUniqueValues(avatars.results.map(char => char.species).flat());
      for (const spec of species) {
        const id = spec.split('/species/')[1].split('/')[0];
        fetches.push(getObject('species', id));
      }
      const vehicles = arrayUniqueValues(avatars.results.map(char => char.vehicles).flat());
      for (const vehic of vehicles) {
        const id = vehic.split('/vehicles/')[1].split('/')[0];
        fetches.push(getObject('vehicles', id));
      }
      const starships = arrayUniqueValues(avatars.results.map(char => char.starships).flat());
      for (const ship of starships) {
        const id = ship.split('/starships/')[1].split('/')[0];
        fetches.push(getObject('starships', id));
      }
      Promise.all(fetches).then(response => {
        console.log('CardsList', response);
        // Filter out failed fetches
        const results = response.filter(res => !(res instanceof Error));
        setData({
          avatars: avatars.results,
          planets: results.filter(res => res.url.includes('planets')),
          films: results.filter(res => res.url.includes('films')),
          species: results.filter(res => res.url.includes('species')),
          vehicles: results.filter(res => res.url.includes('vehicles')),
          starships: results.filter(res => res.url.includes('starships')),
        });
        setTotalCount(totalCount);
        setLoading(false);
      });
    };

    updateData();
  }, [currentPage]);

  useEffect(() => {
    console.log('CardsList | activeFilters', activeFilters);
  }, [activeFilters]);

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
          console.log('elem', elem);
          console.log('activeFilters[attribute]', activeFilters[attribute]);
          console.log('elem[attribute]', elem[attribute]);
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
          console.log('filters include value', activeFilters[attribute].includes(elem[attribute]));
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

{
  /*
                <div
                  key={`cards-group-${rowIndex}`}
                  className={`cards-list__cards-group carousel-group f-center-y f-grid cols-${cols} rows-${rows}`}
                  style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
                  data-page={currentPage}
                >
                  <AnimatePresence>
                    {cardsGroup.map(cardData => (
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
*/
}
