import React, { Component } from 'react';

import Store from '../Store';

import { getUserEvents } from '../api';

import Event from '../components/dashboard/Event';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        // TODO: display loader icon where events will show up until fetched

    }

    componentDidMount() {
        getUserEvents((error, response) => {
            // TODO: Remove loader icon
            if (error) {
                // TODO: display error to user
                console.log(error)
            } else {
                this.props.store.set('myEvents')(response.data);
            }
        });
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        {/* TODO: "Create an event" button */}
                        {store.state.myEvents && store.state.myEvents.map((data, index) => (
                            <Event data={data} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Dashboard);
