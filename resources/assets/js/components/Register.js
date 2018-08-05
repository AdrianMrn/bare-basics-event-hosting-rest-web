import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Register extends Component {
    validateForm() {
        return this.props.email.length > 0 && this.props.password.length > 0;
    }

    render() {
        console.log(this.props)
        return (
            <div className="Login">
                <form onSubmit={this.props.handleSubmit}>
                    <FormGroup controlId="name" bsSize="sm">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.props.name}
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="sm">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.props.email}
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="sm">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.props.password}
                            onChange={this.props.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Register
          </Button>
                </form>
            </div>
        );
    }
}
