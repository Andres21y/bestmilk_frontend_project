import { Link, useLocation } from "react-router-dom";
import styles from "../css/navbar.module.css";
import logo from '../assets/best_milk_main.png';
import { MdHome } from "react-icons/md";

const NavBar = ({ logout }) => {
    const location = useLocation();

    // Configuración de botones por ruta
    const navConfig = {
        "/": [
            { type: "link", to: "/about", label: "¿Quienes somos?" },
            { type: "link", to: "/benefits", label: "Beneficios" },
            { type: "link", to: "/login", label: "Iniciar" },
            { type: "link", to: "/signup", label: "Registrar" }
        ],
        "/login": [
            { type: "link", to: "/signup", label: "Registrarse" },
            { type: "link", to: "/", icon: <MdHome size={32}/> }
        ],
        "/signup": [
            { type: "link", to: "/login", label: "Iniciar sesión" },
            { type: "link", to: "/", icon: <MdHome size={32}/> }
        ],
        "/dashboard": [
            { type: "link", to: "/profile", label: "Perfil" },
            { type: "link", to: "/settings", label: "Configuración" },
            { type: "button", onClick: logout, label: "Cerrar Sesión" }
        ]
    };

    const currentButtons = navConfig[location.pathname] || [];

    return (
        <nav className={styles["container"]}>
            <Link to="/">
                <img src={logo} style={{ height: "30px" }} alt="logo" />
            </Link>

            <div className={styles["btns"]}>
                {currentButtons.map((btn, index) =>
                    btn.type === "link" ? (
                        <Link key={index} to={btn.to}>
                            {btn.icon || btn.label}
                        </Link>
                    ) : (
                        <button key={index} onClick={btn.onClick}>
                            {btn.icon || btn.label}
                        </button>
                    )
                )}
            </div>
        </nav>
    );
}
export default NavBar;