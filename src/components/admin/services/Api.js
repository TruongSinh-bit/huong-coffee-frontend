import axios from "axios";

export const login = async (credentials) => {
    try {
        const response = await axios.post("http://localhost:8080/api/login", credentials);
        // const token = response.data.token;
        const { token, authorities } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("authorities", JSON.stringify(response.data.authorities));

        const userId = response.data.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem('roles', JSON.stringify(authorities.map(auth => auth.authority)));

        const employeeId = response.data.id;
        localStorage.setItem("employeeId", employeeId);


        const employeeName = response.data.nameEmpployee;
        localStorage.setItem("employeeName",employeeName);
        console.log("Đăng nhập thành công, token đã được lưu.");
    } catch (e) {
        console.error("Lỗi đăng nhập: " + e);
        throw e;
    }
}
