import { Question } from './api';

const STORAGE_KEY = 'custom_quiz_data';

export const saveCustomQuiz = (questions: Question[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    }
};

export const getCustomQuiz = (): Question[] | null => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    }
    return null;
};

export const clearCustomQuiz = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
}
