import React, { Component } from 'react';
import { Panel, Button, Glyphicon } from 'react-bootstrap';

import { getSpeakerInfo, deleteSpeaker } from '../../../api';

import Store from '../../../Store';

class Speaker extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,

            speakerDetails: {
                first_name: '',
                last_name: '',
                company: '',
                position: '',
                description: '',
                linkedin: '',
                facebook: '',
                website: '',
                twitter: '',
                email: ''
            }
        }
    }

    componentDidMount = () => {
        this.getSpeakerDetails();
    }

    getSpeakerDetails = () => {
        this.setState({ loading: true });
        getSpeakerInfo(this.props.data.id, (error, response) => {
            if (error) {
                // TODO: display error
                console.log(error);
            } else {
                this.setState({ speakerDetails: response.data, loading: false });
            }
        });
    }

    delete = () => {
        this.setState({ loading: true });
        const id = this.props.data.id
        deleteSpeaker(id, (error, response) => {
            if (error) {
                console.log(error);
                // TODO: display error
            } else {
                this.props.forceRefresh();
                this.setState({ loading: false });
            }
        });
    }

    render() {
        const loading = this.state.loading;
        const speaker = this.state.speakerDetails;
        return (
            <Panel>
                <Panel.Body>
                    <div>
                        <div className="user-info">
                            {/* TODO: display user info, media (image) description, company, ... from this.state.speakerDetails */}
                            {speaker.first_name}
                        </div>

                        {/* TODO: Disclaimer that only the speaker can edit their details through the app/website
                                      AND if you want to add a new speaker, you should use the form at the top of the page
                            */}
                        <div className="event-component-buttons-remove">
                            {/* TODO: When pressed, ask for confirmation */}
                            <Button onClick={this.delete} bsStyle="danger" disabled={loading}>
                                <Glyphicon glyph="trash" />
                                {' '}Delete
                            </Button>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Store.withStore(Speaker);
