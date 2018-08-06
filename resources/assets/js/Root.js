import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Store from './Store'

import Authenticate from './containers/Authenticate';
import Dashboard from './containers/Dashboard';

export default class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* TODO: make sure undux store persists (if cookies with a user's details exists and they're not in the store, fill the store with the user's details (getting the data from the cookies)) */}
                {/* TODO: header & topnav */}
                <div className="container">
                    <Store.Container>
                        <Switch>
                            {/* <Route exact path='/' component={Home} /> */}
                            {/* <Route exact path='/login' render={() => (<Authenticate authType='login' />)} />
                            <Route exact path='/register' render={() => (<Authenticate authType='register' />)} /> */}
                            <Route exact path='/register' component={Authenticate} />
                            <Route exact path='/login' component={Authenticate} />
                            {/* TODO: for '/dashboard': first check if logged in
                                        (through render and check if there's a cookie with access token?), otherwise send back to /login */}
                            <Route exact path='/dashboard' component={Dashboard} />
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
