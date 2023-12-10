export const ENV = {
  API_KEY: 'abcd',
  API_HOST: 'https://swapi.dev',
  API_PORT: null,
};

const hasPort = ENV.API_PORT !== null;
export const API_BASE = hasPort ? `${ENV.API_HOST}:${ENV.API_PORT}` : ENV.API_HOST;

export const API_ROUTES = {
  API: {
    GET_OBJECTS: `/api/$objects`,
    GET_OBJECT: `/api/$object/:id`,

    GET_FILMS: `/api/films/:id`,
    GET_PLANETS: `/api/planets/:id`,
    GET_PEOPLE: `/api/people/:id`,
    GET_SPECIES: `/api/species/:id`,
    GET_STARSHIPS: `/api/starships/:id`,
    GET_VEHICLES: `/api/vehicles/:id`,
    POST_USER: `/api/user/:id`,
  },
  AUTH: {
    LOGIN: `/auth/login`,
  },
};

export const IMAGE_URLS = {
  CHARACTERS: 'https://starwars-visualguide.com/assets/img/characters/$id.jpg',
  FILMS: 'https://starwars-visualguide.com/assets/img/films/$id.jpg',
  VEHICLES: 'https://starwars-visualguide.com/assets/img/vehicles/$id.jpg',
  STARSHIPS: 'https://starwars-visualguide.com/assets/img/starships/$id.jpg',
};
