import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Validation schema for the form
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    feedback: Yup.string().required('Feedback is required')
});

const FeedbackModal = ({ show, onHide, onSubmit }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: '#007bff' }}>Phản hồi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ email: '', feedback: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onSubmit(values); // Gửi dữ liệu phản hồi lên ListBillDetails
                        onHide(); // Đóng modal sau khi submit
                    }}
                >
                    {() => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Nhập email"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="feedback" className="form-label">Phản hồi:</label>
                                <Field
                                    as="textarea"
                                    id="feedback"
                                    name="feedback"
                                    className="form-control"
                                    rows={4}
                                    placeholder="Nhập phản hồi"
                                />
                                <ErrorMessage name="feedback" component="div" className="text-danger" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
                <Button variant="primary" type="submit">
                    Gửi phản hồi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FeedbackModal;
