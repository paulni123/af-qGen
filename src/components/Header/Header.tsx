import styles from './styles.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>AI SAT Test Prep Generator</h1>
            <p className={styles.subtitle}>Generate custom SAT practice tests powered by AI.</p>
        </header>
    );
}

export default Header;