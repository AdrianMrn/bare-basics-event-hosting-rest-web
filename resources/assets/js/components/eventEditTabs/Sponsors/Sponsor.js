import React, { Component } from 'react';
import { Panel, Button, Glyphicon } from 'react-bootstrap';

import { deleteSponsor, updateSponsor } from '../../../api';

import Store from '../../../Store';

class Sponsor extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,

            sponsorDetails: {
                name: '',
                description: '',
                url: '',
                tier: '',
                event_id: ''
            }
        }
    }

    saveSponsor = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const sponsorId = this.props.data.id;
        const sponsorEdit = this.props.store.get('sponsorEdit')

        updateSponsor(id, sponsorEdit, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                this.setState({ loading: false });
                this.props.toggleEditingSponsor();
                this.props.forceRefresh();
            }
        });
    }

    cancelEdit = () => {
        this.setState({ editing: false });
        this.props.toggleEditingSponsor();
    }
    /* TODO: (frontend and backend) finish Sponsor, SponsorsTab and SponsorController */
    delete = () => {
        this.setState({ loading: true });
        const id = this.props.data.id
        deleteSponsor(id, (error, response) => {
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
        const sponsor = this.props.data;
        console.log(sponsor);
        return (
            <Panel>
                <Panel.Body>
                    <div>
                        <p className="session-date-disclaimer">Only the owner of the email address can edit their profile details through the app.</p>

                        {!this.state.editing &&
                            <div>
                                <div className="user-info">
                                    <img src={sponsor.imageUrl} />
                                    <h3 className="speaker-name">{sponsor.name}</h3>
                                    <p className="speaker-email">{sponsor.url}</p>

                                    <p className="speaker-description">{sponsor.description}</p>
                                </div>

                                <div className="event-component-buttons-remove">
                                    {/* TODO: When pressed, ask for confirmation */}
                                    <Button onClick={this.delete} bsStyle="danger" disabled={loading}>
                                        <Glyphicon glyph="trash" />
                                        {' '}Delete
                                    </Button>
                                </div>
                            </div>
                        }

                        {this.state.editing && /* TODO: finish editing sponsor */
                            <div className="event-component-buttons-remove">
                                {/* TODO: When pressed, ask for confirmation */}
                                <Button onClick={this.delete} bsStyle="danger" disabled={loading}>
                                    <Glyphicon glyph="trash" />
                                    {' '}Delete
                                    </Button>
                            </div>
                        }
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Store.withStore(Sponsor);
