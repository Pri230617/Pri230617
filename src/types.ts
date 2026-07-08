export type DogSize = 'pequeno' | 'medio' | 'grande';

export interface Dog {
  id: string;
  name: string;
  breed: string;
  birthDate?: string; // ISO date, opcional
  arrivalDate?: string; // quando chegou em casa
  size: DogSize;
  emoji: string;
  color: string; // cor de destaque do perfil (hex)
  notes?: string;
}

export type Difficulty = 'facil' | 'medio' | 'dificil';

export interface Command {
  id: string;
  name: string;
  cue: string; // a palavra/gesto de comando
  emoji: string;
  difficulty: Difficulty;
  minutes: number; // duração sugerida da sessão
  summary: string;
  why: string; // por que treinar isso
  steps: string[];
  tips: string[];
  category: 'basico' | 'comportamento' | 'truque';
}

export interface Lesson {
  id: string;
  title: string;
  goal: string;
  minutes: number;
  steps: string[];
  successSign: string; // como saber que deu certo
}

export interface Program {
  id: string;
  title: string;
  emoji: string;
  color: string;
  tagline: string;
  forProblem?: string; // problema que resolve
  description: string;
  level: Difficulty;
  lessons: Lesson[];
}

export interface Tip {
  id: string;
  title: string;
  text: string;
  emoji: string;
}

// ---- Estado persistido ----

export interface Progress {
  // chaves = ids de lição/comando concluídos -> data ISO
  completedLessons: Record<string, string>;
  practicedCommands: Record<string, number>; // id -> nº de sessões
}

export interface SessionLog {
  id: string;
  dogId: string;
  date: string; // ISO
  label: string;
  minutes: number;
}

export interface AppState {
  dogs: Dog[];
  activeDogId: string;
  // progresso por cão
  progress: Record<string, Progress>;
  sessions: SessionLog[];
  streak: {
    count: number;
    lastTrainingDate: string | null; // ISO date (yyyy-mm-dd)
  };
  onboarded: boolean;
}
