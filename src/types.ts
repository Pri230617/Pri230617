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

export type CommandCategory =
  | 'basico'
  | 'comportamento'
  | 'convivencia'
  | 'vida'
  | 'truque';

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
  category: CommandCategory;
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

// ---- Guia / artigos ----

export type ArticleCategory =
  | 'convivencia'
  | 'comportamento'
  | 'filhote'
  | 'saude'
  | 'metodo';

export interface ArticleSection {
  heading?: string;
  body?: string;
  list?: string[];
}

export interface Article {
  id: string;
  title: string;
  emoji: string;
  category: ArticleCategory;
  readMinutes: number;
  excerpt: string;
  sections: ArticleSection[];
}

// ---- Conquistas ----

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  emoji: string;
}

export interface AchievementState extends Achievement {
  unlocked: boolean;
  progress: number; // 0..1
  progressLabel?: string;
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
  note?: string; // anotação livre do tutor
  manual?: boolean; // registrado manualmente no diário
  mood?: 'otimo' | 'ok' | 'dificil'; // como foi a sessão
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
  reminder: {
    enabled: boolean;
    hour: number; // 0..23, horário do lembrete diário
  };
  onboarded: boolean;
}
