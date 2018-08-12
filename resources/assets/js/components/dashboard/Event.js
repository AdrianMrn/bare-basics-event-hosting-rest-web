import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';

export default class Event extends Component {
    render() {
        let { data } = this.props;
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">
                            {data.name}
                            <Button className='pull-right' bsStyle='default' onClick={() => this.props.navigateToEventEdit(data.slug)}>Edit</Button>
                        </Panel.Title>
                        {data.date_start && <div>
                            <span>{data.date_start}</span> - <span>{data.date_end}</span> {/* TODO: display human readable dates */}
                        </div>}
                    </Panel.Heading>
                    <Panel.Body>
                        {/* TODO: insert event logo */}
                        {data.description}
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
