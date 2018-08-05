import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Register from '../components/Register';

import { getTest } from '../api';

export default class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        getTest();
    }

    handleSubmit = event => {
        event.preventDefault();
        getTest();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <Register
                            name={this.state.name}
                            email={this.state.email}
                            password={this.state.password}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
