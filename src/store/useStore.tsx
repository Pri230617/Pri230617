import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AppState, Dog, SessionLog } from '../types';

const STORAGE_KEY = 'adestra-kazuki:v1';

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

const kazuki: Dog = {
  id: 'kazuki',
  name: 'Kazuki',
  breed: 'Spitz Alemão (Lulu da Pomerânia)',
  size: 'pequeno',
  emoji: '🐶',
  color: '#e39236',
  arrivalDate: '2026-06-06',
  notes: 'Resgatado de maus-tratos. Levado, teimoso e carinhoso. Em adaptação.',
};

const yuki: Dog = {
  id: 'yuki',
  name: 'Yuki',
  breed: 'Spitz Alemão (Lulu da Pomerânia)',
  size: 'pequeno',
  emoji: '🦴',
  color: '#8a63c8',
  notes: 'O lord da casa. Calmo, educado e príncipe. Modelo de comportamento.',
};

const defaultState: AppState = {
  dogs: [kazuki, yuki],
  activeDogId: 'kazuki',
  progress: {
    kazuki: { completedLessons: {}, practicedCommands: {} },
    yuki: { completedLessons: {}, practicedCommands: {} },
  },
  sessions: [],
  streak: { count: 0, lastTrainingDate: null },
  reminder: { enabled: false, hour: 18 },
  onboarded: false,
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    // merge defensivo para futuras versões
    return {
      ...defaultState,
      ...parsed,
      progress: { ...defaultState.progress, ...(parsed.progress ?? {}) },
      streak: { ...defaultState.streak, ...(parsed.streak ?? {}) },
    };
  } catch {
    return defaultState;
  }
}

interface StoreValue {
  state: AppState;
  activeDog: Dog;
  setActiveDog: (id: string) => void;
  addDog: (dog: Omit<Dog, 'id'>) => void;
  updateDog: (id: string, patch: Partial<Dog>) => void;
  removeDog: (id: string) => void;
  toggleLesson: (lessonId: string) => void;
  isLessonDone: (lessonId: string) => boolean;
  logSession: (label: string, minutes: number) => void;
  practiceCommand: (commandId: string, minutes: number) => void;
  addJournalEntry: (entry: {
    label: string;
    minutes: number;
    note?: string;
    mood?: SessionLog['mood'];
  }) => void;
  deleteSession: (id: string) => void;
  setOnboarded: (v: boolean) => void;
  setReminder: (r: Partial<AppState['reminder']>) => void;
  resetAll: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function ensureProgress(prev: AppState, dogId: string) {
    if (!prev.progress[dogId]) {
      prev.progress[dogId] = { completedLessons: {}, practicedCommands: {} };
    }
    return prev.progress[dogId];
  }

  function registerTrainingDay(prev: AppState): AppState['streak'] {
    const today = todayKey();
    const last = prev.streak.lastTrainingDate;
    if (last === today) return prev.streak; // já contou hoje
    if (last && daysBetween(last, today) === 1) {
      return { count: prev.streak.count + 1, lastTrainingDate: today };
    }
    return { count: 1, lastTrainingDate: today };
  }

  const value = useMemo<StoreValue>(() => {
    const activeDog =
      state.dogs.find((d) => d.id === state.activeDogId) ?? state.dogs[0];

    return {
      state,
      activeDog,
      setActiveDog: (id) => setState((s) => ({ ...s, activeDogId: id })),
      addDog: (dog) =>
        setState((s) => {
          const id = dog.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '-' + s.dogs.length;
          return {
            ...s,
            dogs: [...s.dogs, { ...dog, id }],
            progress: {
              ...s.progress,
              [id]: { completedLessons: {}, practicedCommands: {} },
            },
          };
        }),
      updateDog: (id, patch) =>
        setState((s) => ({
          ...s,
          dogs: s.dogs.map((d) => (d.id === id ? { ...d, ...patch } : d)),
        })),
      removeDog: (id) =>
        setState((s) => {
          if (s.dogs.length <= 1) return s; // sempre mantém pelo menos 1
          const dogs = s.dogs.filter((d) => d.id !== id);
          return {
            ...s,
            dogs,
            activeDogId: s.activeDogId === id ? dogs[0].id : s.activeDogId,
          };
        }),
      toggleLesson: (lessonId) =>
        setState((s) => {
          const next = structuredClone(s);
          const prog = ensureProgress(next, next.activeDogId);
          if (prog.completedLessons[lessonId]) {
            delete prog.completedLessons[lessonId];
          } else {
            prog.completedLessons[lessonId] = new Date().toISOString();
            next.streak = registerTrainingDay(s);
          }
          return next;
        }),
      isLessonDone: (lessonId) =>
        Boolean(state.progress[state.activeDogId]?.completedLessons[lessonId]),
      logSession: (label, minutes) =>
        setState((s) => {
          const session: SessionLog = {
            id: 'sess-' + s.sessions.length + '-' + label,
            dogId: s.activeDogId,
            date: new Date().toISOString(),
            label,
            minutes,
          };
          return {
            ...s,
            sessions: [session, ...s.sessions].slice(0, 200),
            streak: registerTrainingDay(s),
          };
        }),
      practiceCommand: (commandId, minutes) =>
        setState((s) => {
          const next = structuredClone(s);
          const prog = ensureProgress(next, next.activeDogId);
          prog.practicedCommands[commandId] =
            (prog.practicedCommands[commandId] ?? 0) + 1;
          next.streak = registerTrainingDay(s);
          const session: SessionLog = {
            id: 'sess-' + next.sessions.length + '-' + commandId,
            dogId: next.activeDogId,
            date: new Date().toISOString(),
            label: 'Comando: ' + commandId,
            minutes,
          };
          next.sessions = [session, ...next.sessions].slice(0, 200);
          return next;
        }),
      addJournalEntry: ({ label, minutes, note, mood }) =>
        setState((s) => {
          const session: SessionLog = {
            id: 'sess-' + s.sessions.length + '-manual-' + label,
            dogId: s.activeDogId,
            date: new Date().toISOString(),
            label,
            minutes,
            note,
            mood,
            manual: true,
          };
          return {
            ...s,
            sessions: [session, ...s.sessions].slice(0, 200),
            streak: minutes > 0 ? registerTrainingDay(s) : s.streak,
          };
        }),
      deleteSession: (id) =>
        setState((s) => ({
          ...s,
          sessions: s.sessions.filter((x) => x.id !== id),
        })),
      setOnboarded: (v) => setState((s) => ({ ...s, onboarded: v })),
      setReminder: (r) =>
        setState((s) => ({ ...s, reminder: { ...s.reminder, ...r } })),
      resetAll: () => {
        localStorage.removeItem(STORAGE_KEY);
        setState(defaultState);
      },
    };
  }, [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore precisa estar dentro de StoreProvider');
  return ctx;
}
