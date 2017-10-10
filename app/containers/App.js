import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import routes from 'routes'

export default ({ server, location, context, store }) => {
  let router

  if (server) {
    router = (
      <StaticRouter
        location={location}
        context={context}
      >
        {routes}
      </StaticRouter>
    )
  } else {
    router = (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    )
  }

  return (
    <Provider store={store}>
      {router}
    </Provider>
  )
}
