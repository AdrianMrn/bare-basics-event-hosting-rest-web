import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';

import Store from '../../Store';

import { getEventData, saveEventGeneralInfo } from '../../api';
import { GeneralTab, SessionsTab, SpeakersTab, SponsorsTab } from '../../components/eventEditTabs/index';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingEvent: false,
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({ fetchingEvent: true });
        getEventData(this.props.match.params.slug, (error, response) => {
            if (error) {
                // TODO: display error
                console.log(error)
            } else {
                this.props.store.set('selectedEvent')(response.data.eventData);
            }
            this.setState({ fetchingEvent: false });
        });

    }

    handleSaveGeneralInfo = event => {
        event.preventDefault();

        let store = this.props.store;
        this.setState({ loading: true });

        const selectedEvent = store.get('selectedEvent');
        const eventEdit = store.get('eventEdit');

        saveEventGeneralInfo(selectedEvent.id, eventEdit,
            (error, response) => {
                if (error) {
                    // TODO: display error
                    console.log(error);
                    this.setState({ loading: false });
                } else {
                    console.log(response);
                    this.setState({ loading: false });
                }
            });
    }

    render() {
        const store = this.props.store;
        const event = store.get('selectedEvent');
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
                                                <GeneralTab handleSave={this.handleSaveGeneralInfo} loading={this.state.loading} />
                                            </div>
                                        </Tab>

                                        <Tab eventKey={2} title="Sessions">
                                            <div className='event-edit-tab'>
                                                <SessionsTab loading={this.state.loading} />
                                            </div>
                                        </Tab>

                                        <Tab eventKey={3} title="Speakers">
                                            <div className='event-edit-tab'>
                                                <SpeakersTab loading={this.state.loading} />
                                            </div>
                                        </Tab>

                                        <Tab eventKey={4} title="Sponsors">
                                            <div className='event-edit-tab'>
                                                <SponsorsTab loading={this.state.loading} />
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Dashboard);
