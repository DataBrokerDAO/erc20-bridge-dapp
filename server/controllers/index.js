import express from 'express';

import path from 'path';
import { setMessage } from '../../src/redux/appReducer';
import configureStore from '../../src/redux/configureStore';
import serverRenderer from '../middleware/renderer';

const router = express.Router();

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

router.use('*', actionIndex);

export default router;
