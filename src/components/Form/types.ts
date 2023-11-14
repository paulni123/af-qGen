import React from "react";

export interface FormProps {
    category: string;
    subCategory: string;
    mathSubTopics: string[];
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setSubCategory: React.Dispatch<React.SetStateAction<string>>;
    setQuestionCount: React.Dispatch<React.SetStateAction<number>>;
    setMathSubTopics: React.Dispatch<React.SetStateAction<string[]>>;
    setMathSubTopic: React.Dispatch<React.SetStateAction<string>>;
    questionTypes: string[];
    setQuestionType: React.Dispatch<React.SetStateAction<string>>;
    setFormat: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}