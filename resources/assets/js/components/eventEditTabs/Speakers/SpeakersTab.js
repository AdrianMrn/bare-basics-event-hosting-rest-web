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
            editingSpeaker: false,
        }
    }

    createSpeaker = () => {
        /* this.setState({ loading: true });

        let store = this.props.store;
        const selectedEvent = store.get('selectedEvent');
        createNewSpeaker(selectedEvent.id, (error, response) => {
            if (error) {
                console.log(error);
                // TODO: display error
            } else {
                const speakers = store.get('selectedEventSpeakers');
                speakers.push(response.data);
                store.set('selectedEventSpeakers')(speakers);
                // TODO: start editing speaker?
            }
            this.setState({ loading: false });
            this.scrollToBottom();
        }); */
    }

    toggleEditingSpeaker = () => {
        this.setState({ editingSpeaker: !this.state.editingSpeaker });
    }

    scrollToBottom() {
        this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <div className="y-padding">
                    {/* TODO: With an email input field where the speaker's email has to be entered first */}
                    {/* <Button bsStyle="info" onClick={this.createSpeaker} disabled={this.props.loading || this.state.loading || this.state.editingSpeaker}>
                        <span>
                            {this.props.loading &&
                                <Glyphicon glyph="refresh" />
                            }
                            {!this.props.loading &&
                                <Glyphicon glyph="plus" />
                            }
                            {" "}Create a Speaker
                        </span>
                    </Button> */}
                </div>

                {this.props.loading && <div className="lds-dual-ring"></div>}
                {store.get('selectedEventSpeakers').map((data, index) => (
                    <Speaker data={data} key={index} forceRefresh={this.props.forceRefresh} />
                ))}

                <div ref={scrollTarget => { this.scrollTarget = scrollTarget; }} />
            </div>
        );
    }
}

export default Store.withStore(Speakers);
