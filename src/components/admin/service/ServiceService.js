import axios from "axios";

export const getAllServices = async (page = 0, size = 10) => {
    try {
        const response = await axios.get('http://localhost:8080/api/services/all-services', {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy tất cả sản phẩm:", error);
        return null;
    }
};

export const restoreService = async (serviceId) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/services/${serviceId}/restore`);
        return response.data;
    } catch (error) {
        console.error("Error restoring service:", error);
        throw error;
    }
};

export const getAllServicesIdDesc = async (page = 0, size = 10) => {
    try {
        const response = await axios.get('http://localhost:8080/api/services/all-services-sorted', {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy tất cả sản phẩm:", error);
        return null;
    }
};
export const getAllServicesIdDescNotDeleted = async (page = 0, size = 10) => {
    try {
        const response = await axios.get('http://localhost:8080/api/services/all-services-sorted-not-deleted', {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy tất cả sản phẩm:", error);
        return null;
    }
};

export const getServiceDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/services/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy chi tiết sản phẩm:', error);
        throw error;
    }
};

export const createService = async (service) => {
    try {
        const response = await axios.post('http://localhost:8080/api/services/add', service);
        return response.data;
    } catch (error) {
        console.error('Lỗi tạo sản phẩm:', error);
        throw error;
    }
};

export const addService = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/services', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with error:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};
export const getServiceTypes = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/services/list-service-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching service types:', error);
    }
};
export const updateService = async (serviceId, service) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/services/update/${serviceId}`, service);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with error:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};
export const deleteService = async (serviceId) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/services/delete/${serviceId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with error:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};