import React, { PropTypes, Component } from 'react';

import App from './App';

import {
  createAppStore,
  Provider,
  actions,
  createSelector,
  connect,
  isFetching as isFetchingSelector,
  reasons as reasonsSelector,
} from '../redux';

// store workaround to export app even if no document is active
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

let store;
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  store = createAppStore();
} else {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  store = mockStore({});
}

const { node } = PropTypes;

export default class AppWrapper extends Component {
  static propTypes = {
    children: node,
  }
  render() {
    /*
     * normally provider is injected even before routes,
     * however that would fail since no provider may be selected.
     * We generate a mock store in case we do not have a window env
     */
    return (
      <Provider store={store}>
        <App>
          {React.cloneElement(this.props.children, { ...this.props })}
        </App>
      </Provider>
    );
  }
}