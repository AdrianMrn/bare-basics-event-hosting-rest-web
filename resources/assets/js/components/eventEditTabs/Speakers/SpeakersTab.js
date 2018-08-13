import React, { Component } from 'react';
import { Button, Glyphicon, FormGroup, FormControl } from "react-bootstrap";

import Store from '../../../Store';

import { createNewSpeaker } from '../../../api';

import Speaker from './Speaker';

class Speakers extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            email: ''
        }
    }

    validateForm() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }

    createSpeaker = () => {
        this.setState({ loading: true });

        let store = this.props.store;
        const selectedEvent = store.get('selectedEvent');
        createNewSpeaker(selectedEvent.id, { email: this.state.email }, (error, response) => {
            if (error) {
                console.log(error);
                // TODO: display error
            } else {
                console.log(response);
                if (response.data.error) {
                    // TODO: display error (this means the user is already a speaker at this event, just display the error message to the user)
                } else {
                    const speakers = store.get('selectedEventSpeakers');
                    speakers.push(response.data.speaker);
                    store.set('selectedEventSpeakers')(speakers);
                    this.scrollToBottom();
                }
            }
            this.setState({ loading: false, email: '' });
        });
    }

    scrollToBottom() {
        this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        const store = this.props.store;
        const loading = this.props.loading || this.state.loading;
        return (
            <div>
                <div className="y-padding">
                    <form onSubmit={this.props.handleSubmitRegister}>
                        <FormGroup controlId="email" bsSize="sm">
                            <FormControl
                                type="email"
                                value={this.state.email}
                                onChange={(e => this.setState({ email: e.target.value }))}
                                disabled={loading}
                                placeholder="Speaker's email"
                            />
                        </FormGroup>
                        {/* TODO: "GDPR disclaimer: The owner of this email address has given me permission to share his email address with BBEvents." */}
                        <Button type="submit" bsStyle="info" onClick={this.createSpeaker} disabled={loading || !this.state.email.length || !this.validateForm()}>
                            <span>
                                {this.props.loading &&
                                    <Glyphicon glyph="refresh" />
                                }
                                {!this.props.loading &&
                                    <Glyphicon glyph="plus" />
                                }
                                {" "}Create a Speaker
                            </span>
                        </Button>
                    </form>
                </div>

                {this.props.loading && <div className="lds-dual-ring"></div>}
                {store.get('selectedEventSpeakers').map((data, index) => (
                    <Speaker data={data} key={data.id} forceRefresh={this.props.forceRefresh} />
                ))}

                <div ref={scrollTarget => { this.scrollTarget = scrollTarget; }} />
            </div>
        );
    }
}

export default Store.withStore(Speakers);
