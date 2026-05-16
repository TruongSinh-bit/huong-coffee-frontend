import axios from "axios";

const token = localStorage.getItem('token');

export const getAllActiveNews = async (page = 0, size = 6) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/news/active?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.error("Lỗi lấy tin tức: " + e);
        return { content: [], totalPages: 0 };
    }
};

export const getAllNews = async (page = 0, size = 6) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/news?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.error("Lỗi lấy ra tất cả tin tức: " + e);
        return { content: [], totalPages: 0 };
    }
};

export const restoreService = async (newsId) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/news/${newsId}/restore`);
        return response.data;
    } catch (error) {
        console.error("Error restoring news:", error);
        throw error;
    }
};

export const getNewsById = async (newsId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/news/${newsId}`);
        return response.data;
    } catch (e) {
        console.error("Lỗi lấy chi tiết tin tức: " + e);
        return null;
    }
}

export const deleteHardNews = async (newsId) => {
    try {
        await axios.delete(`http://localhost:8080/api/news/hard-delete/${newsId}`);
    } catch (e) {
        console.error("Lỗi: " + e);
        return null;
    }
};

export const deleteSoftNews = async (newsId) => {
    try {
        await axios.put(`http://localhost:8080/api/news/soft-delete/${newsId}`);
    } catch (e) {
        console.error("Lỗi: " + e);
        return null;
    }
};

export const updateNews = async (newsId, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/news/update/${newsId}`, updatedData);
        return response.data;
    } catch (e) {
        console.error("Lỗi cập nhật tin tức: " + e);
        return null;
    }
};

export const getTopViewedNews = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/news/top-viewed");
        return response.data;
    } catch (e) {
        console.error("Lỗi lấy tin tức có lượt xem nhiều nhất: " + e);
        return [];
    }
}

export const incrementViewCount = async (newsId) => {
    try {
        await axios.put(`http://localhost:8080/api/news/${newsId}/increase-views`);
    } catch (e) {
        console.error("Lỗi tăng lượt xem: " + e);
    }
};

export const searchNewsByTitle = async (title) => {
    try {
        const response = await axios.get("http://localhost:8080/api/news/search?title=" + title);
        return response.data;
    } catch (e) {
        console.error("Lỗi tìm kiếm title tin tức");
        return [];
    }
}