import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

import Store from '../Store';

class ErrorModal extends Component {
    handleClose = () => {
        this.props.store.set('errorModal')({
            showErrorModal: false,
            errorMessages: []
        });
    }

    render() {
        const errorModal = this.props.store.get('errorModal');
        const { showErrorModal, errorMessages } = errorModal;
        return (
            <Modal show={showErrorModal} onHide={this.handleClose}>
                <Modal.Body>
                    {!!errorMessages &&
                        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                            {errorMessages.map((data, index) => {
                                return <h4 key={index}>{data}</h4>
                            })}
                            <p>
                                <Button onClick={this.handleClose}>Close</Button>
                            </p>
                        </Alert>
                    }

                    {!errorMessages &&
                        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                            <h4>Oops! We ran into an error we couldn't handle, sorry!</h4>
                            <p>
                                <Button onClick={this.handleClose}>Close</Button>
                            </p>
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

export default Store.withStore(ErrorModal);
