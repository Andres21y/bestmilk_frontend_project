import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginFom';
import styles from '../css/login.module.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <section className={styles['login_container']}>
      <div className={styles['login_card']}>
        <div className={styles['image_section']}>
          <div className={styles['image_content']}>
            <h3>Bienvenido</h3>
            <p>Accede a tu cuenta para continuar con una experiencia personalizada y segura.</p>
          </div>
        </div>

        <div className={styles['form_section']}>
          <div className={styles['form_title']}>
            <h4>Iniciar Sesión</h4>
            <p>Ingresa tus credenciales para acceder</p>
          </div>

          <LoginForm />

          <div className={styles['forgot-password']}>
            <a onClick={() => navigate('/forgot-password')}>¿Olvidaste tu contraseña?</a>
          </div>

          <div className={`${styles["register-link"]} ${styles["grey-text"]} ${styles["darken-3"]}`}>
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to={'/signup'}>Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;