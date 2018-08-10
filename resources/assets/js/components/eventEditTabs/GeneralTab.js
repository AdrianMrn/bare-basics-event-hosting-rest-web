import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Checkbox } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import Store from '../../Store';

class General extends Component {
    constructor() {
        super();

        this.state = {
            addressInput: '',
        }
    }

    validateForm() {
        //return this.props.store.get('email').length > 0 && this.props.store.get('password').length > 0;
        return true;
    }

    componentDidMount = () => {
        // TODO: fill store's eventEdit with data from selectedEvent
        let selectedEvent = this.props.store.get('selectedEvent');
        this.props.store.set('eventEdit')(selectedEvent);
    }

    onDateRangeEvent = (e, picker) => {
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
        // TODO: autocomplete address and set it in store: address, city & country
    }

    render() {
        let store = this.props.store;
        let eventEdit = store.get('eventEdit');
        let loading = this.props.loading;
        return (
            <div>
                <form onSubmit={this.props.handleSave}>
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
                            onApply={this.onDateRangeEvent} onHide={this.onDateRangeEvent} onHideCalendar={this.onDateRangeEvent}
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
                        <Button bsStyle="primary" disabled={!this.validateForm() || loading} type="submit">Save</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Store.withStore(General);
