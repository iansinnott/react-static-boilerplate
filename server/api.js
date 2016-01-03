/**
 * @module api
 *
 * API Controller. This is an example API to get you started.
 */
import { Router } from 'express';

import HttpError from './lib/HttpError.js';

/**
 * @exports apiWrapper
 *
 * Because of Waterline's (questionable) design, actual queryable models are not
 * available until after app initialization, at which point they are manually
 * stored on the app object. As such, we need access to the app object in order
 * to do database operations, so we wrap our Router instance such that this
 * middleware can be called as as function that takes app as an argument.
 * @param {object} app Express instance
 * @return {function}
 */
export default function apiWrapper(app) {
  const api = Router();

  api.get('/', (req, res) => {
    res.send({ success: true, message: 'You made it!' });
  });

  /* ***************************************************************************
   * RESTful routing example
   * **************************************************************************/

  api.get('/things', (req, res, next) => {
    app.models.thing.find()
      .then(data => res.send(data))
      .catch(next);
  });

  api.get('/things/:id', (req, res, next) => {
    app.models.thing.findOne({ id: req.params.id })
      .then(data => res.send(data))
      .catch(next);
  });

  api.post('/things', (req, res, next) => {
    app.models.thing.create(req.body)
      .then(data => res.send(data))
      .catch(next);
  });

  api.put('/things/:id', (req, res, next) => {
    app.models.thing.update({ id: req.params.id }, req.body)
      .then(data => res.send(data))
      .catch(next);
  });

  api.delete('/things/:id', (req, res, next) => {
    app.models.thing.destroy({ id: req.params.id })
      .then(data => res.send(data))
      .catch(next);
  });

  // API 404
  api.use((req, res, next) => next(new HttpError('Not Found', 404)));

  // API error handling (returns JSON)
  api.use((err, req, res, next) => {
    const data = app.get('isDev') ? { message: err.message } : {};
    res.status(err.status || 500).send(data);
  });

  return api;
}
