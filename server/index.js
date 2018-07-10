// tslint:disable:no-console
import express from 'express';
import Loadable from 'react-loadable';
import indexController from './controllers/index';

const PORT = process.env.PORT || 3000;

// Initialize the application and create the routes.
const app = express();
app.use(indexController);

// Start the app.
Loadable.preloadAll().then(() => {
  app.listen(PORT, error => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log('Listening on port ' + PORT);
  });
});
