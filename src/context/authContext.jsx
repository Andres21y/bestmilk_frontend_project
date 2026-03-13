import { createContext, useState, useContext, useCallback, useMemo } from 'react';


// contexto
const AuthContext = createContext();


// Provider que envuelve la app
export const AuthProvider = ({ children }) => {

    // Inicializamos el estado buscando en ambos almacenamientos
    const [userData, setUserData] = useState(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const user = localStorage.getItem('user') || sessionStorage.getItem('user');
        return token && user ? { token, user: JSON.parse(user) } : null;
    });

    const login = useCallback((data, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        storage.setItem('user', JSON.stringify(data.user));
        setUserData(data);
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        sessionStorage.clear();
        setUserData(null);
    }, []);

    const value = useMemo(() => ({
        userData,
        isAuthenticated: !!userData,
        isAdmin: userData?.user?.role === 'admin',
        isActive: userData?.user?.active === true,
        login,
        logout
    }), [userData, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("there is no context");
    return context;
};