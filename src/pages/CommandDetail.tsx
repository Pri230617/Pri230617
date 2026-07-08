import { useParams } from 'react-router-dom';
import { commandsById } from '../data/commands';
import { useStore } from '../store/useStore';
import { Page, DifficultyChip } from '../components/ui';
import BackButton from '../components/BackButton';
import SessionTimer from '../components/SessionTimer';
import TechniqueIllustration from '../components/TechniqueIllustration';

export default function CommandDetail() {
  const { commandId } = useParams();
  const { state, activeDog, practiceCommand } = useStore();
  const command = commandId ? commandsById[commandId] : undefined;

  if (!command) {
    return (
      <Page>
        <BackButton />
        <p className="mt-10 text-center text-ink/50">Comando não encontrado.</p>
      </Page>
    );
  }

  const times = state.progress[activeDog.id]?.practicedCommands[command.id] ?? 0;

  return (
    <Page>
      <BackButton label="Comandos" />

      <div className="mt-2 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-4xl">
          {command.emoji}
        </div>
        <div>
          <h1 className="text-2xl font-black leading-tight">{command.name}</h1>
          <p className="text-sm font-bold text-brand-500">{command.cue}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <DifficultyChip level={command.difficulty} />
        <span className="chip bg-brand-50 text-brand-600">
          ⏱️ {command.minutes} min
        </span>
        {times > 0 && (
          <span className="chip bg-emerald-100 text-emerald-700">
            praticado {times}×
          </span>
        )}
      </div>

      <div className="mt-4 rounded-2xl bg-brand-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-brand-600">
          Por que treinar
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">{command.why}</p>
      </div>

      <h2 className="mb-2 mt-6 px-1 text-lg font-extrabold">Veja como fazer ✏️</h2>
      <TechniqueIllustration sceneKey={command.id} />
      <p className="mt-2 px-1 text-xs text-ink/40">
        Ilustração do gesto principal. Siga o passo a passo abaixo com petisco e
        clicker (reforço positivo).
      </p>

      <h2 className="mb-2 mt-6 px-1 text-lg font-extrabold">Passo a passo</h2>
      <ol className="space-y-2.5">
        {command.steps.map((step, i) => (
          <li key={i} className="card flex gap-3 p-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-400 text-sm font-black text-white">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-ink/80">{step}</p>
          </li>
        ))}
      </ol>

      <h2 className="mb-2 mt-6 px-1 text-lg font-extrabold">Dicas</h2>
      <div className="space-y-2">
        {command.tips.map((tip, i) => (
          <div key={i} className="flex gap-2 rounded-2xl bg-white p-3 shadow-card">
            <span className="text-lg">💡</span>
            <p className="text-sm leading-relaxed text-ink/70">{tip}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-2 mt-7 px-1 text-lg font-extrabold">
        Cronômetro + Clicker
      </h2>
      <SessionTimer minutes={command.minutes} />

      <button
        className="btn-primary mt-6 w-full"
        onClick={() => practiceCommand(command.id, command.minutes)}
      >
        ✓ Registrei uma sessão com o {activeDog.name}
      </button>
    </Page>
  );
}
