import { createContext, useState, useContext } from 'react';

// contexto
const AuthContext = createContext();

// Hook para usar el contexto 
export const useAuth = () => useContext(AuthContext);

// Provider que envuelve la app
export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        return savedUser && savedToken ? { user: JSON.parse(savedUser), token: savedToken } : null;
    });

    const login = (userData) => {
        setUserData(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));
    };

    const logout = () => {
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = !!userData;


    return (
        <AuthContext.Provider value={{ userData, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};