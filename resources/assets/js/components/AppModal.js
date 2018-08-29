import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

import Store from '../Store';

class AppModal extends Component {
    handleClose = () => {
        this.props.store.set('appModal')({
            showAppModal: false,
        });
    }

    render() {
        const appModal = this.props.store.get('appModal');
        const { showAppModal } = appModal;
        return (
            <Modal show={showAppModal} onHide={this.handleClose}>
                <Modal.Body>
                    <Alert bsStyle={'info'} onDismiss={this.handleDismiss}>
                        <h4>Edit your profile with the app!</h4>
                        <a href="https://play.google.com/store/apps/details?id=com.bbehapp" target="_blank"><img src={'/images/google-play.png'} className={'modal-google-play'} /></a>
                        <p>
                            <Button onClick={this.handleClose}>Close</Button>
                        </p>
                    </Alert>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Store.withStore(AppModal);
