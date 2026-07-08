import { Link } from 'react-router-dom';
import { programs } from '../data/programs';
import { useStore } from '../store/useStore';
import { Page, ProgressBar, DifficultyChip } from '../components/ui';

export default function Programs() {
  const { state, activeDog } = useStore();
  const progress = state.progress[activeDog.id];

  return (
    <Page>
      <header className="pt-6">
        <h1 className="text-2xl font-black">Programas</h1>
        <p className="text-sm text-ink/50">
          Escolha um objetivo e siga o passo a passo com o {activeDog.name}.
        </p>
      </header>

      <div className="mt-5 space-y-4">
        {programs.map((p) => {
          const done = p.lessons.filter((l) => progress?.completedLessons[l.id]).length;
          const ratio = p.lessons.length ? done / p.lessons.length : 0;
          return (
            <Link
              key={p.id}
              to={`/programas/${p.id}`}
              className="card block overflow-hidden active:scale-[0.99]"
            >
              <div className="flex items-start gap-3 p-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: `${p.color}22` }}
                >
                  {p.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-extrabold">{p.title}</h3>
                  </div>
                  <p className="text-sm text-ink/50">{p.tagline}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <DifficultyChip level={p.level} />
                    <span className="text-xs font-bold text-ink/40">
                      {p.lessons.length} lições
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 pb-4">
                <ProgressBar value={ratio} color={p.color} />
                <span className="shrink-0 text-xs font-bold text-ink/50">
                  {done}/{p.lessons.length}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
