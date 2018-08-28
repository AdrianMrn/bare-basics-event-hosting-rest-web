import React, { Component } from 'react';
import { Panel, Button, Glyphicon, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { debounce } from "debounce";

import { deleteSponsor, updateSponsor, uploadSponsorImage } from '../../../api';

import Store from '../../../Store';

class Sponsor extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            editing: false,
        }
    }

    handleChange = (field, event) => {
        const sponsorEdit = this.props.store.get('sponsorEdit');
        this.props.store.set('sponsorEdit')({ ...sponsorEdit, [field]: event.target.value });
    }

    onImageDrop = debounce((pictureFile, pictureDataURL) => {
        this.setState({ loading: true });

        const store = this.props.store;
        let sponsorEdit = store.get('sponsorEdit');
        store.set('sponsorEdit')({ ...sponsorEdit, image: pictureDataURL[0] });

        uploadSponsorImage(pictureFile[0], sponsorEdit.id, (error, response) => {
            if (error) {
                const errorMessages = (error.response.data.message ? [error.response.data.message] : error.response.data)
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                    errorMessages
                });
            } else {

            }
            this.setState({ loading: false });
        });
    }, 100);

    saveSponsor = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const sponsorId = this.props.data.id;
        const sponsorEdit = this.props.store.get('sponsorEdit')

        updateSponsor(sponsorId, sponsorEdit, (error, response) => {
            if (error) {
                const errorMessages = (error.response.data.message ? [error.response.data.message] : error.response.data)
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                    errorMessages
                });
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false, editing: false });
                this.props.toggleEditingSponsor();
                this.props.forceRefresh();
            }
        });
    }

    editSponsor = () => {
        // Disable control to allow the component to change (especially waiting for the possible speakers)
        this.setState({ loading: true });
        this.props.toggleEditingSponsor();

        // Fill store.sponsorEdit with this sponsor's info
        this.props.store.set('sponsorEdit')(this.props.data);

        this.setState({ editing: true, loading: false });
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
                this.props.toggleEditingSponsor();
                this.setState({ loading: false });
            }
        });
    }

    render() {
        const loading = this.state.loading;
        const sponsor = this.props.data;
        const sponsorEdit = this.props.store.get('sponsorEdit');
        return (
            <Panel>
                <Panel.Body>
                    <div>
                        {!this.state.editing &&
                            <div>
                                <div className="user-info">
                                    {(!!sponsor.image || !!sponsor.imageUrl) &&
                                        <div className='sponsor-image-display'>
                                            <img src={sponsor.image || sponsor.imageUrl} />
                                        </div>
                                    }

                                    <h3 className="speaker-name">{sponsor.name}</h3>
                                    <p className="sponsor-tier">{sponsor.tier} tier</p>
                                    <a href={sponsor.url} className="sponsor-item">{sponsor.url}</a>

                                    <p className="sponsor-item">{sponsor.description}</p>
                                </div>

                                <div className="event-component-buttons">
                                    <Button onClick={this.editSponsor} bsStyle="default" disabled={loading || this.props.disableEdit}>
                                        <Glyphicon glyph="pencil" />
                                        {' '}Edit
                                    </Button>
                                </div>
                            </div>
                        }

                        {this.state.editing && /* TODO: finish editing sponsor */
                            <form onSubmit={this.saveSponsor}>

                                <FormGroup>
                                    <ImageUploader
                                        buttonText='Sponsor logo'
                                        label={'Max file size: 10MB, accepted: jpg|png, max dimensions: 1240x1240'}
                                        onChange={this.onImageDrop}
                                        imgExtension={['.jpg', '.jpeg', '.png']}
                                        maxFileSize={5242880}
                                    />
                                    {(!!sponsorEdit.image || !!sponsorEdit.imageUrl) &&
                                        <div className='image-display'>
                                            <img src={sponsorEdit.image || sponsorEdit.imageUrl} />
                                        </div>
                                    }
                                </FormGroup>

                                <div className="session-name">
                                    <FormGroup controlId="name" bsSize="lg">
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={sponsorEdit.name || ''}
                                            onChange={e => this.handleChange('name', e)}
                                            disabled={loading}
                                            placeholder="Sponsor Name"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="sponsor-tier">
                                    <FormGroup controlId="tier" bsSize="sm">
                                        <ControlLabel>Sponsor Tier</ControlLabel>
                                        <FormControl componentClass="select" placeholder="Sponsor tier" onChange={e => this.handleChange('tier', e)} value={sponsorEdit.tier || 'other'} >
                                            <option value="gold">Gold</option>
                                            <option value="silver">Silver</option>
                                            <option value="bronze">Bronze</option>
                                            <option value="other">Other</option>
                                        </FormControl>
                                    </FormGroup>
                                </div>

                                <div className="sponsor-item">
                                    <FormGroup controlId="url" bsSize="sm">
                                        <FormControl
                                            type="text"
                                            value={sponsorEdit.url || ''}
                                            onChange={e => this.handleChange('url', e)}
                                            disabled={loading}
                                            placeholder="URL to sponsor's website"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="sponsor-item">
                                    <FormGroup controlId="description" bsSize="sm">
                                        <FormControl
                                            componentClass="textarea"
                                            value={sponsorEdit.description || ''}
                                            onChange={e => this.handleChange('description', e)}
                                            disabled={loading}
                                            placeholder="Description"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="event-component-buttons-remove">
                                    {/* TODO: When pressed, ask for confirmation */}
                                    <Button onClick={this.delete} bsStyle="danger" disabled={loading}>
                                        <Glyphicon glyph="trash" />
                                        {' '}Delete
                                    </Button>
                                </div>

                                <div className="event-component-buttons">
                                    <Button onClick={this.cancelEdit} bsStyle="warning" disabled={loading}>
                                        <Glyphicon glyph="remove" />
                                        {' '}Cancel
                                    </Button>

                                    <Button className='margin-left' bsStyle="primary" disabled={loading} type="submit">
                                        {loading && <Glyphicon glyph="refresh" />}
                                        {!loading && <Glyphicon glyph="save" />}
                                        {' '}Save
                                    </Button>
                                </div>
                            </form>
                        }
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Store.withStore(Sponsor);
