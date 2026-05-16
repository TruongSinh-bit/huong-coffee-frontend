import React, {useEffect, useState} from 'react';
import ApexCharts from 'react-apexcharts';
import {getServiceRevenue} from "../service/RevenueService";

const ExpensesChart = () => {
    const [chartData, setChartData] = useState({
        thisYearSeries: [],
        lastYearSeries: [],
        labels: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getServiceRevenue();

            // Tính tổng doanh thu cho từng năm
            const totalRevenueThisYear = data.thisYear.reduce((sum, item) => sum + item.totalRevenue, 0);
            const totalRevenueLastYear = data.lastYear.reduce((sum, item) => sum + item.totalRevenue, 0);

            // Chuyển đổi dữ liệu thành % so với tổng doanh thu và làm tròn đến 2 chữ số
            const thisYearSeries = data.thisYear.map(item => parseFloat(((item.totalRevenue / totalRevenueThisYear) * 100).toFixed(2)));
            const lastYearSeries = data.lastYear.map(item => parseFloat(((item.totalRevenue / totalRevenueLastYear) * 100).toFixed(2)));

            // Lấy danh sách tên các dịch vụ
            const labels = data.thisYear.map(item => item.serviceName);

            // Cập nhật dữ liệu cho biểu đồ
            setChartData({
                thisYearSeries: thisYearSeries,
                lastYearSeries: lastYearSeries,
                labels: labels
            });
        };

        fetchData();
    }, []);

    const options = (title) => ({
        chart: {
            type: 'donut',
        },
        labels: chartData.labels,
        title: {
            text: title,
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 'bold'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true
                        },
                        value: {
                            show: true,
                            formatter: function (val) {
                                // Hiển thị giá trị phần trăm với 2 chữ số
                                return parseFloat(val).toFixed(2) + '%';
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                // Hiển thị tổng phần trăm với 2 chữ số
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            formatter: function (val, opts) {
                return val + ": " + (opts.w.globals.series[opts.seriesIndex] || 0).toFixed(2) + "%";
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    return (

        <div className="main-content">
            <div className="section-body">
                <h3 className="section-title text-center">Revenue by Service Type</h3>
                <div className="section-body" style={{display: 'flex', justifyContent: 'space-around'}}>
                    {/* Biểu đồ năm trước */}
                    <div id="lastYear-chart" style={{width: '45%', height: '400px'}}>
                        <ApexCharts
                            options={options('last year\'s revenue (%)')}
                            series={chartData.lastYearSeries}
                            type="donut"
                            width="100%"
                            height="100%"
                        />
                    </div>

                    {/* Biểu đồ năm nay */}
                    <div id="thisYear-chart" style={{width: '45%', height: '400px'}}>
                        <ApexCharts
                            options={options('this year\'s revenue (%)')}
                            series={chartData.thisYearSeries}
                            type="donut"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpensesChart;
