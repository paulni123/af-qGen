import React from 'react';
import styles from './styles.module.css';
import { StatusProps } from './types';

const Status: React.FC<StatusProps> = ({ status }) => {
    return (
        <section className={styles.statusSection}>
            <progress value={status === '"Generating PDF Link...' ? 50 : (status === 'Generated PDF Successfully!' || status === 'Error' ? 100 : 0)} max="100" className={styles.progressBar}></progress>
            <p className={styles.statusMessage}>Status: {status}</p>
        </section>
    );
}

export default Status;