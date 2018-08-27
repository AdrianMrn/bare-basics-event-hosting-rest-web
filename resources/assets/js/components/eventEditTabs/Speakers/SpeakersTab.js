import React, { Component } from 'react';
import { Button, Glyphicon, FormGroup, FormControl, Checkbox } from "react-bootstrap";

import Store from '../../../Store';

import { createNewSpeaker } from '../../../api';

import Speaker from './Speaker';

class Speakers extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            email: '',
            gdprBoxChecked: false
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
        createNewSpeaker({ email: this.state.email, eventId: selectedEvent.id }, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                if (response.data.error) {
                    this.props.store.set('errorModal')({
                        showErrorModal: true,
                        alertStyle: 'info',
                        errorMessages: ['This email address is already registered as a speaker!']
                    });
                } else {
                    const speakers = store.get('selectedEventSpeakers');
                    speakers.push(response.data.speaker);
                    store.set('selectedEventSpeakers')(speakers);
                    this.scrollToBottom();
                }
                this.setState({ gdprBoxChecked: false });
            }
            this.setState({ loading: false, email: '' });
        });
    }

    scrollToBottom() {
        this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }

    toggleGdprBoxChecked = e => {
        this.setState({ gdprBoxChecked: !this.state.gdprBoxChecked });
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

                        <Checkbox
                            checked={this.state.gdprBoxChecked}
                            onChange={this.toggleGdprBoxChecked} >
                            GDPR disclaimer: The owner of this email address has given you permission to share this email address with BBEvents.
                        </Checkbox>

                        <Button type="submit" bsStyle="info" onClick={this.createSpeaker} disabled={loading || !this.state.email.length || !this.validateForm() || !this.state.gdprBoxChecked}>
                            <span>
                                {this.props.loading &&
                                    <Glyphicon glyph="refresh" />
                                }
                                {!this.props.loading &&
                                    <Glyphicon glyph="plus" />
                                }
                                {" "}Add Speaker
                            </span>
                        </Button>
                    </form>
                </div>

                {this.props.loading && <div className="lds-dual-ring"></div>}
                {
                    store.get('selectedEventSpeakers').map((data, index) => (
                        <Speaker data={data} key={data.id} forceRefresh={this.props.forceRefresh} />
                    ))
                }

                <div ref={scrollTarget => { this.scrollTarget = scrollTarget; }} />
            </div >
        );
    }
}

export default Store.withStore(Speakers);
