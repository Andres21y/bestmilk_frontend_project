import { createContext, useState, useContext, useMemo, useCallback } from 'react';

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


    // Evitamos re-renders innecesarios en los consumidores del context con useMemo
    const data = useMemo(() => ({
        userData,
        isAuthenticated: !!userData,
        login,
        logout
    }), [userData, login, logout]);

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