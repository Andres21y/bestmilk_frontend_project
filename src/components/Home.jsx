import { useNavigate } from 'react-router-dom';
import styles from '../css/home.module.css';
import { useAuth } from '../context/authContext';

const Home = () => {
    const navigate = useNavigate();
    const { logout, userData } = useAuth();

   const user = userData?.user;

    const handleLogout = () => {
        logout()
        navigate('/');
    };

    if (!user) return null;

    return (
        <section className={styles.container}>
     
            <div className={styles.content}>

                <h1>¡Hola, {user.name} {user.last_name || ''}!</h1>
                <p>Bienvenido al sistema <strong>BestMilk</strong></p>

                <div className={styles.card}>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> <span className={styles.role}>{user.rol}</span></p>
                </div>

                <br /><br />

                <button onClick={handleLogout} className={styles.logoutButton}>
                    Cerrar Sesión
                </button>
            </div>

        </section>
    );
};

export default Home;