import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import moment from 'moment';

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
                            <span>{moment(data.date_start).format('Do MMM')}</span> - <span>{moment(data.date_end).format('Do MMM YYYY')}</span>
                        </div>}
                    </Panel.Heading>
                    <Panel.Body>
                        {(!!data.imageUrl) &&
                            <div className='image-display-list'>
                                <img src={data.imageUrl} />
                            </div>
                        }
                        {data.description}
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
