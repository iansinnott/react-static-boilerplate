import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createAppStore, Provider } from './redux';

// Import your routes so that you can pass them to the <Router /> component
import routes from './routes.js';

// Only render in the browser
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  const store = createAppStore();
  render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('root')
  );
}

// Export the routes here so that ReactStaticPlugin can access them and build
// the static files.
export * from './routes.js';
