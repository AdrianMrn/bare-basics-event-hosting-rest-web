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
                {/* TODO: make sure undux store persists (if cookies with a user's details exists and they're not in the store, fill the store with the user's details (getting the data from the cookies)) (eg for displaying name at the top, ...) */}
                {/* TODO: header with topnav component goes here */}
                <div className="container">
                    <Store.Container>
                        <Switch>
                            {/* TODO: <Route exact path='/' component={Home} /> */}
                            <Route exact path='/register' component={Authenticate} /> {/* TODO: if user is already logged in, block the register & login routes & redirect to dashboard */}
                            <Route exact path='/login' component={Authenticate} />

                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            <PrivateRoute exact path='/dashboard/event-detail/:slug' component={EventEdit} />

                            {/* TODO: Redirect to 404 or home when route doesn't match */}
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
