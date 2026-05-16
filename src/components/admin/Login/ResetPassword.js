import React, { useState } from "react";
import { resetPassword } from "../services/ResetPasswordService";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token = new URLSearchParams(window.location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError("Please fill in both fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const data = await resetPassword(token, password, confirmPassword);
            setSuccess(data.message);
            setTimeout(() => {
                window.location.href = "/admin/login";
            }, 2000);
        } catch (error) {
            setError("Error resetting password.");
        }
    };

    return (
        <div id="app" className="container mt-5 justify-content-center">
            <div className="row ">
                <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div className="login-brand text-center mb-4">
                        <img src="/assets/img/stisla-fill.svg" alt="logo" width="100" className="shadow-light rounded-circle" />
                    </div>

                    <div className="card card-primary">
                        <div className="card-header">
                            <h4>Reset Password</h4>
                        </div>

                        <div className="card-body">
                            <p className="text-muted">We will send a link to reset your password</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="password">New Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password-confirm">Confirm Password</label>
                                    <input
                                        id="password-confirm"
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                                        Reset Password
                                    </button>
                                </div>

                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
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

export default ResetPassword;
