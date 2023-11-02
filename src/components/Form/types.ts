export interface FormProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    subCategories: string[];
    setSubCategory: React.Dispatch<React.SetStateAction<string>>;
    setQuestionCount: React.Dispatch<React.SetStateAction<number>>;
    questionTypes: string[];
    setQuestionType: React.Dispatch<React.SetStateAction<string>>;
    setFormat: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}