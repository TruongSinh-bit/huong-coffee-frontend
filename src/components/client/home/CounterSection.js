import React, { useState, useEffect } from 'react';

const CounterSection = () => {
    // State cho từng số liệu
    const [coffeeBranches, setCoffeeBranches] = useState(0);
    const [awards, setAwards] = useState(0);
    const [happyCustomers, setHappyCustomers] = useState(0);
    const [staff, setStaff] = useState(0);

    // Hàm để thực hiện đếm số
    const countUp = (start, end, setter, duration) => {
        let current = start;
        const increment = Math.ceil((end - start) / (duration / 100)); // Tính toán mức tăng
        const interval = setInterval(() => {
            current += increment;
            if (current >= end) {
                clearInterval(interval);
                setter(end); // Đặt giá trị cuối cùng khi đạt tới mục tiêu
            } else {
                setter(current);
            }
        }, 200); // Cập nhật mỗi 100ms
    };

    // Sử dụng useEffect để chạy hiệu ứng khi component được render
    useEffect(() => {
        countUp(0, 100, setCoffeeBranches, 2000); // Coffee Branches
        countUp(0, 85, setAwards, 2000);          // Awards
        countUp(0, 10567, setHappyCustomers, 2000); // Happy Customers
        countUp(0, 900, setStaff, 2000);          // Staff
    }, []);

    return (
        <section
            className="ftco-counter ftco-bg-dark img"
            id="section-counter"
            style={{ backgroundImage: 'url(images/bg_2.jpg)' }}
            data-stellar-background-ratio="0.5"
        >
            <div className="overlay"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number">{coffeeBranches}</strong>
                                        <span>Coffee Branches</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number">{awards}</strong>
                                        <span>Number of Awards</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number">{happyCustomers}</strong>
                                        <span>Happy Customers</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number">{staff}</strong>
                                        <span>Staff</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CounterSection;
