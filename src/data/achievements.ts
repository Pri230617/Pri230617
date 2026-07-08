import type { AppState, AchievementState } from '../types';
import { programs } from './programs';
import { commands } from './commands';

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

/**
 * Calcula o estado das conquistas para o cão ativo.
 * Lições/comandos usam o progresso do cão; ofensiva/sessões/minutos são gerais.
 */
export function computeAchievements(
  state: AppState,
  dogId: string
): AchievementState[] {
  const prog = state.progress[dogId] ?? {
    completedLessons: {},
    practicedCommands: {},
  };
  const doneLessons = Object.keys(prog.completedLessons).length;
  const practicedCount = Object.keys(prog.practicedCommands).length;
  const totalLessons = programs.reduce((n, p) => n + p.lessons.length, 0);
  const totalCommands = commands.length;
  const totalMinutes = state.sessions.reduce((n, s) => n + s.minutes, 0);
  const totalSessions = state.sessions.length;
  const streak = state.streak.count;

  const completedPrograms = programs.filter((p) =>
    p.lessons.every((l) => prog.completedLessons[l.id])
  ).length;

  const fundamentos = programs.find((p) => p.id === 'fundamentos');
  const fundamentosDone = fundamentos
    ? fundamentos.lessons.every((l) => prog.completedLessons[l.id])
    : false;

  const bothDogsTrained = state.dogs.every((d) => {
    const p = state.progress[d.id];
    return p && Object.keys(p.completedLessons).length > 0;
  });

  const defs: (Omit<AchievementState, 'unlocked' | 'progress'> & {
    value: number;
    target: number;
  })[] = [
    {
      id: 'primeiro-passo',
      title: 'Primeiro passo',
      desc: 'Conclua sua primeira lição',
      emoji: '🐾',
      value: Math.min(doneLessons, 1),
      target: 1,
      progressLabel: `${Math.min(doneLessons, 1)}/1`,
    },
    {
      id: 'aprendiz',
      title: 'Aprendiz dedicado',
      desc: 'Conclua 5 lições',
      emoji: '📗',
      value: doneLessons,
      target: 5,
      progressLabel: `${Math.min(doneLessons, 5)}/5`,
    },
    {
      id: 'fundamentos',
      title: 'Base sólida',
      desc: 'Complete o programa Fundamentos',
      emoji: '🎓',
      value: fundamentosDone ? 1 : 0,
      target: 1,
    },
    {
      id: 'fogo-3',
      title: 'Pegando o ritmo',
      desc: 'Ofensiva de 3 dias',
      emoji: '🔥',
      value: streak,
      target: 3,
      progressLabel: `${Math.min(streak, 3)}/3`,
    },
    {
      id: 'fogo-7',
      title: 'Uma semana firme',
      desc: 'Ofensiva de 7 dias',
      emoji: '🔥',
      value: streak,
      target: 7,
      progressLabel: `${Math.min(streak, 7)}/7`,
    },
    {
      id: 'fogo-30',
      title: 'Hábito de mestre',
      desc: 'Ofensiva de 30 dias',
      emoji: '🏅',
      value: streak,
      target: 30,
      progressLabel: `${Math.min(streak, 30)}/30`,
    },
    {
      id: 'programa-1',
      title: 'Missão cumprida',
      desc: 'Complete um programa inteiro',
      emoji: '✅',
      value: completedPrograms,
      target: 1,
      progressLabel: `${Math.min(completedPrograms, 1)}/1`,
    },
    {
      id: 'todos-programas',
      title: 'Cão de ouro',
      desc: 'Complete todos os programas',
      emoji: '🏆',
      value: completedPrograms,
      target: programs.length,
      progressLabel: `${completedPrograms}/${programs.length}`,
    },
    {
      id: 'poliglota',
      title: 'Vocabulário rico',
      desc: 'Pratique 5 comandos diferentes',
      emoji: '🗂️',
      value: practicedCount,
      target: 5,
      progressLabel: `${Math.min(practicedCount, 5)}/5`,
    },
    {
      id: 'enciclopedia',
      title: 'Enciclopédia canina',
      desc: `Pratique todos os ${totalCommands} comandos`,
      emoji: '📚',
      value: practicedCount,
      target: totalCommands,
      progressLabel: `${practicedCount}/${totalCommands}`,
    },
    {
      id: 'maratona',
      title: 'Maratonista',
      desc: 'Acumule 60 minutos de treino',
      emoji: '⏱️',
      value: totalMinutes,
      target: 60,
      progressLabel: `${Math.min(totalMinutes, 60)}/60 min`,
    },
    {
      id: 'guru',
      title: 'Guru do adestramento',
      desc: 'Registre 25 sessões',
      emoji: '🧘',
      value: totalSessions,
      target: 25,
      progressLabel: `${Math.min(totalSessions, 25)}/25`,
    },
    {
      id: 'dois-caes',
      title: 'Casa harmoniosa',
      desc: 'Treine os dois cães da casa',
      emoji: '🤝',
      value: bothDogsTrained ? 1 : 0,
      target: 1,
    },
    {
      id: 'tudo',
      title: 'Formatura',
      desc: 'Conclua todas as lições do app',
      emoji: '🎉',
      value: doneLessons,
      target: totalLessons,
      progressLabel: `${doneLessons}/${totalLessons}`,
    },
  ];

  return defs.map((d) => ({
    id: d.id,
    title: d.title,
    desc: d.desc,
    emoji: d.emoji,
    progressLabel: d.progressLabel,
    unlocked: d.value >= d.target,
    progress: clamp01(d.value / d.target),
  }));
}
