import React from 'react';

const Footer = () => {
    return (
        <div className="main-wrapper main-wrapper-1">
            <footer className="main-footer">
                <div className="footer-left">
                    Copyright &copy; 2018 <div className="bullet"></div> Design By <a href="https://nauval.in/"
                                                                                      target="_blank"
                                                                                      rel="noopener noreferrer">Muhamad
                    Nauval Azhar</a>
                </div>
                <div className="footer-right">
                    {/* Bạn có thể thêm các nội dung khác vào đây nếu cần */}
                </div>
            </footer>
        </div>

    );
};

export default Footer;
