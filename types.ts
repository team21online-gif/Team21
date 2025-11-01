
export enum AppView {
  HOME = 'HOME',
  IMAGE_EDITOR = 'IMAGE_EDITOR',
  QUIZ = 'QUIZ',
  CERTIFICATE = 'CERTIFICATE',
}

export enum QuizDifficulty {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    difficulty: QuizDifficulty;
}