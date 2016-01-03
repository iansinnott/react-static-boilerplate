import React from 'react';
import { render } from 'react-dom';
import { App } from './components';

if (typeof document !== 'undefined')
  render(<App />, document.getElementById('root'));

export default App;
