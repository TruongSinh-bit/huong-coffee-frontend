import React, { useState } from 'react';
import { forgotPassword } from "../services/ForgotPassword";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await forgotPassword(email);
        if (data) {
            setMessage("Password reset link has been sent to your email.");
            setError('');
        } else {
            setError("Failed to send password reset link. Please try again.");
            setMessage('');
        }
    };

    return (
        <div id="app">
            <section className="section">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                            <div className="login-brand">
                                <img src="/assets/img/stisla-fill.svg" alt="logo" width="100" className="shadow-light rounded-circle" />
                            </div>

                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4>Forgot Password</h4>
                                </div>

                                <div className="card-body">
                                    <p className="text-muted">We will send a link to reset your password</p>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                autoFocus
                                            />
                                        </div>

                                        {/* Di chuyển message và error xuống đây */}
                                        {message && <div className="alert alert-success mt-3">{message}</div>}
                                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                                Forgot Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="simple-footer">
                                CodeGym 2024
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword;
