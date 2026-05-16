import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../manager/ManagerOrder.css';

const FeedbackDetailModal = ({ show, handleClose, feedbackDetails }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Feedback detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {feedbackDetails ? (
                    <>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img src={feedbackDetails.imageFile} style={{width: '50%', height: 'auto'}}/>
                        </div>
                        <table className="table table-striped" style={{marginTop: '20px'}}>
                            <tbody>
                            <tr>
                                <th>Date</th>
                                <td>{formatDate(feedbackDetails.feedbackDate)}</td>
                            </tr>
                            <tr>
                                <th>Code</th>
                                <td>{feedbackDetails.code}</td>
                            </tr>
                            <tr>
                                <th>Creator</th>
                                <td>{feedbackDetails.creator.employee.fullName}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{feedbackDetails.email}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td colSpan="2">{feedbackDetails.content}</td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p className="text-center">No Details Found</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn btn-primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FeedbackDetailModal;