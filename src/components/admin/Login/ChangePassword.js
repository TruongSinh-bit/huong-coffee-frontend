import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from "../services/ChangePasswordService";

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirmation password do not match.");
            return;
        }

        try {
            const responseMessage = await changePassword(formData);
            setMessage("Password updated successfully!");
            setTimeout(() => {
                navigate('/admin/login');
            }, 3000);
        } catch (err) {
            setError("Password change failed, please try again.");
        }
    };

    return (
        <div id="app" className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="login-brand text-center mb-4">
                        <img src="/assets/img/stisla-fill.svg" alt="logo" width="100" className="shadow-light rounded-circle" />
                    </div>

                    <div className="card card-primary">
                        <div className="card-header">
                            <h4>Change Password</h4>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">User Name</label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input
                                        id="currentPassword"
                                        type="password"
                                        name="currentPassword"
                                        className="form-control"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        id="newPassword"
                                        type="password"
                                        name="newPassword"
                                        className="form-control"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                                        Change Password
                                    </button>
                                </div>

                                {error && <div className="alert alert-danger">{error}</div>}
                                {message && <div className="alert alert-success">{message}</div>}
                            </form>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        CodeGym 2024
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
