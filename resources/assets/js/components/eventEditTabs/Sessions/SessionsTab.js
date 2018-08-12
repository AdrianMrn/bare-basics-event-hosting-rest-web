import React, { Component } from 'react';
import { Button, Glyphicon, FormGroup, FormControl } from "react-bootstrap";

import Store from '../../../Store';

import Session from './Session';

class Sessions extends Component {
    validateForm() {
        //return this.props.store.get('email').length > 0 && this.props.store.get('password').length > 0;
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <div className="y-padding">
                    <Button bsStyle="info" onClick={this.createEvent} disabled={this.props.loading}>
                        <span>
                            {this.props.loading &&
                                <Glyphicon glyph="refresh" />
                            }
                            {!this.props.loading &&
                                <Glyphicon glyph="plus" />
                            }
                            {" "}Create a session
                        </span>
                    </Button>
                </div>
                <div className="y-padding">
                    {this.props.loading && <div className="lds-dual-ring"></div>}
                    {store.state.selectedEventSessions.map((data, index) => (
                        <Session data={data} key={index} />
                    ))}
                </div>

            </div>
        );
    }
}

export default Store.withStore(Sessions);
