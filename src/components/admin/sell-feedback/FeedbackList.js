    import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate, Link } from 'react-router-dom';
    import * as feedbackService from "../service/FeedbackService";
    import FeedbackDetailModal from "./FeedbackDetailModal";

    const FeedbackList = ({ show, handleClose, feedbackDetails }) => {
        let { date } = useParams(); // Lấy giá trị `date` từ URL
        const [feedbacks, setFeedbacks] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage] = useState(10);
        const navigate = useNavigate();
        const [showModal, setShowModal] = useState(false);
        const [selectedFeedback, setSelectedFeedback] = useState(null);
        const nameEmployee = localStorage.getItem("employeeName");




        useEffect(() => {
            if (date) {
                getAllFeedbackByDate(date);
            } else {
                getAllFeedback();
            }
        }, [date]);

        const getAllFeedback = async () => {
            try {
                const feedbackList = await feedbackService.getAllFeedback();
                setFeedbacks(feedbackList);
            } catch (e) {
                console.error("Error feedback list", e);
            }
        };

        const getAllFeedbackByDate = async (date) => {
            try {
                const feedbackList = await feedbackService.getAllFeedbackByDate(date);
                setFeedbacks(feedbackList);
            } catch (e) {
                console.error("Error feedback list", e);
            }
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const handleDateChange = (e) => {
            const selectedDate = e.target.value;
            navigate(`/admin/feedback/${selectedDate}`);
        };

        // Tính toán dữ liệu phân trang
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentFeedbacks = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

        const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        };

        const clearDate = () => {
            navigate("/admin/feedback");
        };

        const handleShowModal = (feedback) => {
            setSelectedFeedback(feedback);
            setShowModal(true);
        };
        const handleCloseModal = () => {
            setSelectedFeedback(null);
            setShowModal(false);
        };

        return (
            <>
                <div className="main-content">
                    <div className="section-body">
                        <h2 className="section-title">Feedback</h2>
                        <div className="card-header d-flex align-items-center">
                            <label htmlFor="date" className="me-2">Date</label>
                            <input
                                type="date"
                                value={date || ''}
                                onChange={handleDateChange}
                                className="form-control me-2"
                                style={{ width: '200px' }}
                            />


                            {/* Nút hiển thị tất cả */}
                            <button className="btn btn-primary me-2"
                                    onClick={clearDate}
                                >
                                Show all
                            </button>
                        </div>

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Serial</th>
                                        <th>Code</th>
                                        <th>Date</th>
                                        <th>Creator</th>
                                        <th>Email</th>
                                        <th>Content</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {feedbacks.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">There is no feedback at this time</td>
                                        </tr>
                                    ) : (
                                        currentFeedbacks.map((item, index) => (
                                            <tr key={item.feedbackId}>
                                                <td>{indexOfFirstItem + index + 1}</td>
                                                <td>{item.code}</td>
                                                <td>{formatDate(item.feedbackDate)}</td>
                                                <td>{nameEmployee}</td>
                                                <td>{item.email}</td>
                                                <td>{item.content}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => handleShowModal(item)}
                                                        >
                                                        <i className="fas fa-info-circle"></i>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Phân trang */}
                        <div className="card-footer text-right">
                            <nav className="d-inline-block">
                                <ul className="pagination mb-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <Link
                                            className="page-link"
                                            to="#"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            <i className="fas fa-chevron-left"></i>
                                        </Link>
                                    </li>
                                    {[...Array(totalPages)].map((_, pageIndex) => (
                                        <li
                                            key={pageIndex + 1}
                                            className={`page-item ${currentPage === pageIndex + 1 ? 'active' : ''}`}
                                        >
                                            <Link
                                                className="page-link"
                                                to="#"
                                                onClick={() => handlePageChange(pageIndex + 1)}
                                            >
                                                {pageIndex + 1}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <Link
                                            className="page-link"
                                            to="#"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            <i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <FeedbackDetailModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    feedbackDetails={selectedFeedback}
                />
            </>

        );
    }

    export default FeedbackList;
