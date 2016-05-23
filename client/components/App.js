import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';
import 'normalize.css';
import {
  actions,
  createSelector,
  connect,
  isFetching as isFetchingSelector,
  reasons as reasonsSelector,
} from '../redux';

// Using CSS Modules so we assign the styles to a variable
import s from './App.styl';
const cx = classnames.bind(s);
import logo from './react-logo.png';

// Favicon link is in the template, this just makes webpack package it up for us
import './favicon.ico';

const { array, func, node } = PropTypes;


const selectors = createSelector(
  [ isFetchingSelector, reasonsSelector,],
  ( isFetching, reasons) => ({
    isFetching, reasons})
);

export class Home extends Component {
  static propTypes = {
    reasons: array,
    generateRandomData: func,
    allReasons: func,
    clearReasons: func,
  }
  componentWillMount() {
    const { generateRandomData } = this.props;
    if( generateRandomData ) {
      generateRandomData();
    }

  }
  render() {
    const { reasons, generateRandomData, allReasons, clearReasons } = this.props;
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <img src={logo} alt='React Logo' />
          <h1>React Static Boilerplate</h1>
        </div>
        <p>Why React static?</p>
        <ul>
          <li><span className={s.hl}>Dev</span> friendly</li>
          <li><span className={cx('hl')}>User</span> friendly</li>
          <li><span className={cx('hl')}>SEO</span> friendly</li>
        </ul>
        { reasons && <div>
          <p>More reasons? <button onClick={clearReasons}>clear (we will disappear)</button></p>
          <button onClick={generateRandomData}>random</button>
          <button onClick={allReasons}>all</button>

          <ul>
            { reasons.map((item, index) => <li key={index}>
              <span className={cx('hl')}>{item}</span> supported
            </li>)}
          </ul>
        </div>}
      </div>
    );
  }
}

export class About extends Component {
  render() {
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <h1>About Page</h1>
        </div>
        <p>Welcome to the about page...</p>
      </div>
    );
  }
}

export class NotFound extends Component {
  render() {
    return (
      <div className={cx('page')}>
        <h4>Not found</h4>
      </div>
    );
  }
}

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export class App extends Component {
  static propTypes = {
    children: node,
  }
  render() {
    return (
      <div className={cx('App')}>
        <nav className={cx('nav')}>
          <IndexLink to='/' activeClassName={cx('active')}>Home</IndexLink>
          <Link to='/about' activeClassName={cx('active')}>About</Link>
        </nav>
        {React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}

export default connect(selectors, actions)(App);
