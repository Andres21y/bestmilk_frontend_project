import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    // Estado local para almacenar el correo electrónico ingresado por el usuario
    const [email, setEmail] = useState('');

    // Manejador del formulario
    const handleSubmit = async (e) => {

        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        try {
            // Relizaños la petición al backend
            await axios.post(`${import.meta.env.VITE_API_URL_FORGOT}`, { email });

            toast.success('Check your email');

        } catch (error) {
            toast.error('No se pudo enviar el correo');
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h3>Recuperar Contraseña</h3>

            <input
                type="email"
                placeholder="Tu correo"
                onChange={(e) => setEmail(e.target.value)} 
                required
            />

            <button type="submit">Enviar enlace</button>

        </form>
    );
};

export default ForgotPassword;