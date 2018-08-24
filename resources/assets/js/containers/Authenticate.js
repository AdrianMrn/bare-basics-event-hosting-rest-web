import React, { Component } from 'react';
import cookie from 'react-cookies';

import Store from '../Store';

import { registerAccount, authenticateAccount } from '../api';

import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

class Authenticate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disableSubmit: false,
        };
    }

    componentDidMount = () => {
        if (this.props.location.pathname === '/logout') {
            cookie.remove('accessToken');
            cookie.remove('refreshToken');
            cookie.remove('firstName');
            cookie.remove('lastName');
            cookie.remove('email');

            const store = this.props.store;
            store.set('user')({});

            this.props.history.push('/');
        }
    }

    afterLoginOrRegister = (error, data) => {
        this.setState({ disableSubmit: false });
        if (error) {
            const errorMessages = (error.response.data.message ? [error.response.data.message] : error.response.data)
            this.props.store.set('errorModal')({
                showErrorModal: true,
                errorMessages
            });
        } else {
            // Seting the user info in the store
            const store = this.props.store;
            const user = store.get('user');
            store.set('user')({
                ...user,
                first_name: data.first_name
            })

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
        }, (error, data) => {
            this.afterLoginOrRegister(error, data);
        });
    }

    handleSubmitLogin = event => {
        event.preventDefault();

        let store = this.props.store;
        this.setState({ disableSubmit: true });
        authenticateAccount({
            email: store.get('email'),
            password: store.get('password')
        }, (error, data) => {
            this.afterLoginOrRegister(error, data);
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
