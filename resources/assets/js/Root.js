import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Authenticate from './containers/Authenticate';

export default class Root extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Authenticate />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
