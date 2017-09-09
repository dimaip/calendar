import 'babel-polyfill';
import 'babel-core/register';
import fs from 'fs';
import Transmit from 'react-transmit';
import {RouterContext, match} from 'react-router';
import routes from 'reducers/routes';

function handleRender(req, res) {
  match({routes,  location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      Transmit.renderToString(RouterContext, renderProps).then(({reactString, reactData}) => {
        fs.readFile('./index.html', 'utf8', function (err, data) {
          if (err) throw err;

          const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${reactString}</div>`);
          const output = Transmit.injectIntoMarkup(document, reactData, ['/build/client.js']);

          res.send(document);
        });
      });
    }
  });
}

export default handleRender;
