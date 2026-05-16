export const resetPassword = async (token, password, confirmPassword) => {
    try {
        const response = await fetch(`http://localhost:8080/api/reset-password?token=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: password, confirmPassword }),
        });

        const responseText = await response.text();

        if (!response.ok) {
            try {
                const data = JSON.parse(responseText);
                console.error("Error Response:", data);
                throw new Error(data.message || "Failed to reset password");
            } catch (e) {
                console.error("Error Response:", responseText);
                throw new Error("Failed to reset password with unexpected response format");
            }
        }

        // Nếu phản hồi là thành công, trả về văn bản
        return { message: responseText };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
