import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Root from 'containers/Root/Root.js'
import NotFound from 'components/NotFound/NotFound.js'


export default (
    <div>
        <Switch>
            <Route exact path='/' component={Root} />
            <Route exact path='/date/:date' component={Root} />
            <Route component={NotFound} />
        </Switch>
    </div>
)
