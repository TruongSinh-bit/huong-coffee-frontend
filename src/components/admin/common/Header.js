import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SellNotification from "../sell-feedback/SellNotification";
import LogoutButton from "../Login/LogoutButton";

const Header = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const notificationRef = useRef(null);
    const userDropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!isUserDropdownOpen);
    };

    const closeDropdowns = () => {
        setDropdownOpen(false);
        setUserDropdownOpen(false);
    };

    const handleSellNotifications = (change) => {
        setNotificationCount((prevCount) => Math.max(0, prevCount + change));
    };

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
            setUserDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const employeeName = localStorage.getItem("employeeName");

    return (
        <div className="main-wrapper main-wrapper-1">
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <ul className="navbar-nav ml-auto">
                    {/* Notifications */}
                    <li className="dropdown dropdown-list-toggle" ref={notificationRef}>
                        <a
                            href="#"
                            onClick={toggleDropdown}
                            className="nav-link notification-toggle nav-link-lg"
                        >
                            <i className="far fa-bell"></i>
                            <span className="badge badge-warning navbar-badge">{notificationCount}</span>
                        </a>
                        <SellNotification
                            onSellNotifications={handleSellNotifications}
                            isDropdownOpen={isDropdownOpen}
                            closeDropdown={closeDropdowns}
                        />
                    </li>

                    {/* User Dropdown */}
                    <li className="dropdown" ref={userDropdownRef}>
                        <a
                            href="#"
                            onClick={toggleUserDropdown}
                            className="nav-link dropdown-toggle nav-link-lg nav-link-user"
                        >
                            <img alt="image" src="/assets/img/avatar/avatar-1.png" className="rounded-circle mr-1" />
                            <div className="d-sm-none d-lg-inline-block"
                                 style={{ fontSize: '0.8rem' }}>{employeeName}</div>
                        </a>
                        <div className={`dropdown-menu dropdown-menu-right ${isUserDropdownOpen ? 'show' : ''}`}>
                            <div className="dropdown-title">Logged in 5 min ago</div>
                            <a href="features-profile.html" className="dropdown-item has-icon">
                                <i className="far fa-user"></i> Profile
                            </a>
                            <a href="features-activities.html" className="dropdown-item has-icon">
                                <i className="fas fa-bolt"></i> Activities
                            </a>
                            <a href="features-settings.html" className="dropdown-item has-icon">
                                <i className="fas fa-cog"></i> Settings
                            </a>
                            <div className="dropdown-divider"></div>
                            <LogoutButton />
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
