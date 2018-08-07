import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import cookie from 'react-cookies';

import Store from './Store'

import Authenticate from './containers/Authenticate';
import Dashboard from './containers/Dashboard';
import EventEdit from './containers/eventEdit/EventEdit';

export default class Root extends Component {

    render() {
        // Private routes can only be accessed when the user has a valid access token
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                cookie.load('accessToken') /* TODO: Make this into a secure check by checking with Laravel Passport if the access token is legit */
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
        )

        return (
            <BrowserRouter>
                {/* TODO: make sure undux store persists (if cookies with a user's details exists and they're not in the store, fill the store with the user's details (getting the data from the cookies)) */}
                {/* TODO: header with topnav component goes here */}
                <div className="container">
                    <Store.Container>
                        <Switch>
                            {/* <Route exact path='/' component={Home} /> */}
                            <Route exact path='/register' component={Authenticate} /> {/* TODO: if user is already logged in, block the register & login routes & redirect to dashboard */}
                            <Route exact path='/login' component={Authenticate} />

                            {/* TODO: for everything with /dashboard: first check if logged in (through render and check if there's a cookie with access token?), otherwise send to /login */}
                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            <PrivateRoute exact path='/dashboard/event-detail/:slug' component={EventEdit} />

                            {/* Redirect to 404 or home when route doesn't match */}
                        </Switch>
                    </Store.Container>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
