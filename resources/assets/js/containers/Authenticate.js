import React, { Component } from 'react';

import Store from '../Store';

import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

import { registerAccount, authenticateAccount } from '../api';

class Authenticate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disableSubmit: false,
        };
    }

    afterLoginOrRegister = error => {
        this.setState({ disableSubmit: false });
        if (error) {
            console.log(error);
            // TODO: display error message to user
        } else {
            this.props.history.push('/dashboard');
        }
    }

    handleSubmitRegister = event => {
        event.preventDefault();

        let store = this.props.store;
        this.setState({ disableSubmit: true });
        registerAccount({
            first_name: store.get('first_name'),
            last_name: store.get('last_name'),
            email: store.get('email'),
            password: store.get('password')
        }, (error) => {
            this.afterLoginOrRegister(error);
        });
    }

    handleSubmitLogin = event => {
        event.preventDefault();

        let store = this.props.store;
        this.setState({ disableSubmit: true });
        authenticateAccount({
            email: store.get('email'),
            password: store.get('password')
        }, (error) => {
            this.afterLoginOrRegister(error);
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        {this.props.location.pathname === '/register' &&
                            <Register
                                handleSubmitRegister={this.handleSubmitRegister}
                                disableSubmit={this.state.disableSubmit}
                            />
                        }
                        {this.props.location.pathname === '/login' &&
                            <Login
                                handleSubmitLogin={this.handleSubmitLogin}
                                disableSubmit={this.state.disableSubmit}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Authenticate);
