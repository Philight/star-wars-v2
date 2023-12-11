// @ts-ignore
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const LandingLayout = lazy(() => import('@layouts/LandingLayout'));
const AvatarsLayout = lazy(() => import('@layouts/AvatarsLayout'));
// const ContactLayout = lazy(() => import('@layouts/ContactLayout'));

// const LandingPage = lazy(() => import("@pages").then((module) => ({ default: module.LandingPage }) ));
// const LandingPage = lazy(() => import("@pages").then( (module) => module.LandingPage ));
/*
Promise.all(
  Array.from({ length: 10 }).map((_, index) =>
    import(`/modules/module-${index}.js`),
  ),
).then((modules) => modules.forEach((module) => module.load()));
*/
const StyleGuide = lazy(() => import('@pages/StyleGuide'));

import { Loader } from '@components/graphic';
import ScrollToTop from '@components/util/ScrollToTop';

import { DataProvider } from '@contexts/DataContext';

import PACKAGE_JSON from 'ROOT/package.json';
import { dynamicImport, type IImportMapping } from '@utils';
import { IGenericComponent } from '@@types/generic-types';

/*
const ROUTE_TO_PAGE = {
  '/': 'LandingPage',
  '/about': 'AboutPage',
  '/contact': 'ContactPage',
};
*/
const ROUTE_TO_PAGE = {
  LANDING: {
    '/': 'LandingPage',
  },
  AVATARS: {
    '/avatars': 'AvatarsPage',
    '/detail/character/:id': 'DetailsPage',
  },
};

const ROUTES = {
  LANDING: Object.keys(ROUTE_TO_PAGE.LANDING),
  AVATARS: Object.keys(ROUTE_TO_PAGE.AVATARS),
};

const landingLayoutImports: IImportMapping = dynamicImport(ROUTE_TO_PAGE.LANDING, {
  prefix: 'pages',
});
const avatarsLayoutImports: IImportMapping = dynamicImport(ROUTE_TO_PAGE.AVATARS, {
  prefix: 'pages',
});

const App = (): IGenericComponent => {
  return (
    <BrowserRouter basename={PACKAGE_JSON.config.BASENAME}>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <DataProvider>
            <Routes>
              <Route element={<LandingLayout />}>
                {ROUTES.LANDING.map((route, i) => (
                  <Route key={i} path={route} Component={landingLayoutImports[route]} />
                ))}
              </Route>
              <Route element={<AvatarsLayout />}>
                {ROUTES.AVATARS.map((route, i) => (
                  <Route key={i} path={route} Component={avatarsLayoutImports[route]} />
                ))}
              </Route>
              <Route path="/style-guide" element={<StyleGuide />} />
            </Routes>
          </DataProvider>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
