import React, { useState, useEffect } from 'react';
import './ManagerOrder.css';
import { getRevenueByDate } from '../service/RevenueService';

const RevenueByDate = () => {
    const [thisYearRevenue, setThisYearRevenue] = useState(0);
    const [lastYearRevenue, setLastYearRevenue] = useState(0);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [yearPercentageChange, setYearPercentageChange] = useState(0);
    const [error, setError] = useState(null);


    const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRevenueByDate(dateFrom || undefined, dateTo || undefined);

                setThisYearRevenue(data.thisYear);
                setLastYearRevenue(data.lastYear);

                // Calculate percentage change
                const yearChange = calculatePercentageChange(data.thisYear, data.lastYear);
                setYearPercentageChange(yearChange.toFixed(1));
            } catch (error) {
                setError('Không thể lấy dữ liệu doanh thu');
            }
        };

        fetchData();
    }, [dateFrom, dateTo]);

    return (
        <div className="main-content">
            <div className="section-body">
                <h3 className="section-title text-center mt-4">Revenue During Period</h3>
                <div className="container mt-2">
                    <div className="row justify-content-between">
                        <div className="col-md-8">
                            <form className="row">
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="dateFrom">From Date:</label>
                                    <input
                                        type="date"
                                        id="dateFrom"
                                        className="form-control"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="dateTo">To Date:</label>
                                    <input
                                        type="date"
                                        id="dateTo"
                                        className="form-control"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <div className="revenue-card">
                                <h4>Total Revenue: {thisYearRevenue.toLocaleString()} đ</h4>
                                <p>
                                    Change from this time last year: {yearPercentageChange}%{' '}
                                    {yearPercentageChange > 0 ? (
                                        <i className="fas fa-arrow-up text-success"></i>
                                    ) : yearPercentageChange < 0 ? (
                                        <i className="fas fa-arrow-down text-danger"></i>
                                    ) : (
                                        <i className="fas fa-equals text-secondary"></i>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueByDate;
