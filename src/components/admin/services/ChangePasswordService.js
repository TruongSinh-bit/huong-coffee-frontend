import axios from "axios";

export const changePassword = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/api/change-password", formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("Đổi mật khẩu thành công:", response.data);
        return response.data;
    } catch (e) {
        console.error("Lỗi khi đổi mật khẩu:", e);
        throw e;
    }
}
