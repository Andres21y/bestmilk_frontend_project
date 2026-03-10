import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { validateLoginForm } from '../../utils/validation';

export const useLoginForm = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberMe: false,
        isLoading: false,
        errors: {},
    });

    const { email, password, rememberMe, isLoading, errors } = form;

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
            errors: { ...prev.errors, [id]: null }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = validateLoginForm(email, password);

        if (!isValid) {
            setForm(prev => ({ ...prev, errors: validationErrors }));
            toast.error("Please, check error");
            return;
        }

        setForm(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });

            // Guardamos sesión según "Recordarme"
            if (rememberMe) {
                localStorage.setItem("authData", JSON.stringify(response.data));
            } else {
                sessionStorage.setItem("authData", JSON.stringify(response.data));
            }

            login(response.data);
            toast.success(`Welcome ${response.data.user.name}`);
            setTimeout(() => navigate('/home'), 1500);

        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Error de conexión";
            toast.error(errorMsg);
        } finally {
            setForm(prev => ({ ...prev, isLoading: false }));
        }
    };

    return {
        email,
        password,
        rememberMe,
        isLoading,
        errors,
        handleChange,
        handleSubmit
    };
};