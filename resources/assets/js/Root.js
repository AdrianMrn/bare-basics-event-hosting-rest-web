import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Router, Redirect } from 'react-router-dom'
import cookie from 'react-cookies';

import Store from './Store'

import Authenticate from './containers/Authenticate';
import Dashboard from './containers/Dashboard';
import EventEdit from './containers/eventEdit/EventEdit';
import TopNav from './components/TopNav';
import ErrorModal from './components/ErrorModal';

export default class Root extends Component {

    render() {
        // Private routes can only be accessed when the user has a valid access token
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                cookie.load('accessToken') /* TODO: Make this into a secure check by checking with Laravel Passport if the access token is legit? */
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
        )

        // Shouldn't be able to access these if you already have an access token, opposite of PrivateRoute
        const AuthRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                !cookie.load('accessToken')
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/dashboard',
                        state: { from: props.location }
                    }} />
            )} />
        )

        return (
            <div>
                <BrowserRouter>
                    <Store.Container>
                        <TopNav />
                        <ErrorModal />
                        <div className="container">
                            <Switch>
                                {/* TODO: <Route exact path='/' component={Home} /> */}

                                <AuthRoute exact path='/register' component={Authenticate} />
                                <AuthRoute exact path='/login' component={Authenticate} />
                                <PrivateRoute exact path='/logout' component={Authenticate} />

                                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                                <PrivateRoute exact path='/dashboard/event-detail/:slug' component={EventEdit} />

                                {/* TODO: Redirect to home when route can't be found */}
                            </Switch>
                        </div>

                    </Store.Container>
                </BrowserRouter>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
