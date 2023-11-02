"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

// Form elements
import Form from '../components/Form/Form'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Status from '../components/Status/Status';
import Download from '../components/Download/Download';

const inter = Inter({ subsets: ['latin'] });

const subCategories = ["scienceFiction", "biology", "physics", "chemistry", "currentHistory"];
const questionTypes = ["Multiple-Choice", "True/False", "Short Answer"];

export default function Home() {
  const [category, setCategory] = useState('Reading');
  const [subCategory, setSubCategory] = useState('scienceFiction');
  const [questionCount, setQuestionCount] = useState(11);
  const [questionType, setQuestionType] = useState('Multiple-Choice');
  const [format, setFormat] = useState('pdf');
  const [pdfURL, setPdfURL] = useState(""); // Added state for PDF URL
  const [status, setStatus] = useState("Idle") // 4 possible states [Idle, Generating, Success || Error]
  const [errorMessage, setErrorMessage] = useState<string>('');  // To hold any error messages

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(`Generating PDF Link...`)

    const dataModel = {
      timestamp: new Date().toISOString(),
      questionCategory: category.toLowerCase(),
      questionSubCategory: subCategory,
      questionCount: questionCount,
      questionType: questionType.toLowerCase().replace('/', '-'),
      format: format,
    };

    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataModel),
      });

      const responseData = await response.json();
      setPdfURL(responseData.pdf_url); // Set the PDF URL from the response
      setStatus(`Generated PDF Successfully!`) // Set status
    } catch (error: any) {
      setErrorMessage(`Error: ${error.message}`)
      setStatus("Error")
    }
  };

  return (
    <>
      <Head>
        <title>AI SAT Test Prep Generator</title>
      </Head>
      <Header />
      <Form
        category={category}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        setQuestionCount={setQuestionCount}
        setQuestionType={setQuestionType}
        setFormat={setFormat}
        handleSubmit={handleSubmit}
        subCategories={subCategories}
        questionTypes={questionTypes}
      />
      <Status
        status={status}
      />
      <Download
        pdfURL={pdfURL}
      />
      <Footer />
    </>
  )
}