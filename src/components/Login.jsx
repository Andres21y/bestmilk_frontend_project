import { useState } from 'react';
import axios from 'axios';
import styles from '../css/login.module.css'
import { MdEmail, MdLock } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';

const Login = () => {

    const { login } = useAuth();


    const navigate = useNavigate();

    // Estado para los inputs y carga
    const [form, setForm] = useState({
        email: '',
        password: '',
        isLoading: false,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setForm({ ...form, isLoading: true })

        try {
            // Hacemos la petición al backend 
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email: form.email,
                password: form.password
            });

            login(response.data);

            toast.success(`Welcome ${response.data.user.name}`);

            setTimeout(() => { navigate('/home'); }, 2000);

        } catch (error) {
            if (error.response) {
                // El servidor respondió con un error (400, 401, 500)
                console.log("Error de respuesta:", error.response.data);
                alert(error.response.data.msg);
            } else if (error.request) {
                // La petición se hizo pero no hubo respuesta (Servidor apagado o CORS)
                console.log("Error de petición (No hay respuesta):", error.request);
                alert("El servidor no responde. Revisa si está encendido y el CORS configurado.");
            } else {
                // Error al configurar la petición
                console.log("Error configuración:", error.message);
            }
        } finally {
            setForm({ ...form, isLoading: false })
        }
    };
    return (
        <section>
            <div className={styles['login_container']}>
                <div className={styles['login_card']}>

                    <div className={styles['image_section']}>
                        <div className={styles['image_content']}>
                            <h3>Bienvenido</h3>
                            <p>Accede a tu cuenta para continuar con una experiencia personalizada y segura. </p>
                        </div>
                    </div>

                    <div className={styles['form_section']}>

                        <div className={styles['form_title']}>
                            <h4>Iniciar Sesión</h4>
                            <p>Ingresa tus credenciales para acceder</p>
                        </div>

                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className={styles['input_field']}>
                                <MdEmail size={32} />
                                <input
                                    id="email"
                                    type="email"
                                    className={styles.validate}
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">Correo Electrónico</label>
                            </div>

                            <div className={styles['input_field']}>
                                <MdLock size={32} />
                                <input
                                    id="password"
                                    type="password"
                                    className={styles.validate}
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="password">Contraseña</label>
                            </div>

                            <div style={{ margin: '1.5rem 0' }}>
                                <label>
                                    <input type="checkbox" id="rememberMe" />
                                    <span>Recordarme</span>
                                </label>
                            </div>

                            <button
                                className={`${styles['btn']} ${styles['btn_login']}`}
                                type="submit"
                                disabled={form.isLoading}
                            >
                                <span className={styles['login-text']}>
                                    Iniciar Sesión
                                </span>
                            </button>

                        </form>

                        <div className={styles['forgot-password']}>
                            <a onClick={() => navigate('/forgot-password')}>¿Olvidaste tu contraseña?</a>
                        </div>

                        <div className={`${styles["register-link"]} ${styles["grey-text"]} ${styles["darken-3"]}`}>
                            <p>
                                ¿No tienes una cuenta?{" "}
                                <a href="#">
                                    Regístrate aquí
                                </a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    );
};


export default Login;