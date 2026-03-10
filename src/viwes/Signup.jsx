import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdPerson, MdEmail, MdPhone, MdLock, MdPersonOutline } from 'react-icons/md';
import { validateSignupForm } from '../utils/validation';
import { useAuth } from '../context/authContext';
import styles from '../css/signup.module.css';

const Signup = () => {

    const navigate = useNavigate();
    const { signup } = useAuth();

    const [form, setForm] = useState({
        nit: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        terms: false,
        newsletter: false,
        isLoading: false,
        errors: {}
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
            errors: { ...prev.errors, [id]: null }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid, errors } = validateSignupForm(form);

        if (!isValid) {
            setForm(prev => ({ ...prev, errors }));
            return;
        }

        setForm(prev => ({ ...prev, isLoading: true }));

        try {
            // utilizamos la función de registro del contexto
            await signup({
                nit: form.nit,
                name: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                phone: form.phone,
                address: form.address
            });

            toast.success("Registration successful! Welcome.");
            navigate('/home');

        } catch (error) {
            // Errores de API (ej. email ya registrado)
            const msg = error.response?.data?.msg || "Error en el servidor";
            toast.error(msg);
        } finally {
            setForm(prev => ({ ...prev, isLoading: false }));
        }
    };


    return (
        <section className={styles.signup_container}>
            <div className={styles.signup_card}>
                <h3 className={styles.title}>Crea tu cuenta</h3>
                <p className={styles.subtitle}>Únete a nuestra comunidad</p>
                <center>
                    <form className={styles['signup_form']} onSubmit={handleSubmit} noValidate>
                        <div className={styles.row}>
                            {/* Columna 1 */}
                            <div className={styles.col}>
                                <div className="input_field">
                                    <MdPerson size={25} />
                                    <input
                                        id="nit"
                                        type="text"
                                        value={form.nit}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                    <label htmlFor="nit">NIT</label>
                                    {form.errors.nit && <span className="error">{form.errors.nit}</span>}
                                </div>

                                <div className="input_field">
                                    <MdPerson size={25} />
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="firstName">Nombre</label>
                                    {form.errors.firstName && <span className="error">{form.errors.firstName}</span>}
                                </div>

                                <div className="input_field">
                                    <MdPersonOutline size={25} />
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="lastName">Apellido</label>
                                    {form.errors.lastName && <span className="error">{form.errors.lastName}</span>}
                                </div>

                                <div className="input_field">
                                    <MdEmail size={25} />
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="email">Email</label>
                                    {form.errors.email && <span className="error">{form.errors.email}</span>}
                                </div>
                            </div>

                            {/* Columna 2 */}
                            <div className={styles.col}>
                                <div className="input_field">
                                    <MdLock size={25} />
                                    <input
                                        id="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="password">Contraseña</label>
                                    {form.errors.password && <span className="error">{form.errors.password}</span>}
                                </div>

                                <div className="input_field">
                                    <MdLock size={25} />
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    {form.errors.confirmPassword && <span className="error">{form.errors.confirmPassword}</span>}
                                </div>

                                <div className="input_field">
                                    <MdPhone size={25} />
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder=" "
                                    />
                                    <label htmlFor="phone">Teléfono</label>
                                    {form.errors.phone && <span className="error">{form.errors.phone}</span>}
                                </div>

                                <div className="input_field">
                                    <MdPersonOutline size={25} />
                                    <input
                                        id="address"
                                        type="text"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="address">Dirección</label>
                                    {form.errors.address && <span className="error">{form.errors.address}</span>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkboxContainer}>
                            <label>
                                <input id="terms" type="checkbox" checked={form.terms} onChange={handleChange} />
                                <span>Acepto los términos y condiciones</span>
                            </label>
                            {form.errors.terms && <span className={styles['alert']}>{form.errors.terms}</span>}
                        </div>

                        <div>
                            <button type="submit" className={styles.signup_btn} disabled={form.isLoading}>
                                {form.isLoading ? "Procesando..." : "Crear Cuenta"}
                            </button>
                        </div>
                    </form>
                </center>
            </div>
        </section>
    );
};

export default Signup;