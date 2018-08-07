import React, { Component } from 'react';

import Store from '../../Store';

import { getEventData } from '../../api';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingEvent: false
        }
    }

    componentDidMount() {
        if (this.props.store.get('eventEdit.data.id')) {
            // If the user navigated here from the dashboard and the event data is already in the store
        } else {
            // If the user navigated directly to this URL or refreshed the page, we need to get the event data from the API and place it in the store
            this.setState({ fetchingEvent: true });
            getEventData(this.props.match.params.slug, (error, response) => {
                if (error) {
                    // TODO: display error & ask user to refresh the page
                    console.log(error)
                } else {
                    this.props.store.set('eventEdit')(response.data.eventData);
                }
                this.setState({ fetchingEvent: false });
            });
        }
    }

    render() {
        const store = this.props.store;
        const event = store.get('eventEdit');
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="y-padding">
                            {this.state.fetchingEvent && <div className="lds-dual-ring"></div>}
                            {!this.state.fetchingEvent &&
                                <div>
                                    {/* If the initial steps have not yet been completed (description, startdate, ...), display those first, otherwise display the extras */}
                                    {!event.date_start && 
                                    <div>
                                        Initial steps
                                    </div>}

                                    {event.date_start && 
                                    <div>
                                        Extras
                                    </div>}

                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Dashboard);
