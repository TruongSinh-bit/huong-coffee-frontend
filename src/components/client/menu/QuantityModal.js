import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Menu.css';

const QuantityModal = ({ show, handleClose, service, handleConfirm, quantity, setQuantity }) => {
    const handleConfirmClick = () => {
        handleConfirm(quantity);
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="quantity-modal">
            <Modal.Header closeButton>
                <Modal.Title className="modal-title" style={{ color: 'black' }}>Enter Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formQuantity">
                        <Form.Label className="service-label">Tên món : {service?.serviceName}</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)} // Set quantity, default to 1
                            min="1"
                            placeholder="Enter quantity"
                            className="quantity-input"
                            style={{ color: 'black' }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} className="modal-btn">Close</Button>
                <Button variant="primary" onClick={handleConfirmClick} className="modal-btn">Add to Cart</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuantityModal;
