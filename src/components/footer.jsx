import styles from '../css/footer.module.css'
import logo from '../assets/best_milk_main.png';

function Footer({ config = {} }) {

    const {
        brandName = <img src={logo} style={{ height: "30px" }} alt="logo" />,
        sections = [
            {
                title: "Producto",
                links: [
                    { text: "Características", href: "id" },
                    { text: "Precios", href: "id" },
                    { text: "Integraciones", href: "id" }
                ]
            },
            {
                title: "Soporte",
                links: [
                    { text: "Centro de Ayuda", href: "id" },
                    { text: "Contacto", href: "id" },
                    { text: "Estado del Sistema", href: "id" }
                ]
            },
            {
                title: "Acceso Rápido",
                links: [
                    { text: "Términos y condiciones", href: "id" },
                    { text: "Política de privacidad", href: "id" },
                    { text: "Social", href: "id" }
                ]
            }
        ],
        copyright = "© 2025 Bestmilk. Todos los derechos reservados - grupo A - 3070454 - SENA"
    } = config;

    return (
        <footer id='footer' className={styles.footer_section}>
            <div className={`${styles.container} ${styles.footer}`}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <h5 className={styles.brand_logo}>{brandName}</h5>
                    </div>

                    {sections.map((section, index) => (
                        <div key={index} className={styles.col}>
                            <h6 className={styles.section_title}>{section.title}</h6>
                            <ul className={styles.link_list}>
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a className={styles.link} href={link.href}>
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.footer_copyright}>
                <div className={styles.container}>
                    <span className={styles.copy_text}>{copyright}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer