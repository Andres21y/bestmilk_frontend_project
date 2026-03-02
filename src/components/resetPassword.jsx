import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams(); // Captura el token de la URL
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL_RESET}/${token}`, { password });
            toast.success('Éxito', 'Contraseña cambiada', 'success');
            
            navigate('/'); // Volver al login
        } catch (error) {
            toast.success('Error', 'Token expirado o inválido', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Ingresa tu nueva contraseña</h3>
            <input type="password" placeholder="Nueva contraseña" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Actualizar</button>
        </form>
    );
};
export default ResetPassword;