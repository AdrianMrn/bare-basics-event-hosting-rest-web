import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { NavLink } from 'react-router-dom';


import Store from '../../Store';

class Register extends Component {
    validateForm = () => {
        const store = this.props.store;
        return store.get('first_name').length > 0 && store.get('first_name').length < 100 &&
            store.get('last_name').length > 0 && store.get('last_name').length < 100 &&
            store.get('email').length > 0 && store.get('email').length < 250 &&
            store.get('password').length > 0 && store.get('password').length < 100;
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <form onSubmit={this.props.handleSubmitRegister}>
                    <FormGroup controlId="first_name" bsSize="sm">
                        <FormControl
                            autoFocus
                            type="text"
                            value={store.get('first_name')}
                            onChange={e => store.set('first_name')(e.target.value)}
                            disabled={this.props.disableSubmit}
                            placeholder="First name"
                        />
                    </FormGroup>
                    <FormGroup controlId="last_name" bsSize="sm">
                        <FormControl
                            type="text"
                            value={store.get('last_name')}
                            onChange={e => store.set('last_name')(e.target.value)}
                            disabled={this.props.disableSubmit}
                            placeholder="Last name"
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="sm">
                        <FormControl
                            type="email"
                            value={store.get('email')}
                            onChange={e => store.set('email')(e.target.value)}
                            disabled={this.props.disableSubmit}
                            placeholder="Email"
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="sm">
                        <FormControl
                            value={store.get('password')}
                            onChange={e => store.set('password')(e.target.value)}
                            type="password"
                            disabled={this.props.disableSubmit}
                            placeholder="Password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm() || this.props.disableSubmit}
                        type="submit"
                    >
                        Register
                    </Button>
                </form>

                <div className="auth-link">
                    <NavLink to="/login">
                        Already have an account? Log in here
                    </NavLink>
                </div>

            </div>
        );
    }
}

export default Store.withStore(Register);
