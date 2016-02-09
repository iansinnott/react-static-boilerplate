import React from 'react';

import s from './About.styl';

export const About = React.createClass({
  render() {
    return (
      <div className={s.page}>
        <div className={s.siteTitle}>
          <h1>About</h1>
        </div>
        <p>Welcome, to about us.</p>
      </div>
    );
  },
});
