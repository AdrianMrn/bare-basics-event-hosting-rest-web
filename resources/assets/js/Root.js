import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Store from './Store'

import Authenticate from './containers/Authenticate';

export default class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* TODO: header & topnav */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <Store.Container>
                                <Switch>
                                    {/* <Route exact path='/' component={Home} /> */}
                                    <Route exact path='/login' render={() => (<Authenticate authType='login' />)} />
                                    <Route exact path='/register' render={() => (<Authenticate authType='register' />)} />
                                </Switch>
                            </Store.Container>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
