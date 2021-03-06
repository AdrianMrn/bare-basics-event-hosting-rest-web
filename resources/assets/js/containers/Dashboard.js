import React, { Component } from 'react';
import { Button, Glyphicon, PageHeader } from 'react-bootstrap';

import Store from '../Store';

import Event from '../components/dashboard/Event';

import { getUserEvents, createNewEvent } from '../api';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingEvents: true,
            disableCreateEventButton: false,
        }
    }

    componentDidMount() {
        getUserEvents((error, response) => {
            this.setState({ fetchingEvents: false });
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                this.props.store.set('myEvents')(response.data);
            }
        });
    }

    createEvent = () => {
        this.setState({ disableCreateEventButton: true });
        createNewEvent((error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
                this.setState({ disableCreateEventButton: false });
            } else {
                this.setState({ disableCreateEventButton: false });
                this.navigateToEventEdit(response.data.slug);

            }
        })
    }

    navigateToEventEdit = (slug) => {
        this.props.history.push(`/dashboard/event-detail/${slug}`);
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <PageHeader>
                            Dashboard <small>Events</small>
                        </PageHeader>
                        <div className="y-padding">
                            <Button bsStyle="info" onClick={this.createEvent} disabled={this.state.disableCreateEventButton}>
                                <span>
                                    {this.props.disableCreateEventButton &&
                                        <Glyphicon glyph="refresh" />
                                    }
                                    {!this.props.disableCreateEventButton &&
                                        <Glyphicon glyph="plus" />
                                    }
                                    {" "}Create an event
                                </span>
                            </Button>
                        </div>
                        <div className="y-padding">
                            {this.state.fetchingEvents && <div className="lds-dual-ring"></div>}
                            {store.state.myEvents && store.state.myEvents.map((data, index) => (
                                <Event data={data} navigateToEventEdit={this.navigateToEventEdit} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Store.withStore(Dashboard);
