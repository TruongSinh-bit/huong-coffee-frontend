export const hasRole = (requiredRole) => {
    const rolesString = localStorage.getItem('roles');
    console.log(rolesString);
    if (!rolesString) return null; // Không có dữ liệu trong localStorage

    try {
        const roles = JSON.parse(rolesString);
        return roles.includes(requiredRole);
    } catch (e) {
        console.error('Lỗi parse JSON từ localStorage:', e);
        return false; // Xử lý lỗi nếu parse không thành công
    }
};

export const isLoggedIn = () => {
    return localStorage.getItem('employeeId') !== null; // Giả sử bạn kiểm tra đăng nhập dựa trên 'employeeId'
};
