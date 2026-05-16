import axios from 'axios';
import {toast} from "react-toastify";

const BASE_URL = 'http://localhost:8080/api/tables';
const token = localStorage.getItem("token");

export const getAllTables = async (code, on, page = 0, size = 10, includeDeleted = false) => {
    try {
        const response = await axios.get('http://localhost:8080/api/tables', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                code: code || '',
                on: on !== undefined ? on : null,
                page: page,
                size: size,
                includeDeleted: includeDeleted
            }
        });
        return response.data;
    } catch (error) {
        console.error("Không tìm thấy bàn:", error);
        return null;
    }
};
export const restoreTable = async (tableId) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/tables/${tableId}/restore`);
        return response.data;
    } catch (error) {
        console.error('Error restoring table:', error);
        toast.error('Failed to restore table.');
        throw error; // Để bắt lỗi phía gọi hàm nếu cần
    }
};
export const getAllIncludingDeleted = (code, page = 0, size = 10) => {
    return axios.get(`${BASE_URL}/all-including-deleted`, { params: { code, page, size } }).then(response => response.data);
};

export const getTableByCode = async (code) => {
    try {
        const response = await axios.get(`/api/tables/code/${code}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching table by code:', error);
        throw error;
    }
};


export const searchTableById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 'Not found!';
        } else {
            console.error('Error searching table by ID:', error);
            throw error;
        }
    }
};

export const getTableById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy bàn theo ID:', error);
        throw error;
    }
};

export const updateTable = async (id, table) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, table);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật bảng:', error);
        throw error;
    }
};

export const createTable = async (table) => {
    try {
        const response = await axios.post('http://localhost:8080/api/tables/create', table);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo bàn:', error);
        throw error;
    }
};
export const checkCodeExists = async (code) => {
    try {
        const response = await axios.get(`${BASE_URL}/checkCode/${code}`);
        return response.data;
    } catch (error) {
        throw new Error('Lỗi khi kiểm tra mã code.');
    }
};


export const deleteTable = async (id, type = 'soft') => {
    try {
        const url = type === 'hard' ? `${BASE_URL}/hard/${id}` : `${BASE_URL}/soft/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error('Lỗi khi xóa bảng:', error);
        throw error;
    }
};

