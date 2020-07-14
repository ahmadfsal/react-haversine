import React, { Fragment } from 'react'
import AdminPage from 'pages/admin'
import MainPage from 'pages/main'
import { Route, Switch } from 'react-router-dom'

const Main = () => {
    return (
        <Fragment>
            <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/admin' exact component={AdminPage} />
            </Switch>
        </Fragment>
    )
}

export default Main
