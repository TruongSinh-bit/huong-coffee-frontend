import axios from "axios";

export const getAllOrders = async (codeSearch, dateSearch, page = 0, size = 10) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get('http://localhost:8080/api/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                codeSearch: codeSearch || '',
                dateSearch: dateSearch || '',
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error("không tìm thấy đơn hàng:", error);
        return null;
    }
};

export const getOrderDetails = async (id) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:8080/api/orders/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('ko tìm thấy chi tiết đơn hàng:', error);
        throw error;
    }
};


