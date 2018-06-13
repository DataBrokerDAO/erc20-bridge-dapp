import express from 'express';
import Loadable from 'react-loadable';

import serverRenderer from './middleware/renderer';

const PORT = process.env.PORT || 3000;
const path = require('path');

// Initialize the application and create the routes.
const app = express();
const router = express.Router();

// Root (/) should always serve our server rendered page.
router.use('^/$', serverRenderer);

// Static resources (images, css, ...)
router.use(express.static(path.resolve(__dirname, '..', 'build')));

router.use('*', serverRenderer);

app.use(router);

// Start the app.
Loadable.preloadAll().then(() => {
  app.listen(PORT, error => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log('Listening on port ' + PORT);
  });
});
