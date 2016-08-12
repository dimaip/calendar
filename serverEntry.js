import 'babel-polyfill';
import 'babel-core/register';
import FS from 'q-io/fs';
import Transmit from 'react-transmit';
import {RouterContext, match} from 'react-router';
import routes from 'reducers/routes';
import createLocation from 'history/lib/createLocation';

function handleRender(req, res) {
  const location = createLocation(req.url);
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      Promise.all([
        FS.read('./index.html'),
        Transmit.renderToString(RouterContext, renderProps)
      ])
        .then((template, {reactString, reactData}) => {
          const document = template.replace(/<div id="app"><\/div>/, `<div id="app">${reactString}</div>`);
          const output = Transmit.injectIntoMarkup(document, reactData, ['/built/client.js']);
          res.send(output);
        })
        .catch(e => console.log(e));
    }
  });
}

export default handleRender;
