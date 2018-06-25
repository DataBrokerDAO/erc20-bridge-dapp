import express from 'express';

import serverRenderer from '../middleware/renderer';
import configureStore from '../../src/redux/configureStore';
import { setMessage } from '../../src/redux/appReducer';

const router = express.Router();
const path = require('path');

const actionIndex = (req, res, next) => {
  const store = configureStore();
  store.dispatch(setMessage("Hi, I'm from server!"));

  serverRenderer(store)(req, res, next);
};

// root (/) should always serve our server rendered page
router.use('^/$', actionIndex);

// other static resources should just be served as they are
router.use(
  express.static(path.resolve(__dirname, '..', '..', 'build'), {
    maxAge: '30d'
  })
);

export default router;
