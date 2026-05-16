import axios from "axios";

// Lấy token từ localStorage
const token = localStorage.getItem('token');

export const getAllRevenue = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error('Lỗi lấy tất cả doanh thu:', e);
        return [];
    }
}

export const getMonthlyRevenueInYear = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue/month-in-year', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error('Lỗi lấy doanh thu theo tháng trong năm:', e);
        return [];
    }
}

export const getServiceRevenue = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue/service', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error('Lỗi lấy doanh thu theo dịch vụ:', e);
        return [];
    }
}

export const getRevenueSummary = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error('Lỗi lấy tổng quan doanh thu:', e);
        return [];
    }
}

export const getTopSellService = async (year) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/revenue/top-service`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { year: year || "" }
        });
        return response.data;
    } catch (e) {
        console.error('Lỗi lấy top 10 dịch vụ bán chạy nhất:', e);
        return [];
    }
}

export const getRevenueByDate = async (dateFrom, dateTo) => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue/search', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                dateFrom,
                dateTo
            }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
        throw error;
    }
};
