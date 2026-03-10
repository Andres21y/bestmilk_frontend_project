import { createContext, useState, useContext, useMemo, useCallback } from 'react';
import axios from 'axios';

// contexto
const AuthContext = createContext();

// Provider que envuelve la app
export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        return savedUser && savedToken ? { user: JSON.parse(savedUser), token: savedToken } : null;
    });

    const login = useCallback((data) => {
        setUserData(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }, []);

    const logout = useCallback(() => {
        setUserData(null);
        localStorage.clear();
    }, []);

    const signup = useCallback(async (formData) => {
        
        try {
            // Hacemos la petición al backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, formData);
            
            // OPCIONAL: Si tu backend loguea al usuario automáticamente tras registrarse:
            if (response.data.token && response.data.user) {
                login(response.data);
            }

            return response.data; // Retornamos la respuesta para que el componente la maneje
        } catch (error) {
            // Re-lanzamos el error para que el componente Signup.jsx lo capture y muestre el Toast
            throw error;
        }
    }, [login]);

    // Evitamos re-renders innecesarios en los consumidores del context con useMemo
    const data = useMemo(() => ({
        userData,
        isAuthenticated: !!userData,
        login,
        logout,
        signup 
    }), [userData, login, logout, signup]);


    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>)
};

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("there is no context");
    return context;
};