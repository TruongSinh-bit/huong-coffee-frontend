export const hasRole = (requiredRole) => {
    const rolesString = localStorage.getItem('roles');
    if (!rolesString) return null; // Không có dữ liệu trong localStorage

    try {
        const roles = JSON.parse(rolesString);
        if (roles.includes('ROLE_ADMIN')) return true;
        return roles.includes(requiredRole);
    } catch (e) {
        console.error('Lỗi parse JSON từ localStorage:', e);
        return false; // Xử lý lỗi nếu parse không thành công
    }
};

export const isLoggedIn = () => {
    return localStorage.getItem('employeeId') !== null;
};
