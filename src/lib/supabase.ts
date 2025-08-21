// Mock backend for Quiz App demo
// In a real app, you'd use Supabase or another backend service

// Database types for TypeScript
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  full_name?: string;
  created_at: string;
}

export interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  category?: string;
  created_at: string;
}

export interface Attempt {
  id: string;
  user_id: string;
  score: number;
  total_questions: number;
  answers: { question_id: string; selected_answer: string; is_correct: boolean }[];
  completed_at: string;
}

// Mock data for demo purposes
export const mockQuestions: Question[] = [
  {
    id: '1',
    question_text: 'What is the capital of France?',
    option_a: 'London',
    option_b: 'Paris',
    option_c: 'Berlin',
    option_d: 'Madrid',
    correct_answer: 'B',
    category: 'Geography',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    question_text: 'Which programming language is known for web development?',
    option_a: 'Python',
    option_b: 'C++',
    option_c: 'JavaScript',
    option_d: 'Java',
    correct_answer: 'C',
    category: 'Technology',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    question_text: 'What is 2 + 2?',
    option_a: '3',
    option_b: '4',
    option_c: '5',
    option_d: '6',
    correct_answer: 'B',
    category: 'Math',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    question_text: 'Who painted the Mona Lisa?',
    option_a: 'Vincent van Gogh',
    option_b: 'Pablo Picasso',
    option_c: 'Leonardo da Vinci',
    option_d: 'Michelangelo',
    correct_answer: 'C',
    category: 'Art',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    question_text: 'What is the largest planet in our solar system?',
    option_a: 'Earth',
    option_b: 'Saturn',
    option_c: 'Jupiter',
    option_d: 'Neptune',
    correct_answer: 'C',
    category: 'Science',
    created_at: new Date().toISOString(),
  },
];