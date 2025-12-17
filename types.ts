export type Theme = 'dark' | 'light';

export interface Course {
  id: string;
  title: string;
  grade: string;
  subject: string; // Added for robust filtering
  description: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: ContentBlock[];
}

export type ContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'example'; title: string; problem: string; steps: string[] }
  | { type: 'quiz'; id: string; title: string; questions: QuizQuestion[] }
  | { type: 'callout'; title: string; content: string; variant: 'info' | 'warning' | 'tip' };

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProgress {
  completedLessons: string[]; // array of lesson IDs
  quizScores: Record<string, number>; // quizId -> score (0-100)
}