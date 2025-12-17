import { UserProgress } from "../types";

const STORAGE_KEY = "nebula_learn_progress_v1";

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  quizScores: {}
};

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROGRESS;
  } catch (e) {
    console.error("Failed to load progress", e);
    return DEFAULT_PROGRESS;
  }
};

export const saveLessonComplete = (lessonId: string) => {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  return progress;
};

export const saveQuizScore = (quizId: string, score: number) => {
  const progress = getProgress();
  // Keep the highest score
  const currentBest = progress.quizScores[quizId] || 0;
  if (score > currentBest) {
    progress.quizScores[quizId] = score;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  return progress;
};
