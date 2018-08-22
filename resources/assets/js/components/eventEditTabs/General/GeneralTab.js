import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Checkbox, Glyphicon } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import ImageUploader from 'react-images-upload';
import { debounce } from "debounce";

import Store from '../../../Store';

import { uploadImage } from '../../../api';

class General extends Component {
    constructor() {
        super();

        this.state = {
            addressInput: '',
            loading: false
        }
    }

    validateForm() {
        //return this.props.store.get('email').length > 0 && this.props.store.get('password').length > 0;
        /* TODO: validation; title and dates should not be empty. */
        return true;
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

    addressLookup = event => {
        this.setState({ addressInput: event.target.value });
        /*  TODO: (google geocode) autocomplete address and set it in store: address, city & country
            and set coords_lat & coords_lon
        */
    }

    onImageDrop = debounce((pictureFile, pictureDataURL) => {
        this.setState({ loading: true });

        let eventEdit = this.props.store.get('eventEdit');
        this.props.store.set('eventEdit')({ ...eventEdit, image: pictureDataURL[0] });

        uploadImage(pictureFile[0], eventEdit.id, (error, response) => {
            if (error) {
                // TODO: display error
                console.log(error);
            } else {
                console.log(response);
            }
            this.setState({ loading: false });
        });
    }, 100);

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
                        {!!eventEdit.image &&
                            <div className='image-display'>
                                <img src={eventEdit.image} height="130" width="130" />
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

                    {/* TODO: make this disable the address field && stop the address from being sent in the POST request */}
                    {/* <FormGroup controlId="is_online" bsSize="sm"> 
                        <Checkbox>
                            This is an online event (no location)
                        </Checkbox>
                    </FormGroup> */}

                    <FormGroup controlId="name" bsSize="sm">
                        <FormControl
                            type="text"
                            value={this.state.addressInput}
                            onChange={this.addressLookup}
                            disabled={loading}
                            placeholder="Location (address)"
                        />
                    </FormGroup>


                    <div className="event-edit-savebutton-bottom">
                        <Button bsStyle="primary" disabled={!this.validateForm() || loading} type="submit">
                            <Glyphicon glyph="save" />
                            {' '}Save
                        </Button>
                    </div>
                    {/* TODO: buttons for Publish/Unpublish and Delete */}
                    {/* To Publish, the event should have: an image, a title, a start & end date */}
                </form>
            </div>
        );
    }
}

export default Store.withStore(General);
