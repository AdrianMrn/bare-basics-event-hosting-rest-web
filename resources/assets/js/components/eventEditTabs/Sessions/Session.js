import React, { Component } from 'react';
import { Panel, Button, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Select from 'react-select';
import { styles } from 'react-select-bootstrap3';

import { getSessionSpeakers, getEventExtraDetails, deleteSession, updateSession, updateSessionSpeakers } from '../../../api';

import Store from '../../../Store';

class Session extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            editing: false,
            speakers: [],
            possibleSpeakers: [],
            editSpeakers: [],
        }
    }

    componentDidMount = () => {
        this.getSpeakers();
    }

    getSpeakers = () => {
        getSessionSpeakers(this.props.data.id, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                this.setState({
                    speakers: response.data.map(speaker => {
                        return { value: speaker.speaker_id, label: `${speaker.speakerName} - ${speaker.email}` }
                    }),
                    editSpeakers: response.data.map(speaker => { return speaker.speaker_id })
                });
            }
            this.setState({ loading: false });
        });
    }

    handleChange = (field, event) => {
        const sessionEdit = this.props.store.get('sessionEdit');
        this.props.store.set('sessionEdit')({ ...sessionEdit, [field]: event.target.value });
    }

    handleSpeakerChange = speakers => {
        // When the <Select> is changed, fill editSpeakers like this: [1, 5, 10] (each number is a speaker's id)
        this.setState({ editSpeakers: speakers.map(speaker => { return speaker.value }) });
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
        this.props.toggleEditingSession();

        // Fill store.sessionEdit with this session's info
        this.props.store.set('sessionEdit')(this.props.data);

        // Get a list of all possible speakers and populate the multiselect with them
        getEventExtraDetails('speakers', this.props.store.get('selectedEvent').id, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                const s = response.data.map(speaker => {
                    return { value: speaker.id, label: `${speaker.speakerName} - ${speaker.email}` }
                });

                this.setState({ possibleSpeakers: s, editing: true, loading: false });
            }
        });
    }

    saveSession = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const sessionId = this.props.data.id;
        const sessionEdit = this.props.store.get('sessionEdit')
        const sessionSpeakers = this.state.editSpeakers;

        Promise.all([
            updateSession(sessionId, sessionEdit, (error, response) => {
                if (error) {
                    const errorMessages = (error.response.data.message ? [error.response.data.message] : error.response.data)
                    this.props.store.set('errorModal')({
                        showErrorModal: true,
                        errorMessages
                    });
                    this.setState({ loading: false });
                    Promise.reject(error);
                } else {
                    Promise.resolve(true);
                }
            }),
            updateSessionSpeakers(sessionId, { sessionSpeakers }, (error, response) => {
                if (error) {
                    const errorMessages = (error.response.data.message ? [error.response.data.message] : error.response.data)
                    this.props.store.set('errorModal')({
                        showErrorModal: true,
                        errorMessages
                    });
                    this.setState({ loading: false });
                    Promise.reject(error);
                } else {
                    Promise.resolve(true);
                }
            })
        ])
            .then(values => {
                this.setState({ editing: false, loading: false });
                this.props.toggleEditingSession();
                this.props.forceRefresh();
                this.getSpeakers();
            });
    }

    cancelEdit = () => {
        this.setState({ editing: false });
        this.props.toggleEditingSession();
    }

    delete = () => {
        this.setState({ loading: true });
        const id = this.props.data.id
        deleteSession(id, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                this.props.forceRefresh();
                this.props.toggleEditingSession();
                this.setState({ loading: false, editing: false });
            }
        });
    }

    render() {
        const data = this.props.data;
        const sessionEdit = this.props.store.get('sessionEdit');
        const selectedEvent = this.props.store.get('selectedEvent');
        const loading = this.state.loading;

        return (
            <Panel>
                <Panel.Body>
                    {!this.state.editing &&
                        <div>
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

                            {!data.date_start &&
                                <p className="session-date-disclaimer">This session will not show up in the app until it has a start and end hour.</p>
                            }

                            <div className="session-name">
                                <h3>{data.name}</h3>
                            </div>

                            <div className="session-speakers">
                                {this.state.speakers.map((speaker, index) => (
                                    <p key={index}>
                                        <Glyphicon glyph="user" />
                                        {" "}{speaker.label}
                                    </p>
                                ))}
                            </div>

                            <div className="session-description">
                                {data.description}
                            </div>

                            <div className="event-component-buttons">
                                <Button onClick={this.editSession} bsStyle="default" disabled={loading || this.props.disableEdit}>
                                    <Glyphicon glyph="pencil" />
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
                                            opens={'left'}
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
                                    <Select
                                        onChange={this.handleSpeakerChange}
                                        isMulti
                                        isSearchable
                                        isDisabled={loading}
                                        placeholder={this.state.possibleSpeakers.length ? 'Speakers' : 'Create a speaker in the next tab first!'}
                                        closeMenuOnSelect={false}
                                        styles={styles}
                                        defaultValue={this.state.speakers}
                                        options={this.state.possibleSpeakers}
                                    />
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
                        </div>
                    }
                </Panel.Body>
            </Panel>
        );
    }
}

export default Store.withStore(Session);
