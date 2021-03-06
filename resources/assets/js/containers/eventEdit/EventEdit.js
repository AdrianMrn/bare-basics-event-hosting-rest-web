import React, { Component } from 'react';
import { Tabs, Tab, Button, Glyphicon, PageHeader } from 'react-bootstrap';

import Store from '../../Store';

import { getEventData, saveEventGeneralInfo, getEventExtraDetails } from '../../api';
import { GeneralTab, SessionsTab, SpeakersTab, SponsorsTab } from '../../components/eventEditTabs/index';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingEvent: false,
            loading: false,
            saveOnNextTabChange: true,
        }
    }

    componentDidMount() {
        this.setState({ fetchingEvent: true });
        getEventData(this.props.match.params.slug, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                this.props.store.set('selectedEvent')(response.data.eventData);
            }
            this.setState({ fetchingEvent: false });
        });
    }

    validateGeneraltabForm = () => {
        const store = this.props.store;
        let eventEdit = store.get('eventEdit');
        return eventEdit.name.length > 0 &&
            eventEdit.date_start &&
            eventEdit.date_start.length > 0
        eventEdit.date_end &&
            eventEdit.date_end.length > 0;
    }

    handleSaveGeneralInfo = event => {
        if (event) {
            event.preventDefault();
        }

        let store = this.props.store;
        this.setState({ loading: true });

        const selectedEvent = store.get('selectedEvent');
        const eventEdit = store.get('eventEdit');
        saveEventGeneralInfo(selectedEvent.id, eventEdit,
            (error, response) => {
                if (error) {
                    const errorMessages = (error.response.data.message ? [error.response.data.message] : error.response.data)
                    this.props.store.set('errorModal')({
                        showErrorModal: true,
                        errorMessages
                    });
                } else {
                    store.set('selectedEvent')({ ...selectedEvent, ...eventEdit });
                }
                this.setState({ loading: false });
            });
    }

    handleChangeTabs = tab => {
        if (tab != 'general') {
            this.setState({ loading: true });

            let store = this.props.store;
            const selectedEvent = store.get('selectedEvent');
            getEventExtraDetails(tab, selectedEvent.id, (error, response) => {
                if (error) {
                    this.props.store.set('errorModal')({
                        showErrorModal: true,
                    });
                } else {
                    store.set(`selectedEvent${tab.charAt(0).toUpperCase() + tab.slice(1)}`)(response.data);
                }
                this.setState({ loading: false });
            });
        }

        // If changing from the general tab, save general info to API
        if (this.state.saveOnNextTabChange) {
            this.handleSaveGeneralInfo();
            this.setState({ saveOnNextTabChange: false });
        }
        if (tab === 'general') {
            this.setState({ saveOnNextTabChange: true });
        }
    }

    navigateToDashboard = () => {
        this.props.history.push('/dashboard');
    }

    render() {
        const store = this.props.store;
        const event = store.get('selectedEvent');
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <PageHeader>
                            {event.name} <small></small>
                        </PageHeader>
                        <div className="y-padding">
                            <div className="y-padding">
                                <Button onClick={this.navigateToDashboard}><Glyphicon glyph="menu-left" /> to Dashboard</Button>
                            </div>
                            <div>
                                <Tabs activeKey={this.state.key} onSelect={this.handleChangeTabs} id="controlled-tabs">
                                    <Tab eventKey={'general'} title="General info" disabled={this.state.fetchingEvent}>
                                        <div className='event-edit-tab'>
                                            {this.state.fetchingEvent && <div className="lds-dual-ring"></div>}
                                            {!this.state.fetchingEvent &&
                                                <GeneralTab validateForm={this.validateGeneraltabForm} navigateToDashboard={this.navigateToDashboard} handleSave={this.handleSaveGeneralInfo} loading={this.state.loading} />
                                            }
                                        </div>
                                    </Tab>

                                    <Tab eventKey={'sessions'} title="Sessions" disabled={this.state.fetchingEvent || !this.validateGeneraltabForm()}>
                                        <div className='event-edit-tab'>
                                            <SessionsTab loading={this.state.loading} forceRefresh={() => this.handleChangeTabs('sessions')} />
                                        </div>
                                    </Tab>

                                    <Tab eventKey={'speakers'} title="Speakers" disabled={this.state.fetchingEvent || !this.validateGeneraltabForm()}>
                                        <div className='event-edit-tab'>
                                            <SpeakersTab loading={this.state.loading} forceRefresh={() => this.handleChangeTabs('speakers')} />
                                        </div>
                                    </Tab>

                                    <Tab eventKey={'sponsors'} title="Sponsors" disabled={this.state.fetchingEvent || !this.validateGeneraltabForm()}>
                                        <div className='event-edit-tab'>
                                            <SponsorsTab loading={this.state.loading} forceRefresh={() => this.handleChangeTabs('sponsors')} />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Dashboard);
