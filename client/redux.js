import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createSelector } from 'reselect';
import keymirror from 'keymirror';
import thunk from 'redux-thunk';
import Immutable, { Record }from 'immutable';

export const reasonsSample = [
  'redux',
  'redux devToolsExtension',
  'react-router',
  'es6',
  'babel',
  'webpack',
];

export const State = Record({
  reasons: null,
  isFetching: false,
});

export const ACTION_TYPES = keymirror({
  CLEAR_REASONS_DATA: null,
  FETCH_REASONS_DATA: null,
  SET_REASONS_DATA: null,
});

export const actionHandlers = {
  [ACTION_TYPES.CLEAR_REASONS_DATA](state) {
    return state.set('reasons', null);
  },
  [ACTION_TYPES.SET_REASONS_DATA](state, { payload }){
    return state.set('reasons', payload);
  },
  [ACTION_TYPES.FETCH_REASONS_DATA](state, {}){
    return state.set('isFetching', !state.isFetching);
  },
};

export const actions = {
  clearReasonsData: () => ({type: ACTION_TYPES.CLEAR_REASONS_DATA}),
  fetchReasonsData: () => ({ type: ACTION_TYPES.FETCH_REASONS_DATA }),
  generateRandomData() {
    return (dispatch) => {
      dispatch(actions.clearReasonsData());
      var payload = reasonsSample.slice(0, Math.floor(Math.random() * reasonsSample.length) + 1);
      dispatch({
        type: ACTION_TYPES.SET_REASONS_DATA,
        payload: payload
      });
      dispatch(actions.fetchReasonsData());
    }
  },
  allReasons() {
    return (dispatch) => {
      dispatch(actions.clearReasonsData());
      dispatch({
        type: ACTION_TYPES.SET_REASONS_DATA,
        payload: reasonsSample
      });
      dispatch(actions.fetchReasonsData());
    }
  },
  clearReasons() {
    return (dispatch) => {
      dispatch(actions.clearReasonsData());
    }
  },
};

export const appState = state => state;
export const reasons = createSelector([appState], state => state.reasons);
export const isFetching = createSelector([appState], state => state.isFetching);

export function reducer(state = new State(), action){
  const { type } = action;
  if (type in actionHandlers) {
    return actionHandlers[type](state, action);
  } else {
    return state;
  }
}

export function createAppStore() {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(reducer);
}

export { createSelector } from 'reselect';
export { connect, Provider } from 'react-redux';
