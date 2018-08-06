import React, { Component } from 'react';

import Store from '../Store';

import { getUserEvents } from '../api';

class Dashboard extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        getUserEvents((error, response) => {
            if (error) {
                // TODO: display error to user
                console.log(error)
            } else {
                // TODO: add user's events to the myEvents array in the store
                console.log(response);
                
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <p>kek</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Dashboard);
