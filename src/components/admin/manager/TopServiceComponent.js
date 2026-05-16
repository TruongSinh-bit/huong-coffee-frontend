import React, { useState, useEffect } from 'react';
import { getTopSellService } from "../service/RevenueService";

const TopServiceComponent = () => {
    const [topServices, setTopServices] = useState([]);
    const [year, setYear] = useState('current');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopServices = async () => {
            setLoading(true); // Bắt đầu tải
            try {
                const services = await getTopSellService(year);
                setTopServices(services);
                setError(null);
            } catch (err) {
                setError('Failed to fetch top-selling services.');
                setTopServices([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTopServices();
    }, [year]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <>
            <div className="main-content">
                <div className="section-body">
                    <h3 className="section-title text-center">Top Selling Services</h3>
                    <p className="section-lead">List of top-selling services for the selected year.</p>
                    <div className="card-body">
                        <div className="col-12 col-md-2 mb-3 d-flex justify-content-end">
                            <label htmlFor="yearSelect">Select Year:</label>
                            <select
                                id="yearSelect"
                                className="form-control"
                                value={year}
                                onChange={handleYearChange}
                            >
                                <option value="current">Current Year</option>
                                <option value="lastYear">Previous Year</option>
                            </select>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-md">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type Name</th>
                                    <th>Service Name</th>
                                    <th>Service Code</th>
                                    <th>Total Quantity</th>
                                    <th>Price</th>
                                    <th>Total Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {loading && <tr><td colSpan="7">Loading...</td></tr>}
                                {error && <tr><td colSpan="7">{error}</td></tr>}
                                {topServices.length === 0 && !loading && !error && <tr><td colSpan="7">No data available</td></tr>}
                                {topServices.map((service, index) => (
                                    <tr key={service.service_code}>
                                        <td>{index + 1}</td>
                                        <td>{service.type_name}</td>
                                        <td>{service.service_name}</td>
                                        <td>{service.service_code}</td>
                                        <td>{service.total_quantity}</td>
                                        <td>{formatCurrency(service.price)}</td>
                                        <td>{formatCurrency(service.total_amount)}</td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopServiceComponent;
