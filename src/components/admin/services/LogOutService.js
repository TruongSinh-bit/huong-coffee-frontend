import axios from 'axios';

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/logout', {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        throw error;
    }
};

