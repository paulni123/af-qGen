import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const subCategories = ["scienceFiction", "biology", "physics", "chemistry", "currentHistory"]

const questionTypes = ["Multiple-Choice", "True/False", "Short Answer"]

export default function Home() {
  const [category, setCategory] = useState('Reading'); // Default value set to 'Reading'

  return (
    <>
      <Head>
        <title>AI SAT Test Prep Generator</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>AI SAT Test Prep Generator</h1>
        <p className={styles.subtitle}>Generate custom SAT practice tests powered by AI.</p>
      </header>
      <section className={styles.formSection}>
        <form className={styles.form}>
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
              <select className={styles.select}>
                {
                  subCategories.map(subCategory => {
                    return <option>{subCategory}</option>
                  })
                }
              </select>
            </label>
          )}
          <label className={styles.label}>
            Number of Questions:
            <input type="number" defaultValue="11" className={styles.input} min="1" max="11" />
          </label>
          <label className={styles.label}>
            Select Question Type:
            <select className={styles.select}>
              {
                questionTypes.map(questionType => {
                  return <option>{questionType}</option>
                })
              }
            </select>
          </label>
          <div className={styles.radioGroup}>
            Output Format:
            <input type="radio" name="format" value="pdf" defaultChecked className={styles.radio} />PDF
            {/* <input type="radio" name="format" value="docx" className={styles.radio} />DOCX
            <input type="radio" name="format" value="txt" className={styles.radio} />TXT */}
          </div>
          <button className={styles.button}>Generate Test</button>
        </form>
      </section>
      <section className={styles.statusSection}>
        <progress value="0" max="100" className={styles.progressBar}></progress>
        <p className={styles.statusMessage}>Status: Initializing...</p>
      </section>
      <section className={styles.downloadSection}>
        <a href="#" className={styles.downloadLink}>Test without answers</a>
        <a href="#" className={styles.downloadLink}>Answer Sheet</a>
      </section>
      <footer className={styles.footer}>
        <a href="#" className={styles.footerLink}>About</a>
        <a href="#" className={styles.footerLink}>Help</a>
        <a href="#" className={styles.footerLink}>Contact</a>
      </footer>
    </>
  )
}
