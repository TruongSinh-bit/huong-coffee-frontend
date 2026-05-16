export const AdminRoute = (requiredRole) => {
    const rolesString = localStorage.getItem('authorities');
    console.log(rolesString);
    if (!rolesString) return false; // Không có dữ liệu trong localStorage

    try {
        const roles = JSON.parse(rolesString);
        return roles.includes(requiredRole);
    } catch (e) {
        console.error('Lỗi parse JSON từ localStorage:', e);
        return false; // Xử lý lỗi nếu parse không thành công
    }
};