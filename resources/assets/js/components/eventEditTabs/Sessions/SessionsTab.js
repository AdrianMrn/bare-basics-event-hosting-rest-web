import React, { Component } from 'react';
import { Button, Glyphicon, FormGroup, FormControl } from "react-bootstrap";

import Store from '../../../Store';

import { createNewSession } from '../../../api';

import Session from './Session';

class Sessions extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            editingSession: false,
        }
    }

    createSession = () => {
        this.setState({ loading: true });

        let store = this.props.store;
        const selectedEvent = store.get('selectedEvent');
        createNewSession(selectedEvent.id, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                const sessions = store.get('selectedEventSessions');
                sessions.push(response.data);
                store.set('selectedEventSessions')(sessions);
            }
            this.setState({ loading: false });
            this.scrollToBottom();
        });
    }

    toggleEditingSession = () => {
        this.setState({ editingSession: !this.state.editingSession });
    }

    scrollToBottom() {
        this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <div className="y-padding">
                    <Button bsStyle="info" onClick={this.createSession} disabled={this.props.loading || this.state.loading || this.state.editingSession}>
                        <span>
                            {this.props.loading &&
                                <Glyphicon glyph="refresh" />
                            }
                            {!this.props.loading &&
                                <Glyphicon glyph="plus" />
                            }
                            {" "}Create a Session
                        </span>
                    </Button>
                </div>

                {this.props.loading && <div className="lds-dual-ring"></div>}
                {store.get('selectedEventSessions').map((data, index) => (
                    <Session disableEdit={this.state.editingSession} data={data} key={data.id} forceRefresh={this.props.forceRefresh} toggleEditingSession={this.toggleEditingSession} />
                ))}

                <div ref={scrollTarget => { this.scrollTarget = scrollTarget; }} />
            </div>
        );
    }
}

export default Store.withStore(Sessions);
