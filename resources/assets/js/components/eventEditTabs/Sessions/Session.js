import React, { Component } from 'react';
import { Panel, Button, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import { getSessionSpeakers } from '../../../api';

import Store from '../../../Store';

class Sessions extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            speakers: [],
            editing: true,
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

    handleChange = (field, event) => {
        const sessionEdit = this.props.store.get('sessionEdit');
        this.props.store.set('sessionEdit')({ ...sessionEdit, [field]: event.target.value });
    }

    onDateChange = (e, picker) => {
        const sessionEdit = this.props.store.get('sessionEdit');
        this.props.store.set('sessionEdit')({
            ...sessionEdit,
            'date_start': picker.startDate.format('YYYY-MM-DD HH:mm:ss'),
            'date_end': picker.endDate.format('YYYY-MM-DD HH:mm:ss')
        });
    }

    editSession = () => {
        // Disable control to allow the component to change (especially waiting for the possible speakers)
        this.setState({ loading: true });

        // Fill store.sessionEdit with this session's info
        this.props.store.set('sessionEdit')(this.props.data);

        // Get a list of all possible speakers and populate the multiselect with this
        // API call blabla .then(...

        // Change the component's layout to editing mode and enable the controls again
        this.setState({ editing: true, loading: false });

        /* TODO:
            -Fill store.sessionEdit with this session's info
            -Change the component's layout to editing mode (in render method)
            -Get a list of all possible speakers and populate the multiselect with this
            -Change the Edit button to a Cancel and Save button (this.cancelEdit() and this.saveSession()) (in render)
        */
    }

    saveSession = event => {
        event.preventDefault();
        // Disable controls while POSTing the updates
        this.setState({ loading: true });

        /* TODO:
            -PUT the changes to the session (not the speakers)
            -POST the speakers, in backend: first delete all speakers for this session, then add the new ones
            -Fill the event in the store.selectedEventSessions with the new information (the information we get from the response's session object)
                (GET selectedEventSessions, find the event in the array and change it, SET selectedEventSessions back to store)
            -Disable editing mode (changing this.state.editing to false should do this)
        */

        // Enable controls again and display the component in its normal non-editing state
        this.setState({ editing: false, loading: false });
    }

    cancelEdit = () => {
        this.setState({ editing: false });
    }

    render() {
        const data = this.props.data;
        const sessionEdit = this.props.store.get('sessionEdit');
        const selectedEvent = this.props.store.get('selectedEvent');
        const loading = this.state.loading || this.props.loading;
        return (
            <Panel>
                <Panel.Body>
                    {!this.state.editing &&
                        <div>
                            {/* TODO: add event media (image) */}
                            {data.date_start &&
                                <div className="session-date">
                                    <span>
                                        <Glyphicon glyph="calendar" />
                                        {" "}{moment(data.date_start).format('dddd, MMMM Do')}
                                    </span>
                                    <span className="margin-left">
                                        <Glyphicon glyph="time" />
                                        {" "}{moment(data.date_start).format('HH:mm')}
                                        {" "}<Glyphicon glyph="arrow-right" />
                                        {" "}{moment(data.date_end).format('HH:mm')}
                                    </span>
                                </div>
                            }

                            <div className="session-name">
                                <h3>{data.name}</h3>
                            </div>

                            <div className="session-speakers">
                                {this.state.speakers.map((speaker, index) => (
                                    <p key={index}>
                                        <Glyphicon glyph="user" />
                                        {" "}{speaker.speakerName}
                                        {/* TODO: clicking these should link to speaker tab and start editing that speaker */}
                                    </p>
                                ))}
                            </div>

                            <div className="session-description">
                                {data.description}
                            </div>

                            <div className="session-buttons">
                                <Button onClick={this.editSession} bsStyle="warning" disabled={loading}>
                                    {loading && <Glyphicon glyph="pencil" />}
                                    {!loading && <Glyphicon glyph="save" />}
                                    {' '}Edit
                                </Button>
                            </div>
                        </div>
                    }


                    {this.state.editing &&
                        <div>
                            <form onSubmit={this.saveSession}>
                                <div className="session-date">
                                    <FormGroup controlId="dates" bsSize="sm">
                                        <DateRangePicker
                                            minDate={selectedEvent.date_start}
                                            maxDate={selectedEvent.date_end}
                                            startDate={sessionEdit.date_start ? moment(sessionEdit.date_start) : moment(selectedEvent.date_start)}
                                            endDate={sessionEdit.date_start ? moment(sessionEdit.date_end) : moment(selectedEvent.date_end)}
                                            timePicker={true}
                                            timePicker24Hour={true}
                                            onApply={this.onDateChange} onHide={this.onDateChange} onHideCalendar={this.onDateChange}
                                        >
                                            <FormControl
                                                type="text"
                                                value={sessionEdit.date_start ? `${sessionEdit.date_start} - ${sessionEdit.date_end}` : 'Click here to set the start and end times'}
                                                disabled={loading}
                                                readOnly={true}
                                                className='date-time-input'
                                            />
                                        </DateRangePicker>
                                    </FormGroup>
                                </div>

                                <div className="session-name">
                                    <FormGroup controlId="name" bsSize="lg">
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={sessionEdit.name || ''}
                                            onChange={e => this.handleChange('name', e)}
                                            disabled={loading}
                                            placeholder="Session Name"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="session-speakers">
                                    {/* TODO: multiselect with all this event's speakers */}
                                </div>

                                <div className="session-description">
                                    <FormGroup controlId="description" bsSize="sm">
                                        <FormControl
                                            componentClass="textarea"
                                            value={sessionEdit.description || ''}
                                            onChange={e => this.handleChange('description', e)}
                                            disabled={loading}
                                            placeholder="Description"
                                        />
                                    </FormGroup>
                                </div>


                                <div className="session-buttons">
                                    <Button onClick={this.cancelEdit} bsStyle="danger" disabled={loading}>
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
                        </div>
                    }
                </Panel.Body>
            </Panel>
        );
    }
}

export default Store.withStore(Sessions);
