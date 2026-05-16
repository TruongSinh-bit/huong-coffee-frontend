import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as logoutService from "../services/LogOutService";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutService.logout();
            localStorage.clear();
            navigate('/admin/login');
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
        }
    };

    return (
        <button
            className="dropdown-item has-icon text-danger"
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
        >
            <i className="fas fa-sign-out-alt" style={{ marginRight: '10px', fontSize: '14px' }}></i>
            Logout
        </button>
    );
};

export default LogoutButton;
