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
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
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
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
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
                        <p className="session-date-disclaimer">Only the owner of the email address can edit their profile details through the app.</p>
                        
                        <div className="user-info">
                            {/* TODO: display user info, media (image) description, company, ... from this.state.speakerDetails */}
                            <h3 className="speaker-name">{speaker.first_name} {speaker.last_name}</h3>
                            <p className="speaker-email">{speaker.email}</p>
                        </div>

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
