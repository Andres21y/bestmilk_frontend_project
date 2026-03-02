import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import logo from '../assets/best_milk_main.png';
import styles from '../css/navBar.module.css'

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className={styles['container']}>
            <Link to="/">
                <img src={logo} style={{ height: '30px' }} alt="logo" />
            </Link>

            {isAuthenticated ? (
                <div className={styles['btns']}>
                    <Link to="/home">Inicio</Link>
                    <button onClick={logout}>Cerrar Sesión</button>
                </div>
            ) : (
                <div className={styles['btns']}>
                    <Link to="/">Login</Link>
                    <Link to="/registro">Registrarse</Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;