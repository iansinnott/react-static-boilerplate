import React from 'react';
import 'normalize.css';

// TDOO: Add font awesome

import s from './App.styl';
import logo from './react-logo.png';

// Favicon link is created server-side, this is just make webpack package it
import './favicon.ico';

const ReactBoilerplate = props => (
  <div className={s.ReactBoilerplate}>
    <div className={s.siteTitle}>
      <img src={logo} alt='React Logo' />
      <h1>React Static Boilerplate</h1>
    </div>
    <p>Why React static?</p>
    <ul>
      <li><span className={s.hl}>Dev</span> friendly</li>
      <li><span className={s.hl}>User</span> friendly</li>
      <li><span className={s.hl}>SEO</span> friendly</li>
    </ul>
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
