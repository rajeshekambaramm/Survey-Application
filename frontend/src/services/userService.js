import api from "../api/axios";

export const getProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/auth/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};