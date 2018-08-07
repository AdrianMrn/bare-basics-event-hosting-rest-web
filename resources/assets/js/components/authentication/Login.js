import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";

import Store from '../../Store';

class Login extends Component {
    validateForm() {
        return this.props.store.get('email').length > 0 && this.props.store.get('password').length > 0;
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <form onSubmit={this.props.handleSubmitLogin}>
                    <FormGroup controlId="email" bsSize="sm">
                        <FormControl
                            autoFocus
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
                        Login
          </Button>
                </form>
            </div>
        );
    }
}

export default Store.withStore(Login);
