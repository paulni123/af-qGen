import React from 'react';
import styles from './styles.module.css';
import { FormProps } from './types';

const Form: React.FC<FormProps> = ({
    category,
    setCategory,
    subCategories,
    setSubCategory,
    setQuestionCount,
    questionTypes,
    setQuestionType,
    setFormat,
    handleSubmit,
}) => {
    return (
        <section className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Choose a Category:
                    <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>Reading</option>
                        <option>Writing</option>
                        <option>Math</option>
                    </select>
                </label>

                {(category === 'Reading' || category === 'Writing') && (
                    <label className={styles.label}>
                        Choose a Sub-Category:
                        <select className={styles.select} onChange={(e) => setSubCategory(e.target.value)}>
                            {subCategories.map((subCategory, index) => (
                                <option key={index}>{subCategory}</option>
                            ))}
                        </select>
                    </label>
                )}

                <label className={styles.label}>
                    Number of Questions:
                    <input
                        type="number"
                        defaultValue="11"
                        className={styles.input}
                        min="1"
                        max="11"
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                    />
                </label>

                <label className={styles.label}>
                    Select Question Type:
                    <select className={styles.select} onChange={(e) => setQuestionType(e.target.value)}>
                        {questionTypes.map((questionType, index) => (
                            <option key={index}>{questionType}</option>
                        ))}
                    </select>
                </label>

                <div className={styles.radioGroup}>
                    Output Format:
                    <input type="radio" name="format" value="pdf" defaultChecked className={styles.radio} onChange={(e) => setFormat(e.target.value)} />
                    PDF
                    {/* Uncomment for other formats if needed
                <input type="radio" name="format" value="docx" className={styles.radio} />DOCX
                <input type="radio" name="format" value="txt" className={styles.radio} />TXT 
                */}
                </div>

                <button className={styles.button}>Generate Test</button>
            </form>
        </section >
    );
};

export default Form;