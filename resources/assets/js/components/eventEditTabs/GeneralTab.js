import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import Store from '../../Store';

class General extends Component {
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

    handleChange = (field, value) => {
        let eventEdit = this.props.store.get('eventEdit');
        this.props.store.set('eventEdit')({ ...eventEdit, [field]: value });
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
                            onChange={e => this.handleChange('name', e.target.value)}
                            disabled={loading}
                            placeholder="Event Name"
                        />
                    </FormGroup>

                    <FormGroup controlId="description" bsSize="sm">
                        <FormControl
                            componentClass="textarea"
                            value={eventEdit.description || ''}
                            onChange={e => this.handleChange('description', e.target.value)}
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
                                /* value={eventEdit.name || ''}
                                onChange={e => this.handleChange('name', e)} */
                                disabled={loading}
                            />
                        </DateRangePicker>
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
