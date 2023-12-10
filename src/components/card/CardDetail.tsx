import { useState, useEffect, useRef, useContext } from 'react';
import { DataContext } from '@contexts/DataProvider';
import Shape from '@components/graphic/Shape';
import Layer from '@components/graphic/Layer';
import { CONSTANTS } from '@data';
import { fetchAdditionalData } from '@utils';

export const CardDetail = props => {
  const { className } = props;
  const contextData = useContext(DataContext);

  const [activeTab, setActiveTab] = useState({ name: 'STATS', index: 0 });
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 60, left: 0 });

  const [cardFilms, setCardFilms] = useState([]);
  const [cardVehicles, setCardVehicles] = useState([]);
  const [cardStarships, setCardStarships] = useState([]);
  const [cardDetails, setCardDetails] = useState({});
  const [cardSpecies, setCardSpecies] = useState('');
  const [cardPlanet, setCardPlanet] = useState('');
  const tabRef = useRef();

  const cardId = window.location.pathname.split('/character/')[1];

  const getDataById = (DATA_ARRAY, id) => {
    for (const dataObj of DATA_ARRAY) {
      if (dataObj.url.split('/people/')[1].split('/')[0] === id) {
        setCardDetails(dataObj);
        fetchAdditionalData(
          dataObj.films,
          dataObj.vehicles,
          dataObj.starships,
          dataObj.species,
          dataObj.homeworld,
        ).then(data => {
          setCardFilms(data?.films);
          setCardVehicles(data?.vehicles);
          setCardStarships(data?.starships);
          setCardSpecies(data?.species);
          setCardPlanet(data?.homeworld);
        });
      }
    }
  };

  const initialRun = useRef(true);
  useEffect(() => {
    if (initialRun.current) {
      initialRun.current = false;
      getDataById(contextData.data.people, cardId);
      setIndicatorStyle({ width: tabRef.current.getBoundingClientRect().width, left: 0 });
    }
  }, []);

  const getRoman = number => {
    switch (number) {
      case 1:
        return 'I';
      case 2:
        return 'II';
      case 3:
        return 'III';
      case 4:
        return 'IV';
      case 5:
        return 'V';
      case 6:
        return 'VI';
      case 7:
        return 'VII';
      default:
        return number;
    }
  };

  const changeTab = TABNAME => () => {
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

  const handleTabIndicator = () => event => {
    const targetWidth = event.target.getBoundingClientRect().width;
    const targetLeft = event.target.offsetLeft;
    setIndicatorStyle({ width: targetWidth, left: targetLeft });
  };

  const EmptyData = () => (
    <span className={`card-detail__related-table__data-item no-data h2`}>No Data Found</span>
  );

  return (
    <div className={`card-detail__c ${className} flex-col`}>
      <section className={`card-detail__intro flex-center-v flex-col`}>
        <h1 className={`card-detail__name h1`}>{cardDetails.name}</h1>

        <h3 className={`card-detail__alt-name help-text`}>{cardDetails.name}</h3>

        <figure className={`card-detail__image-wrapper`}>
          <img
            className={`card-detail__image`}
            src={CONSTANTS.CDN_IMAGE_URL_CHARACTER.replace('$id', cardId)}
            alt="alt"
          />
          <Layer className={`border`} />
          <Layer className={`bottom`} />
        </figure>
      </section>

      <div className={`card-detail__details-title-button flex-center`}>
        <Shape className={`polygon`} />
        <span className={`card-detail__details-title flex-center btn-text-lg`}>DETAILS</span>
      </div>

      <section className={`card-detail__appeared-in`}>
        <h4 className={`card-detail__appeared-in-title h2`}>Appeared In</h4>
        {cardFilms.map(film => (
          <div
            key={film.id}
            className={`card-detail__appeared-in__film flex-center-v`}
            data-id={film.id}
          >
            <figure className={`card-detail__appeared-in__image`}>
              <img
                className={`card-detail__image shape__c polygon`}
                src={CONSTANTS.CDN_IMAGE_URL_FILM.replace('$id', film.id)}
                alt="alt"
              />
            </figure>
            <h2 className={`card-detail__appeared-in__title body-text`}>
              Episode {getRoman(film.episodeId)}:<br />
              {film.name}
            </h2>
          </div>
        ))}
      </section>

      <section className={`card-detail__related flex-col`}>
        <div className={`card-detail__related-tabs flex-center-v`}>
          <h4
            ref={tabRef}
            className={`card-detail__tab stats h2`}
            onClick={changeTab('STATS')}
            onMouseOver={handleTabIndicator()}
          >
            Stats
          </h4>
          <h4
            className={`card-detail__tab vehicles h2`}
            onClick={changeTab('VEHICLES')}
            onMouseOver={handleTabIndicator()}
          >
            Vehicles
          </h4>
          <h4
            className={`card-detail__tab starships h2`}
            onClick={changeTab('STARSHIPS')}
            onMouseOver={handleTabIndicator()}
          >
            Starships
          </h4>
          <Shape className={`card-detail__tab-active light-saber`} style={indicatorStyle} />
        </div>

        <div className={`carousel-view card-detail__related-view`}>
          <div className={`carousel-slider`}>
            <ul
              className={`card-detail__related-table stats flex-center-v carousel-group`}
              style={{ transform: `translateX(-${activeTab.index * 100}%)` }}
            >
              <ul className={`card-detail__related-table__headers flex-col`}>
                <li className={`card-detail__related-table__header h3`}>Birth Year</li>
                <li className={`card-detail__related-table__header h3`}>Species</li>
                <li className={`card-detail__related-table__header h3`}>Height</li>
                <li className={`card-detail__related-table__header h3`}>Mass</li>
                <li className={`card-detail__related-table__header h3`}>Gender</li>
                <li className={`card-detail__related-table__header h3`}>Hair Color</li>
                <li className={`card-detail__related-table__header h3`}>Skin Color</li>
                <li className={`card-detail__related-table__header h3`}>Eye Color</li>
                <li className={`card-detail__related-table__header h3`}>Homeworld</li>
              </ul>

              <ul className={`card-detail__related-table__data flex-col`}>
                <li className={`card-detail__related-table__data-item body-text birth-year`}>
                  {cardDetails.birth_year}
                </li>
                <li className={`card-detail__related-table__data-item body-text`}>{cardSpecies}</li>
                <li className={`card-detail__related-table__data-item body-text`}>
                  {cardDetails.height}
                </li>
                <li className={`card-detail__related-table__data-item body-text`}>
                  {cardDetails.mass}
                </li>
                <li className={`card-detail__related-table__data-item body-text`}>
                  {cardDetails.gender}
                </li>
                <li className={`card-detail__related-table__data-item body-text`}>
                  {cardDetails.hair_color}
                </li>
                <li className={`card-detail__related-table__data-item body-text`}>
                  {cardDetails.skin_color}
                </li>
                <li className={`card-detail__related-table__data-item body-text`}>
                  {cardDetails.eye_color}
                </li>
                <li className={`card-detail__related-table__data-item body-text`}>{cardPlanet}</li>
              </ul>
            </ul>

            <ul
              className={`card-detail__related-table image-cards vehicles flex-center-v carousel-group`}
              style={{ transform: `translateX(-${activeTab.index * 100}%)` }}
            >
              <ul className={`card-detail__related-table__data flex-col`}>
                {cardVehicles.length ? (
                  cardVehicles.map(vehicle => (
                    <li
                      key={vehicle.id}
                      className={`card-detail__related-table__data-item body-text`}
                      data-id={vehicle.id}
                    >
                      <figure className={`card-detail__related-table__data-item__image-wrapper`}>
                        <img
                          className={`card-detail__related-table__data-item__image shape__c polygon`}
                          src={CONSTANTS.CDN_IMAGE_URL_VEHICLE.replace('$id', vehicle.id)}
                          alt="alt"
                        />
                      </figure>
                      <h2
                        className={`card-detail__related-table__data-item__title absolute-center body-text `}
                      >
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
              style={{ transform: `translateX(-${activeTab.index * 100}%)` }}
            >
              <ul className={`card-detail__related-table__data flex-col`}>
                {cardStarships.length ? (
                  cardStarships.map(starship => (
                    <li
                      key={starship.id}
                      className={`card-detail__related-table__data-item body-text`}
                      data-id={starship.id}
                    >
                      <figure className={`card-detail__related-table__data-item__image-wrapper`}>
                        <img
                          className={`card-detail__related-table__data-item__image shape__c polygon`}
                          src={CONSTANTS.CDN_IMAGE_URL_STARSHIP.replace('$id', starship.id)}
                          alt="alt"
                        />
                      </figure>
                      <h2
                        className={`card-detail__related-table__data-item__title absolute-center body-text `}
                      >
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
  );
};
