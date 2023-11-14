import React, { useState } from 'react';
import styles from './styles.module.css';
import { FormProps } from './types';

const englishSubCategories = ["scienceFiction", "biology", "physics", "chemistry", "currentHistory"];
const mathSubCategories = ["heartOfAlgebra", "passportToAdvancedMath", "problemSolvingAndDataAnalysis", "additionalTopicsInMath"];
/**
 * FOR PROBLEM SOLVING AND DATA ANAYSIS STILL NEED TO FINISH UP TABLE DATA FUNCTIONALITY, SCATTERPLOTS, KEY FEATURES OF GRAPHS, LINEAR AND EXPONENTIAL GROWTH
 * 
 */
const topicMapper: { [key: string]: string[] } = {
    "heartOfAlgebra": ["Solving linear equations and linear inequalities", "Interpreting linear functions", "Linear Equation Word Problems", "Linear Inequality Word Problems",
        "Graphing Linear Equations", "Linear Function Word Problems", "Systems of linear inequalities word problems", "Solving Systems of Linear Equations", "System of Linear Equations Word Problems"],
    "passportToAdvancedMath": ["Solving Quadratic Equations", "Interpreting nonlinear expressions", "Quadratic and Exponential Word Problems", "Manipulating quadratic and exponential expressions", "Radical and rational expressions", "Radical and rational equations", "Operations with rational expressions", "Operations With Polynomials", "Polynomial Factors and Graphs", "Non-Linear Equation Graphs", "Linear and Quadratic Systems", "Structure in expressions", "Isolating Quantities", "Function Notation"],
    "problemSolvingAndDataAnalysis": ["Ratios, rates, and proportions", "Percents", "Units", "Table Data", "Scatterplots", "Key features of graphs", "Linear and exponential growth", "Data inferences", "Center, spread, and shape of distributions", "Data collection and conclusions"],
    "additionalTopicsInMath": ["Volume word problems", "Right triangle word problems", "Congruence and similarity", "Right triangle trigonometry", "Angles, arc lengths, and trig functions", "Circle Theorems", "Circle equations", "Complex Numbers"]
};
const subCategoryMapper: { [key: string]: string[] } = {
    "Reading": englishSubCategories,
    "Writing": englishSubCategories,
    "Math": mathSubCategories
};

const Form: React.FC<FormProps> = ({
    category,
    subCategory,
    mathSubTopics,
    setCategory,
    setSubCategory,
    setMathSubTopic,
    setMathSubTopics,
    setQuestionCount,
    questionTypes,
    setQuestionType,
    setFormat,
    handleSubmit,
}) => {
    const [subCategories, setSubCategories] = useState(englishSubCategories);
    return (
        <section className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Choose a Category:
                    <select className={styles.select} value={category} onChange={(e) => {
                        setCategory(e.target.value)
                        setSubCategories(subCategoryMapper[e.target.value])
                        setSubCategory(subCategories[0])
                    }
                    }>
                        <option>Reading</option>
                        <option>Writing</option>
                        <option>Math</option>
                    </select>
                </label>

                {(category === 'Reading' || category === 'Writing') && (
                    <label className={styles.label}>
                        Choose a Sub-Category:
                        <select className={styles.select} onChange={(e) => setSubCategory(e.target.value)}>
                            {englishSubCategories.map((subCategory, index) => (
                                <option key={index}>{subCategory}</option>
                            ))}
                        </select>
                    </label>
                )}

                {(category === 'Math') && (
                    <>
                        <label className={styles.label}>
                            Choose a Sub-Category:
                            <select className={styles.select} onChange={(e) => {
                                setSubCategory(e.target.value)
                                setMathSubTopics(topicMapper[e.target.value])
                                setMathSubTopic(topicMapper[e.target.value][0]);
                            }}>
                                {mathSubCategories.map((subCategory, index) => (
                                    <option key={index}>{subCategory}</option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.label}>
                            Choose a Math Sub-Category Topic:
                            <select className={styles.select} onChange={(e) => setMathSubTopic(e.target.value)}>
                                {mathSubTopics.map((subCategory, index) => (
                                    <option key={index}>{subCategory}</option>
                                ))}
                            </select>
                        </label>
                    </>
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
                </div>

                <button className={styles.button}>Generate Test</button>
            </form>
        </section >
    );
};

export default Form;