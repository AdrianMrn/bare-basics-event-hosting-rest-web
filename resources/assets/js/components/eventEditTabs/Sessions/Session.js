import React, { Component } from 'react';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

import { getSessionSpeakers } from '../../../api';

import Store from '../../../Store';

class Sessions extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            speakers: []
        }
    }

    componentDidMount = () => {
        this.getSpeakers();
    }

    getSpeakers = () => {
        getSessionSpeakers(this.props.data.id, (error, response) => {
            if (error) {
                // TODO: display error
                console.log(error)
            } else {
                console.log(response);
                this.setState({ speakers: response.data });
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const store = this.props.store;
        const data = this.props.data;
        return (
            <Panel>
                <Panel.Body>
                    {/* TODO: add event media */}
                    <h3>{data.name}</h3>
                    <p>
                        <Glyphicon glyph="calendar" />
                        {" "}{moment(data.date_start).format('dddd, MMMM Do')}
                    </p>

                    <p>
                        <Glyphicon glyph="time" />
                        {" "}{moment(data.date_start).format('HH:mm')}
                        {" "}<Glyphicon glyph="arrow-right" />
                        {" "}{moment(data.date_end).format('HH:mm')}
                    </p>

                    {this.state.speakers.map((speaker, index) => (
                        <p key={index}>
                            <Glyphicon glyph="user" />
                            {" "}{speaker.speakerName}
                        </p>
                    ))}

                    <p>
                        
                    </p>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Store.withStore(Sessions);
