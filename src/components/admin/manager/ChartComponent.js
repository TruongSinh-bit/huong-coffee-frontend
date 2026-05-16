import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    registerables as registerablesJS
} from "chart.js";
import {Line} from "react-chartjs-2";
import {getMonthlyRevenueInYear} from "../service/RevenueService";
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(...registerablesJS);

const monthNames = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const ChartComponent = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const apiData = await getMonthlyRevenueInYear(); // Gọi API để lấy dữ liệu doanh thu

            const thisYearData = apiData.thisYear.map(item => item.total_revenue); // Lấy doanh thu của năm nay
            const lastYearData = apiData.lastYear.map(item => item.total_revenue); // Lấy doanh thu của năm trước
            const labels = monthNames; // Các nhãn tháng từ tháng 1 đến tháng 12

            // Cập nhật dữ liệu cho biểu đồ
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'This Year Sales',
                        data: thisYearData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Last Year Sales',
                        data: lastYearData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.4
                    }
                ],
            });
        };

        fetchData(); // Gọi hàm fetchData khi component được render
    }, []); // Chỉ gọi API một lần khi component mount

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Comparison: This Year vs Last Year',
            },
        },
        elements: {
            line: {
                tension: 0.4, // Điều chỉnh độ cong của đường
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        // Chuyển đổi giá trị thành định dạng tiền VNĐ
                        return value.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
                    }
                }
            }
        }
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <h3 className="section-title text-center">Monthly Revenue Summary</h3>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h4>Sales Data</h4>
                            </div>
                            <div className="card-body">
                                <Line data={chartData} options={options}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
