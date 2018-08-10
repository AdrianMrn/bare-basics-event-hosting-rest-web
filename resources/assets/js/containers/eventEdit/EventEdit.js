import React, { Component } from 'react';
import { Panel, Tabs, Tab } from 'react-bootstrap';

import Store from '../../Store';

import { getEventData } from '../../api';
import { General } from '../../components/eventEditTabs/index';

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
                                    <Tabs activeKey={this.state.key} onSelect={this.handleSelectTabs} id="controlled-tabs">
                                        <Tab eventKey={1} title="General info">
                                            <div className='event-edit-tab'>
                                                <General />
                                            </div>
                                        </Tab>

                                        <Tab eventKey={2} title="Sessions">
                                            <div className='event-edit-tab'>
                                                tab
                                            </div>
                                        </Tab>

                                        <Tab eventKey={3} title="Speakers">
                                            <div className='event-edit-tab'>
                                                tab
                                            </div>
                                        </Tab>

                                        <Tab eventKey={4} title="Sponsors">
                                            <div className='event-edit-tab'>
                                                tab
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Dashboard);
