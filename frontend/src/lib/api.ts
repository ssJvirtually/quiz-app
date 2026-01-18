
export const API_BASE_URL = 'http://localhost:8080/api';

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch(`${API_BASE_URL}/questions`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch questions');
  }
  return res.json();
}
