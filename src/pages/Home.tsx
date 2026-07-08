import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { programs } from '../data/programs';
import { tips } from '../data/tips';
import { articles } from '../data/guide';
import { computeAchievements } from '../data/achievements';
import DogSwitcher from '../components/DogSwitcher';
import { Page, ProgressBar } from '../components/ui';

const quickActions = [
  { to: '/ferramentas', emoji: '🧰', label: 'Ferramentas' },
  { to: '/guia', emoji: '📖', label: 'Guia' },
  { to: '/conquistas', emoji: '🏆', label: 'Conquistas' },
  { to: '/diario', emoji: '📔', label: 'Diário' },
];

export default function Home() {
  const { state, activeDog, isLessonDone } = useStore();

  const progress = state.progress[activeDog.id] ?? {
    completedLessons: {},
    practicedCommands: {},
  };
  const totalLessons = programs.reduce((n, p) => n + p.lessons.length, 0);
  const doneLessons = Object.keys(progress.completedLessons).length;
  const overall = totalLessons ? doneLessons / totalLessons : 0;

  // Plano do dia: próximas 3 lições ainda não feitas, priorizando fundamentos
  const plan: { programId: string; programTitle: string; color: string; lessonId: string; lessonTitle: string; minutes: number }[] =
    [];
  for (const p of programs) {
    for (const l of p.lessons) {
      if (!isLessonDone(l.id)) {
        plan.push({
          programId: p.id,
          programTitle: p.title,
          color: p.color,
          lessonId: l.id,
          lessonTitle: l.title,
          minutes: l.minutes,
        });
      }
      if (plan.length >= 3) break;
    }
    if (plan.length >= 3) break;
  }

  const tip = tips[doneLessons % tips.length];
  const achievements = computeAchievements(state, activeDog.id);
  const unlocked = achievements.filter((a) => a.unlocked).length;
  const featured = articles[doneLessons % articles.length];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <Page>
      <header className="flex items-center justify-between pt-4">
        <div>
          <p className="text-sm font-bold text-ink/40">{greeting} 🐾</p>
          <h1 className="text-2xl font-black leading-tight">
            Vamos treinar o {activeDog.name}?
          </h1>
        </div>
      </header>

      <div className="mt-4">
        <DogSwitcher />
      </div>

      {/* Ofensiva + progresso */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="card flex flex-col justify-between p-4">
          <div className="flex items-center gap-2 text-2xl">🔥</div>
          <p className="mt-2 text-3xl font-black leading-none">
            {state.streak.count}
          </p>
          <p className="text-xs font-bold text-ink/50">
            {state.streak.count === 1 ? 'dia de ofensiva' : 'dias de ofensiva'}
          </p>
        </div>
        <div className="card flex flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl">📈</span>
            <span className="text-sm font-black text-brand-500">
              {Math.round(overall * 100)}%
            </span>
          </div>
          <p className="mt-2 text-xs font-bold text-ink/50">
            {doneLessons} de {totalLessons} lições
          </p>
          <div className="mt-1.5">
            <ProgressBar value={overall} color={activeDog.color} />
          </div>
        </div>
      </div>

      {/* Atalhos */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {quickActions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="card flex flex-col items-center gap-1 py-3 active:scale-95"
          >
            <span className="text-2xl">{a.emoji}</span>
            <span className="text-[10px] font-bold text-ink/60">{a.label}</span>
            {a.to === '/conquistas' && (
              <span className="text-[9px] font-black text-brand-500">
                {unlocked}/{achievements.length}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Plano do dia */}
      <div className="mb-3 mt-7 flex items-center justify-between px-1">
        <h2 className="text-lg font-extrabold">Plano de hoje</h2>
        <Link to="/programas" className="text-sm font-bold text-brand-500">
          Ver tudo
        </Link>
      </div>

      {plan.length === 0 ? (
        <div className="card p-5 text-center">
          <p className="text-3xl">🏆</p>
          <p className="mt-2 font-extrabold">Você concluiu tudo!</p>
          <p className="text-sm text-ink/50">
            Continue praticando os comandos para fixar o aprendizado do{' '}
            {activeDog.name}.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {plan.map((item) => (
            <Link
              key={item.lessonId}
              to={`/programas/${item.programId}/${item.lessonId}`}
              className="card flex items-center gap-3 p-3.5 active:scale-[0.99]"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ background: item.color }}
              >
                ▶
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold leading-tight">
                  {item.lessonTitle}
                </p>
                <p className="text-xs text-ink/50">
                  {item.programTitle} · {item.minutes} min
                </p>
              </div>
              <span className="text-ink/30">›</span>
            </Link>
          ))}
        </div>
      )}

      {/* Dica */}
      <div className="mb-3 mt-7 px-1">
        <h2 className="text-lg font-extrabold">Dica do dia</h2>
      </div>
      <div className="card flex gap-3 p-4">
        <span className="text-3xl">{tip.emoji}</span>
        <div>
          <p className="font-bold">{tip.title}</p>
          <p className="text-sm leading-relaxed text-ink/60">{tip.text}</p>
        </div>
      </div>

      {/* Artigo em destaque */}
      <div className="mb-3 mt-7 flex items-center justify-between px-1">
        <h2 className="text-lg font-extrabold">Para ler</h2>
        <Link to="/guia" className="text-sm font-bold text-brand-500">
          Ver guia
        </Link>
      </div>
      <Link
        to={`/guia/${featured.id}`}
        className="card flex items-center gap-3 p-4 active:scale-[0.99]"
      >
        <span className="text-3xl">{featured.emoji}</span>
        <div className="min-w-0">
          <p className="font-bold leading-tight">{featured.title}</p>
          <p className="line-clamp-2 text-xs text-ink/50">{featured.excerpt}</p>
        </div>
      </Link>
    </Page>
  );
}
