import { useState, useEffect, useRef, useCallback } from 'react';

import { useDataContext } from '@contexts/DataContext';
import { Button } from '@components/action';
import { Shape, Layer, Loader } from '@components/graphic';
import { Image } from '@components/media';
import { IMAGE_URLS } from '@data';
import { deepCopy } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {}

export const CardDetail = (props: IComponentProps): IGenericComponent => {
  const { className } = props;

  const context = useDataContext();
  const avatarsData = context.data?.avatars ?? [];
  const loading = context.loading;

  const [cardData, setCardData] = useState({});

  const [activeTab, setActiveTab] = useState({ name: 'STATS', index: 0 });
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 60, left: 0 });
  const tabRef = useRef();

  const cardId = window.location.pathname.split('/character/')[1].split('/')[0];

  const getId = (url: string, objectName: string): string =>
    url && url?.toString()?.split(`/${objectName}/`)[1]?.split('/')[0];

  const getDataById = (data, id): void => {
    if (data.length < 1) {
      return;
    }

    const foundCharacter = data.find(character => getId(character.url, 'people') === id);

    if (foundCharacter === undefined) {
      return;
    }

    const characterData = deepCopy(foundCharacter);

    const planetId = getId(characterData.homeworld, 'planets');
    const planetData = context.data?.planets.find(elem => getId(elem.url, 'planets') === planetId);
    characterData.homeworld = {
      ...planetData,
      id: planetId,
    };

    // Replace each URL with data
    for (const objName of ['films', 'species', 'vehicles', 'starships']) {
      // Iterate through URLs Array
      for (let i = 0; i < characterData[objName].length; i++) {
        const instance = characterData[objName][i];
        const objId = getId(instance, objName);
        const objData = context.data?.[objName].find(elem => getId(elem.url, objName) === objId);
        characterData[objName][i] = {
          ...objData,
          id: objId,
        };
      }
    }
    setCardData(characterData);
  };

  useEffect(() => {
    getDataById(avatarsData, cardId);
  }, [avatarsData]);

  useEffect(() => {
    setIndicatorStyle({ width: tabRef.current?.getBoundingClientRect().width, left: 0 });
  }, []);

  const ROMAN_LETTERS = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
  };

  const changeTab = (TABNAME: 'STATS' | 'VEHICLES' | 'STARSHIPS') => (): void => {
    let index = 0;
    if (TABNAME === 'STATS') {
      index = 0;
    } else if (TABNAME === 'VEHICLES') {
      index = 1;
    } else if (TABNAME === 'STARSHIPS') {
      index = 2;
    }

    setActiveTab({ name: TABNAME, index: index });
  };

  const handleTabIndicator =
    () =>
    (event): void => {
      const targetWidth = event.target.getBoundingClientRect().width;
      const targetLeft = event.target.offsetLeft;
      setIndicatorStyle({ width: targetWidth, left: targetLeft });
    };

  const EmptyData = (): IGenericComponent => (
    <span className={`card-detail__related-table__data-item no-data h2`}>No Data Found</span>
  );

  if (loading) {
    return <Loader fullscreen />;
  }

  return (
    <div className={[`card-detail__c`, className].css()}>
      <div className={[`card-detail__inner f-col`].css()}>
        <section className={`card-detail__summary f-center-y f-col`}>
          <h1 className={`card-detail__name`}>{cardData.name}</h1>
          <h3 className={`card-detail__alt-name`}>{cardData.name}</h3>

          <figure className={`card-detail__image`}>
            <Image src={IMAGE_URLS.CHARACTERS.replace('$id', cardId)} withOverlay />
            <Layer className={`border`} />
            <Layer className={`bottom`} />
          </figure>
        </section>

        <Button
          className={`card-detail__details-title-button`}
          role="button"
          type="outline"
          size="lg"
          label="DETAILS"
        />

        <section className={`card-detail__appeared-in`}>
          <h4 className={`section-title`}>Appeared In</h4>
          {cardData.films &&
            cardData.films.map(film => (
              <article
                key={film.id}
                className={`card-detail__appeared-in__film f-center-y`}
                data-id={film.id}
              >
                <Image
                  className={`card-detail__appeared-in__image`}
                  src={IMAGE_URLS.FILMS.replace('$id', film.id)}
                />
                <h2 className={`card-detail__appeared-in__title`}>
                  Episode {ROMAN_LETTERS[film.episode_id]}:<br />
                  {film.title}
                </h2>
              </article>
            ))}
        </section>

        <section className={`card-detail__related f-col`}>
          <div className={`card-detail__related-tabs f-center-y`}>
            <h4
              ref={tabRef}
              className={`section-title stats`}
              onClick={changeTab('STATS')}
              onMouseOver={handleTabIndicator()}
            >
              Stats
            </h4>
            <h4
              className={`section-title vehicles`}
              onClick={changeTab('VEHICLES')}
              onMouseOver={handleTabIndicator()}
            >
              Vehicles
            </h4>
            <h4
              className={`section-title starships`}
              onClick={changeTab('STARSHIPS')}
              onMouseOver={handleTabIndicator()}
            >
              Starships
            </h4>
            <Shape className={`card-detail__tab-active light-saber`} style={indicatorStyle} />
          </div>

          <div className={`carousel-view card-detail__related-view`}>
            <div className={`carousel-slider`}>
              <table
                className={`card-detail__related-table stats carousel-group`}
                style={{ transform: `translateX(-${activeTab.index * 100}%)` }}
              >
                <tbody>
                  <tr>
                    <td className={`table-header birth-year`}>Birth Year</td>
                    <td className={`table-data birth-year`}>{cardData.birth_year}</td>
                  </tr>
                  <tr>
                    <td className={`table-header species`}>Species</td>
                    <td className={`table-data species`}>
                      {cardData.species && cardData.species.name}
                    </td>
                  </tr>
                  <tr>
                    <td className={`table-header height`}>Height</td>
                    <td className={`table-data height`}>{cardData.height}</td>
                  </tr>
                  <tr>
                    <td className={`table-header mass`}>Mass</td>
                    <td className={`table-data mass`}>{cardData.mass}</td>
                  </tr>
                  <tr>
                    <td className={`table-header gender`}>Gender</td>
                    <td className={`table-data gender`}>{cardData.gender}</td>
                  </tr>
                  <tr>
                    <td className={`table-header hair-color`}>Hair Color</td>
                    <td className={`table-data hair-color`}>{cardData.hair_color}</td>
                  </tr>
                  <tr>
                    <td className={`table-header skin-color`}>Skin Color</td>
                    <td className={`table-data skin-color`}>{cardData.skin_color}</td>
                  </tr>
                  <tr>
                    <td className={`table-header eye-color`}>Eye Color</td>
                    <td className={`table-data eye-color`}>{cardData.eye_color}</td>
                  </tr>
                  <tr>
                    <td className={`table-header homeworld`}>Homeworld</td>
                    <td className={`table-data homeworld`}>
                      {cardData.homeworld && cardData.homeworld.name}
                    </td>
                  </tr>
                </tbody>
              </table>

              <ul
                className={`card-detail__related-table image-cards vehicles f-center-y carousel-group`}
                style={{
                  transform: `translateX(-${activeTab.index * 100}%)`,
                  opacity: activeTab.index > 0 ? 1 : 0,
                }}
              >
                <ul className={`card-detail__related-table__data f-col`}>
                  {cardData.vehicles?.length ? (
                    cardData.vehicles.map(vehicle => (
                      <li
                        key={vehicle.id}
                        className={`card-detail__related-table__data-item`}
                        data-id={vehicle.id}
                      >
                        <Image
                          className={`card-detail__related-table__image`}
                          src={IMAGE_URLS.VEHICLES.replace('$id', vehicle.id)}
                        />
                        <h2 className={`card-detail__related-table__data-item__title abs-center`}>
                          {vehicle.name}
                        </h2>
                      </li>
                    ))
                  ) : (
                    <EmptyData />
                  )}
                </ul>
              </ul>

              <ul
                className={`card-detail__related-table image-cards starships flex-center-v carousel-group`}
                style={{
                  transform: `translateX(-${activeTab.index * 100}%)`,
                  opacity: activeTab.index > 0 ? 1 : 0,
                }}
              >
                <ul className={`card-detail__related-table__data f-col`}>
                  {cardData.starships?.length ? (
                    cardData.starships.map(starship => (
                      <li
                        key={starship.id}
                        className={`card-detail__related-table__data-item`}
                        data-id={starship.id}
                      >
                        <Image
                          className={`card-detail__related-table__image`}
                          src={IMAGE_URLS.STARSHIPS.replace('$id', starship.id)}
                        />
                        <h2 className={`card-detail__related-table__data-item__title abs-center`}>
                          {starship.name}
                        </h2>
                      </li>
                    ))
                  ) : (
                    <EmptyData />
                  )}
                </ul>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
