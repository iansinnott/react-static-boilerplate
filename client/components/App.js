import React from 'react';
import 'normalize.css';
import 'font-awesome-webpack';

import s from './App.styl';

// Favicon link is created server-side, this is just make webpack package it
import './favicon.ico';

const ReactBoilerplate = props => (
  <div className={s.ReactBoilerplate}>
    <h1>React Boilerplate</h1>
    <p>Get that app up and running in no time</p>
  </div>
);

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use create class here.
 *
 * @see README for details.
 */
export const App = React.createClass({
  render() {
    return (
      <div>
        <ReactBoilerplate />
      </div>
    );
  },
});

