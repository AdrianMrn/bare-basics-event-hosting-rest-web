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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
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
            this.setState({ disableSubmit: false });
            if (error) {
                console.log(error);
                // TODO: display error message to user
            } else {
                console.log('registered!');
                // TODO: route to dashboard
            }
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
            this.setState({ disableSubmit: false });
            if (error) {
                console.log(error);
                // TODO: display error message to user
            } else {
                console.log('logged in!');
                // TODO: route to dashboard
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        {this.props.authType === 'register' &&
                            <Register
                                handleChange={this.handleChange}
                                handleSubmitRegister={this.handleSubmitRegister}
                                disableSubmit={this.state.disableSubmit}
                            />
                        }
                        {this.props.authType === 'login' &&
                            <Login
                                handleChange={this.handleChange}
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
