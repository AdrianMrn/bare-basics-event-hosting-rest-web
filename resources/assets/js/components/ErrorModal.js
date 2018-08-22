import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

import Store from '../Store';

class ErrorModal extends Component {
    handleClose = () => {
        this.props.store.set('errorModal')(Store.errorModal);
    }

    render() {
        const errorModal = this.props.store.get('errorModal');
        const { showErrorModal, isDeletePrompt, isAuthError } = errorModal;
        return (
            <Modal show={showErrorModal} onHide={this.handleClose}>
                <Modal.Body>
                    {isDeletePrompt &&
                        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                            <h4>Are you sure want to delete this?</h4>
                            <p>
                                <Button /* TODO: onClick... */ bsStyle="danger">Yes</Button>
                                <span> or </span>
                                <Button onClick={this.handleDismiss}>Hide Alert</Button>
                            </p>
                        </Alert>
                    }
                    {!isDeletePrompt &&
                        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                            <h4>Oops! We ran into an error we couldn't deal with, sorry!</h4>
                            <p>
                                <Button onClick={this.handleClose}>Close</Button>
                            </p>
                        </Alert>
                    }
                    {!isDeletePrompt &&
                        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                            <h4>Oops! We ran into an error we couldn't deal with, sorry!</h4>
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
