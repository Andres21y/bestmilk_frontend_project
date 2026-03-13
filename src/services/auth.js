import api from './api';

export const authService = {
    login: async (credentials) => {
        const { data } = await api.post('/login', credentials);
        return data; // { token, user: { name, role, active... } }
    },
    signup: async (userData) => {
        const { data } = await api.post('/signup', userData);
        return data;
    }
};