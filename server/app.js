import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import configProd from '../webpack.config.prod.js';
import configDev from '../webpack.config.dev.js';
import api from './api';

const app = express();
const isDev = process.env.NODE_ENV === 'development';
const config = isDev ? configDev : configProd;

// Configure the server
app.use(compression());
app.use(express.static('public', { index: false })); // Not using a full path is important
app.set('view engine', 'jade');
app.set('views', 'server/views');
app.set('port', process.env.PORT || 3000);
app.set('isDev', isDev);
app.use(morgan(isDev ? 'dev' : 'combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set public path which will be exposed to jade views
app.set('publicPath', config.output.publicPath);

/**
 * App layout
 */
const Layout = props => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='shortcut icon' href='/favicon.ico' />
      {!isDev && <link rel='stylesheet' href='/app.css' />}
    </head>
    <body>
      <div id='root' />
      {props.children}
    </body>
  </html>
);
Layout.propTypes = { children: React.PropTypes.any.isRequired };

/**
 * Index page
 */
const Index = props => (
  <Layout>
    <script src={app.get('publicPath') + 'app.js'}></script>
  </Layout>
);

/**
 * 404 Template
 */
const NotFound = props => (
  <Layout>
    <h1>Not found</h1>
    {props.message && <pre>{props.message}</pre>}
  </Layout>
);
NotFound.propTypes = { message: React.PropTypes.string };

// Mount the API (note that we MUST pass app to all router middleware)
app.use('/api', api(app));

// Send the boilerplate HTML file down for all get requests that aren't to the
// API. This lets us route on the client side w/ React Router (or whatever)
app.get('*', (req, res) => {
  res.send('<!doctype html>' + renderToStaticMarkup(<Index />));
});

// General error handling
app.use((err, req, res, next) => {
  const message = isDev ? err.message : '';
  res
    .status(err.status || 500)
    .send('<!doctype html>' + renderToStaticMarkup(<NotFound message={message} />));
});

export default app;

// Must run the app from bin/www
if (require.main === module)
  throw new Error('App should be started from bin/www not app.js');
