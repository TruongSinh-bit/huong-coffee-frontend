// src/components/admin/AdminLayout.js
import React from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import OrderList from "./manager/OrderList";


const AdminLayout = ({ children }) => {
    return (
        <div>
            {/* Header cho phần admin */}
            <Header />
            {/* Nội dung chính của các trang admin */}
            <div>
                {children}
            </div>
            {/*<Footer />*/}
        </div>
    );
};

export default AdminLayout;
