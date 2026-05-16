import axios from "axios";

export const getAllFeedbackByDate = async (date) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/feedbacks/${date}`);
        return res.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getAllFeedback = async () => {
    try {
        let res = await axios.get(`http://localhost:8080/api/feedbacks`);
        return res.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}