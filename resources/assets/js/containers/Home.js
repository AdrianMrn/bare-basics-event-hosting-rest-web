import React, { Component } from 'react';
import { Button, Glyphicon, PageHeader } from 'react-bootstrap';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <PageHeader>
                            Home
                        </PageHeader>
                        <div className="y-padding">
                            kek home
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
