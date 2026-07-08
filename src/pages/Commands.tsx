import { useState } from 'react';
import { Link } from 'react-router-dom';
import { commands } from '../data/commands';
import { useStore } from '../store/useStore';
import { Page, DifficultyChip } from '../components/ui';

const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'basico', label: 'Básico' },
  { id: 'comportamento', label: 'Comportamento' },
  { id: 'convivencia', label: 'Convivência' },
  { id: 'vida', label: 'Vida prática' },
  { id: 'truque', label: 'Truques' },
] as const;

export default function Commands() {
  const { state, activeDog } = useStore();
  const [filter, setFilter] = useState<string>('todos');
  const progress = state.progress[activeDog.id];

  const list =
    filter === 'todos'
      ? commands
      : commands.filter((c) => c.category === filter);

  return (
    <Page>
      <header className="pt-6">
        <h1 className="text-2xl font-black">Comandos</h1>
        <p className="text-sm text-ink/50">
          Consulte o passo a passo de cada comando quando quiser.
        </p>
      </header>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`chip shrink-0 border px-4 py-2 text-sm ${
              filter === f.id
                ? 'border-brand-400 bg-brand-400 text-white'
                : 'border-brand-100 bg-white text-ink/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {list.map((c) => {
          const times = progress?.practicedCommands[c.id] ?? 0;
          return (
            <Link
              key={c.id}
              to={`/comandos/${c.id}`}
              className="card flex items-center gap-3 p-3.5 active:scale-[0.99]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
                {c.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-extrabold">{c.name}</p>
                  {times > 0 && (
                    <span className="chip bg-emerald-100 text-emerald-700">
                      {times}×
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-ink/50">{c.summary}</p>
              </div>
              <DifficultyChip level={c.difficulty} />
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
