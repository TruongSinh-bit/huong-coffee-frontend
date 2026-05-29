import React from 'react';
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const ClientLayout = ({ children }) => {
    return (
        <div>
            {/* Navbar cho phần client */}
            <Navbar />

            {/* Nội dung chính của các trang client */}
            <main>
                {children}
            </main>

            {/* Footer cho phần client */}
            <Footer />
        </div>
    );
};

export default ClientLayout;
