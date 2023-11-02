import React from 'react';
import styles from './styles.module.css';
import { DownloadProps } from './types';

const Download: React.FC<DownloadProps> = ({ pdfURL }) => {
    return (
        <section className={styles.downloadSection}>
            {pdfURL && <a href={pdfURL} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download Generated Questions And Answers</a>}
            {/* ... other links ... */}
        </section>
    );
}

export default Download;