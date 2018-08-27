import React, { Component } from 'react';
import { Button, Glyphicon, FormGroup, FormControl } from "react-bootstrap";

import Store from '../../../Store';

import { createNewSponsor } from '../../../api';

import Sponsor from './Sponsor';

class Sponsors extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            editingSponsor: false,
        }
    }

    createSponsor = () => {
        this.setState({ loading: true });

        let store = this.props.store;
        const selectedEvent = store.get('selectedEvent');
        createNewSponsor(selectedEvent.id, (error, response) => {
            if (error) {
                this.props.store.set('errorModal')({
                    showErrorModal: true,
                });
            } else {
                const sponsors = store.get('selectedEventSponsors');
                sponsors.push(response.data);
                store.set('selectedEventSponsors')(sponsors);
            }
            this.setState({ loading: false });
            this.scrollToBottom();
        });
    }

    toggleEditingSponsor = () => {
        this.setState({ editingSponsor: !this.state.editingSponsor });
    }

    scrollToBottom() {
        this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        let store = this.props.store;
        return (
            <div>
                <div className="y-padding">
                    <Button bsStyle="info" onClick={this.createSponsor} disabled={this.props.loading || this.state.loading || this.state.editingSponsor}>
                        <span>
                            {this.props.loading &&
                                <Glyphicon glyph="refresh" />
                            }
                            {!this.props.loading &&
                                <Glyphicon glyph="plus" />
                            }
                            {" "}Create a Sponsor
                        </span>
                    </Button>
                </div>

                {this.props.loading && <div className="lds-dual-ring"></div>}
                {store.get('selectedEventSponsors').map((data, index) => (
                    <Sponsor disableEdit={this.state.editingSponsor} data={data} key={data.id} forceRefresh={this.props.forceRefresh} toggleEditingSponsor={this.toggleEditingSponsor} />
                ))}

                <div ref={scrollTarget => { this.scrollTarget = scrollTarget; }} />
            </div>
        );
    }
}

export default Store.withStore(Sponsors);
