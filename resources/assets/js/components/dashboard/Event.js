import React, { Component } from 'react';

import Store from '../../Store';

import { Panel } from "react-bootstrap";

class Event extends Component {
    render() {
        let { data, store } = this.props;
        console.log(data);
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{data.name}</Panel.Title>
                        {data.date_start} -  {data.date_end} {/* TODO: convert to human readable date */}
                    </Panel.Heading>
                    <Panel.Body>
                        {/* TODO: insert event logo */}
                        {data.description}
                        {/* TODO: insert EDIT button */}
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default Store.withStore(Event);
