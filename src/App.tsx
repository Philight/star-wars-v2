// @ts-ignore
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const LandingLayout = lazy(() => import('@layouts/LandingLayout'));
const AboutLayout = lazy(() => import('@layouts/AboutLayout'));
//const ContactLayout = lazy(() => import('@layouts/ContactLayout'));

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
//const LandingPage = lazy(() => import('@pages/LandingPage'));
//const AboutPage = lazy(() => import('@pages/AboutPage'));
//const ContactPage = lazy(() => import('@pages/ContactPage'));

import { Loader } from '@components/graphic';
import ScrollToTop from '@components/util/ScrollToTop';

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
  ABOUT: {
    '/about': 'AboutPage',
    '/contact': 'ContactPage',
  },
};

const ROUTES = {
  LANDING: Object.keys(ROUTE_TO_PAGE.LANDING),
  ABOUT: Object.keys(ROUTE_TO_PAGE.ABOUT),
};

const landingLayoutImports: IImportMapping = dynamicImport(ROUTE_TO_PAGE.LANDING, {
  prefix: 'pages',
});
const aboutLayoutImports: IImportMapping = dynamicImport(ROUTE_TO_PAGE.ABOUT, { prefix: 'pages' });

const App = (): IGenericComponent => {
  return (
    <BrowserRouter basename={PACKAGE_JSON.config.BASENAME}>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<LandingLayout />}>
              {/*
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
*/}
              {ROUTES.LANDING.map((route, i) => (
                <Route key={i} path={route} Component={landingLayoutImports[route]} />
              ))}
            </Route>
            <Route element={<AboutLayout />}>
              {ROUTES.ABOUT.map((route, i) => (
                <Route key={i} path={route} Component={aboutLayoutImports[route]} />
              ))}
            </Route>
            {/*
        <Route path="/v2" element={<LandingLayout Page={LandingPage} />} />
        <Route path="/v2/about" element={<AboutLayout Page={AboutPage} />} />
        <Route path="/v2/contact" element={<ContactLayout Page={ContactPage} />} />
*/}
            <Route path="/style-guide" element={<StyleGuide />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
