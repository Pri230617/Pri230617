import { useStore } from '../store/useStore';
import { computeAchievements } from '../data/achievements';
import { Page, ProgressBar } from '../components/ui';
import BackButton from '../components/BackButton';

export default function Achievements() {
  const { state, activeDog } = useStore();
  const list = computeAchievements(state, activeDog.id);
  const unlocked = list.filter((a) => a.unlocked).length;

  return (
    <Page>
      <BackButton label="Voltar" />

      <header className="mt-2">
        <h1 className="text-2xl font-black">Conquistas</h1>
        <p className="text-sm text-ink/50">
          {unlocked} de {list.length} desbloqueadas com o {activeDog.name}
        </p>
      </header>

      <div className="mt-3">
        <ProgressBar value={unlocked / list.length} color={activeDog.color} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 pb-4">
        {list.map((a) => (
          <div
            key={a.id}
            className={`card flex flex-col items-center p-4 text-center transition ${
              a.unlocked ? '' : 'opacity-70'
            }`}
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl ${
                a.unlocked
                  ? 'bg-brand-100'
                  : 'bg-ink/5 grayscale'
              }`}
            >
              {a.unlocked ? a.emoji : '🔒'}
            </div>
            <p className="mt-2 text-sm font-extrabold leading-tight">{a.title}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-ink/50">{a.desc}</p>
            {!a.unlocked && a.progress > 0 && (
              <div className="mt-2 w-full">
                <ProgressBar value={a.progress} color={activeDog.color} />
                {a.progressLabel && (
                  <p className="mt-1 text-[10px] font-bold text-ink/40">
                    {a.progressLabel}
                  </p>
                )}
              </div>
            )}
            {a.unlocked && (
              <span className="chip mt-2 bg-emerald-100 text-emerald-700">
                ✓ conquistado
              </span>
            )}
          </div>
        ))}
      </div>
    </Page>
  );
}
