
import axios from 'axios';

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post("http://localhost:8080/api/forgot-password", { email });
        return { data: response.data, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data || 'Error sending reset email' };
    }
};
