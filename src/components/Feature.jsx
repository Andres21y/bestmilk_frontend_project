import styles from "../css/feature.module.css";
import { MdInventory2, MdLocalHospital, MdTrendingUp, MdAccountBalanceWallet, MdFamilyRestroom, MdCloudSync } from "react-icons/md";


const Feature = () => {
    const features = [
        {
            icon: <MdInventory2 className={`${styles.feature_icon} ${styles.brown}`} />,
            title: "Control de Inventario",
            description: "Registra y monitorea cada animal con códigos únicos, historial completo y alertas automáticas"
        },
        {
            icon: <MdLocalHospital className={`${styles.feature_icon} ${styles.red}`} />,
            title: "Gestión Sanitaria",
            description: "Programa vacunas, tratamientos y controles veterinarios con recordatorios inteligentes"
        },
        {
            icon: <MdTrendingUp className={`${styles.feature_icon} ${styles.blue}`} />,
            title: "Análisis de Producción",
            description: "Reportes detallados de producción lechera, rendimiento y proyecciones de crecimiento"
        },
        {
            icon: <MdAccountBalanceWallet className={`${styles.feature_icon} ${styles.green}`} />,
            title: "Control Financiero",
            description: "Gestiona gastos, ingresos, costos por animal y rentabilidad en tiempo real"
        },
        {
            icon: <MdFamilyRestroom className={styles.feature_icon} />,
            title: "Genealogía",
            description: "Árbol genealógico completo para optimizar cruces y mejorar la genética del hato"
        },
        {
            icon: <MdCloudSync className={styles.feature_icon} />,
            title: "Sincronización",
            description: "Acceso desde móvil, tablet y computadora con sincronización automática en la nube"
        }
    ];

    return (
        <section className={styles.feature_section}>


                {features.map((feature, index) => (
                    <article key={index} className={styles.feature_card}>
                        {feature.icon}
                        <h5 className={styles.feature_title}>{feature.title}</h5>
                        <p className={styles.feature_description}>{feature.description}</p>
                    </article>
                ))}


        </section>

    )
}

export default Feature