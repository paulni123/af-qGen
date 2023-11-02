import styles from './styles.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a href="#" className={styles.footerLink}>About</a>
            <a href="#" className={styles.footerLink}>Help</a>
            <a href="#" className={styles.footerLink}>Contact</a>
        </footer>
    );
}

export default Footer;