import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import manifest from '../../build/asset-manifest.json';

// Map chunk names to assets.
const extractAssets = (assets, chunks) => {
  return Object.keys(assets).filter(
    asset => chunks.indexOf(asset.replace('.js', '')) > -1
  );
};

// Import main App component.
import App from '../../src/App';

const path = require('path');
const fs = require('fs');

export default (req, res, next) => {
  // Point to the html file created by CRA's build tool.
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }

    // Add in stylesheets for styled-components:
    // https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
    const sheet = new ServerStyleSheet();

    // Render the app as a string.
    // Modules: all the names of the chunks the server used to render the initial state of the app.
    const staticContext = {};
    const modules = [];
    const html = ReactDOMServer.renderToString(
      // Collect styles from app.
      sheet.collectStyles(
        <Loadable.Capture report={m => modules.push(m)}>
          <StaticRouter context={staticContext}>
            <App />
          </StaticRouter>
        </Loadable.Capture>
      )
    );

    // Create script tags for javascript chunks.
    const extraChunks = extractAssets(manifest, modules).map(
      c => `<script type="text/javascript" src="/${c}"></script>`
    );

    // Create style tags.
    const styles = sheet.getStyleTags();

    // Inject the rendered app into our html and send it.
    return res.send(
      htmlData
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace('</body>', extraChunks.join('') + '</body>') // Add scripts to body.
        .replace('</head>', styles + '</head>') // Add styles to head.
    );
  });
};
