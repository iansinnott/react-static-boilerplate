import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import 'normalize.css';

// TDOO: Add font awesome

import s from './App.styl';
import logo from './react-logo.png';

// Favicon link is created server-side, this just makes webpack package it
import './favicon.ico';

export const About = props => (
  <div className={s.page}>
    <div className={s.siteTitle}>
      <h1>About</h1>
    </div>
    <p>Welcome, to about us.</p>
  </div>
);

export const Home = props => (
  <div className={s.page}>
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

export const NotFound = props => (
  <div className={s.page}>
    <h4>Not found</h4>
  </div>
);

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export const App = React.createClass({
  propTypes: {
    children: PropTypes.any,
  },
  render() {
    return (
      <div className={s.App}>
        <nav className={s.nav}>
          <IndexLink to='/' activeClassName={s.active}>Home</IndexLink>
          <Link to='/about' activeClassName={s.active}>About</Link>
        </nav>
        {this.props.children}
      </div>
    );
  },
});
