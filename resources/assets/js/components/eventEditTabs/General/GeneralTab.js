import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Checkbox, Glyphicon } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import ImageUploader from 'react-images-upload';
import { debounce } from "debounce";

import Store from '../../../Store';

import { uploadImage, deleteEvent } from '../../../api';

import Autocomplete from './Autocomplete';

class General extends Component {
    constructor() {
        super();

        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {
        let selectedEvent = this.props.store.get('selectedEvent');
        this.props.store.set('eventEdit')(selectedEvent);
    }

    onDateChange = (e, picker) => {
        let eventEdit = this.props.store.get('eventEdit');
        this.props.store.set('eventEdit')({
            ...eventEdit,
            'date_start': picker.startDate.format('YYYY-MM-DD HH:mm:ss'),
            'date_end': picker.endDate.format('YYYY-MM-DD HH:mm:ss')
        });
    }

    handleChange = (field, event) => {
        let eventEdit = this.props.store.get('eventEdit');
        this.props.store.set('eventEdit')({ ...eventEdit, [field]: event.target.value });
    }

    onImageDrop = debounce((pictureFile, pictureDataURL) => {
        this.setState({ loading: true });

        const store = this.props.store;
        let eventEdit = store.get('eventEdit');
        store.set('eventEdit')({ ...eventEdit, image: pictureDataURL[0] });

        uploadImage(pictureFile[0], eventEdit.id, (error, response) => {
            if (error) {
                store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                console.log(response);
            }
            this.setState({ loading: false });
        });
    }, 100);

    delete = () => {
        const store = this.props.store;
        this.setState({ loading: true });
        const id = store.get('eventEdit').id;
        deleteEvent(id, (error, response) => {
            if (error) {
                store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                this.props.navigateToDashboard();
            }
        });
    }

    render() {
        let store = this.props.store;
        let eventEdit = store.get('eventEdit');
        let loading = this.props.loading || this.state.loading;
        return (
            <div>
                <form onSubmit={this.props.handleSave}>
                    <FormGroup>
                        <ImageUploader
                            buttonText='Event logo'
                            label={'Max file size: 5MB, accepted: jpg|png, square'}
                            onChange={this.onImageDrop}
                            imgExtension={['.jpg', '.jpeg', '.png']}
                            maxFileSize={5242880}
                        />
                        {(!!eventEdit.image || !!eventEdit.imageUrl) &&
                            <div className='image-display'>
                                <img src={eventEdit.image || eventEdit.imageUrl} />
                            </div>
                        }
                    </FormGroup>

                    <FormGroup controlId="name" bsSize="lg">
                        <FormControl
                            autoFocus
                            type="text"
                            value={eventEdit.name || ''}
                            onChange={e => this.handleChange('name', e)}
                            disabled={loading}
                            placeholder="Event Name"
                        />
                    </FormGroup>

                    <FormGroup controlId="description" bsSize="sm">
                        <FormControl
                            componentClass="textarea"
                            value={eventEdit.description || ''}
                            onChange={e => this.handleChange('description', e)}
                            disabled={loading}
                            placeholder="Description"
                        />
                    </FormGroup>

                    <FormGroup controlId="dates" bsSize="sm">
                        <DateRangePicker
                            startDate={eventEdit.date_start ? moment(eventEdit.date_start) : undefined}
                            endDate={eventEdit.date_end ? moment(eventEdit.date_end) : undefined}
                            timePicker={true}
                            timePicker24Hour={true}
                            onApply={this.onDateChange} onHide={this.onDateChange} onHideCalendar={this.onDateChange}
                        >
                            <FormControl
                                type="text"
                                value={eventEdit.date_start ? `${eventEdit.date_start} - ${eventEdit.date_end}` : 'Click here to set the start and end dates'}
                                disabled={loading}
                                readOnly={true}
                                className='date-time-input'
                            />
                        </DateRangePicker>
                    </FormGroup>

                    <FormGroup controlId="name" bsSize="sm">
                        <Autocomplete disabled={loading} />
                    </FormGroup>

                    <div className="event-edit-removebutton-bottom">
                        {/* TODO: When pressed, ask for confirmation */}
                        <Button onClick={this.delete} bsStyle="danger" disabled={loading}>
                            <Glyphicon glyph="trash" />
                            {' '}Delete
                        </Button>
                    </div>

                    {!this.props.validateForm() &&
                        <p className="generaltab-save-disclaimer">You need at least a name and a date for your event to save it.</p>
                    }

                    <div className="event-edit-savebutton-bottom">
                        <Button bsStyle="primary" disabled={!this.props.validateForm() || loading} type="submit">
                            <Glyphicon glyph="save" />
                            {' '}Save
                        </Button>
                    </div>

                    {/* To Publish, the event should have: an image, a title, a start & end date */}
                </form>
            </div>
        );
    }
}

export default Store.withStore(General);
