import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { About, Home, NotFound } from './components/App.js';
import AppWrapper from './components/AppWrapper';

export const routes = (
  <Route path='/' title='App' component={AppWrapper}>
    <IndexRoute component={Home} />
    <Route path='about' title='App - About' component={About} />
    <Route path='*' title='404: Not Found' component={NotFound} />
  </Route>
);

export default routes;
