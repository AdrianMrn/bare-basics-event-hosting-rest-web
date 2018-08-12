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
        }
    }

    createSession = () => {
        this.setState({ loading: true });

        let store = this.props.store;
        const selectedEvent = store.get('selectedEvent');
        createNewSession(selectedEvent.id, (error, response) => {
            if (error) {
                console.log(error);
                // TODO: display error
            } else {
                const sessions = store.get('selectedEventSessions');
                sessions.push(response.data);
                store.set('selectedEventSessions')(sessions);
                // TODO: scroll to and start editing session
            }
            this.setState({ loading: false });
            this.scrollToBottom();
        });
    }

    scrollToBottom() {
        this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <div className="y-padding">
                    <Button bsStyle="info" onClick={this.createSession} disabled={this.props.loading || this.state.loading}>
                        <span>
                            {this.props.loading &&
                                <Glyphicon glyph="refresh" />
                            }
                            {!this.props.loading &&
                                <Glyphicon glyph="plus" />
                            }
                            {" "}Create a session
                        </span>
                    </Button>
                </div>
                <div className="y-padding">
                    {this.props.loading && <div className="lds-dual-ring"></div>}
                    {store.get('selectedEventSessions').map((data, index) => (
                        <Session data={data} key={index} forceRefresh={this.props.forceRefresh} />
                    ))}
                </div>

                <div ref={scrollTarget => { this.scrollTarget = scrollTarget; }} />
            </div>
        );
    }
}

export default Store.withStore(Sessions);
