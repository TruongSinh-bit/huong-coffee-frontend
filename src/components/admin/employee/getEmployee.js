import axios from "axios";

export const getEmployee = async (employeeId) => {
    if (!employeeId) {
        throw new Error('Invalid employeeId');
    }
    try {
        const response = await axios.get(`http://localhost:8080/api/employees/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employee details:", error);
        throw error;
    }
};
