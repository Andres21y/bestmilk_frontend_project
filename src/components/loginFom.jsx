import { MdEmail, MdLock } from "react-icons/md";
import styles from '../css/login.module.css';
import { useLoginForm } from '../utils/hooks/useLoginForm';

const LoginForm = () => {
    const {
        email,
        password,
        rememberMe,
        isLoading,
        errors,
        handleChange,
        handleSubmit
    } = useLoginForm();

    return (
        <form id="loginForm" className={styles['login_form']} onSubmit={handleSubmit} noValidate>
            <div className='input_field'>
                <MdEmail size={25} />
                <input
                    id="email"
                    type="email"
                    className={errors?.email ? styles.invalid : styles.validate}
                    value={email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Correo Electrónico</label>
                {errors?.email && <span className='error'>{errors.email}</span>}
            </div>

            <div className='input_field'>
                <MdLock size={25} />
                <input
                    id="password"
                    type="password"
                    className={errors?.password ? styles.invalid : styles.validate}
                    value={password}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Contraseña</label>
                {errors.password && <span className='error'>{errors.password}</span>}
            </div>

            <div className={styles.checkboxContainer}>
                <label>
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={handleChange}
                    />
                    <span>Recordarme</span>
                </label>
            </div>

            <button
                className={`${styles['btn']} ${styles['btn_login']}`}
                type="submit"
                disabled={isLoading}
            >
                <span className={styles['login-text']}>Iniciar Sesión</span>
            </button>
        </form>
    );
};

export default LoginForm;