import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { programs } from '../data/programs';
import { Page, DogAvatar, ProgressBar } from '../components/ui';
import type { Dog, DogSize } from '../types';

function timeAtHome(iso?: string): string | null {
  if (!iso) return null;
  const start = new Date(iso + 'T00:00:00');
  const now = new Date();
  const days = Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86400000));
  if (days < 31) return `${days} dia${days === 1 ? '' : 's'} em casa`;
  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? 'mês' : 'meses'} em casa`;
}

const emojiOptions = ['🐶', '🦴', '🐕', '🐩', '🐾', '🦮', '🐕‍🦺', '🐺'];
const colorOptions = ['#e39236', '#8a63c8', '#2f8f6b', '#3f7fd0', '#d64f7a', '#d4a017'];

export default function Profile() {
  const { state, activeDog, updateDog, addDog, removeDog, resetAll } = useStore();
  const [editing, setEditing] = useState<Dog | null>(null);
  const [adding, setAdding] = useState(false);

  const totalLessons = programs.reduce((n, p) => n + p.lessons.length, 0);
  const totalMinutes = state.sessions.reduce((n, s) => n + s.minutes, 0);

  return (
    <Page>
      <header className="pt-6">
        <h1 className="text-2xl font-black">Meus cães</h1>
        <p className="text-sm text-ink/50">Perfis, progresso e ajustes.</p>
      </header>

      {/* Estatísticas gerais */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat label="Ofensiva" value={`${state.streak.count}🔥`} />
        <Stat label="Sessões" value={String(state.sessions.length)} />
        <Stat label="Minutos" value={String(totalMinutes)} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Link to="/conquistas" className="btn-ghost">
          🏆 Conquistas
        </Link>
        <Link to="/diario" className="btn-ghost">
          📔 Diário
        </Link>
        <Link to="/lembretes" className="btn-ghost col-span-2">
          🔔 Lembretes de treino
        </Link>
      </div>

      {/* Cards de cães */}
      <div className="mt-5 space-y-4">
        {state.dogs.map((dog) => {
          const prog = state.progress[dog.id];
          const done = prog ? Object.keys(prog.completedLessons).length : 0;
          const home = timeAtHome(dog.arrivalDate);
          return (
            <div key={dog.id} className="card p-4">
              <div className="flex items-center gap-3">
                <DogAvatar dog={dog} size={56} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-lg font-extrabold">{dog.name}</h3>
                    {dog.id === activeDog.id && (
                      <span className="chip bg-brand-100 text-brand-700">ativo</span>
                    )}
                  </div>
                  <p className="truncate text-xs text-ink/50">{dog.breed}</p>
                  {home && (
                    <p className="text-xs font-bold text-ink/40">🏡 {home}</p>
                  )}
                </div>
                <button
                  onClick={() => setEditing(dog)}
                  className="rounded-xl bg-brand-50 px-3 py-2 text-xs font-bold text-brand-600"
                >
                  Editar
                </button>
              </div>

              {dog.notes && (
                <p className="mt-3 rounded-xl bg-brand-50/60 p-3 text-sm italic text-ink/60">
                  "{dog.notes}"
                </p>
              )}

              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={totalLessons ? done / totalLessons : 0} color={dog.color} />
                <span className="shrink-0 text-xs font-bold text-ink/50">
                  {done}/{totalLessons}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="btn-ghost mt-4 w-full"
        onClick={() => setAdding(true)}
      >
        + Adicionar outro cão
      </button>

      <button
        className="mt-8 w-full py-3 text-sm font-bold text-rose-500"
        onClick={() => {
          if (confirm('Isso apaga TODO o progresso e volta ao início. Tem certeza?')) {
            resetAll();
          }
        }}
      >
        Zerar todos os dados
      </button>

      <p className="mb-4 mt-6 text-center text-xs text-ink/30">
        Feito com 🐾 para o Kazuki e o Yuki · reforço positivo
      </p>

      {editing && (
        <DogForm
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(patch) => {
            updateDog(editing.id, patch);
            setEditing(null);
          }}
          onDelete={
            state.dogs.length > 1
              ? () => {
                  if (confirm(`Remover ${editing.name}?`)) {
                    removeDog(editing.id);
                    setEditing(null);
                  }
                }
              : undefined
          }
        />
      )}

      {adding && (
        <DogForm
          onClose={() => setAdding(false)}
          onSave={(patch) => {
            addDog({
              name: patch.name || 'Novo cão',
              breed: patch.breed || '',
              size: patch.size || 'pequeno',
              emoji: patch.emoji || '🐶',
              color: patch.color || '#e39236',
              notes: patch.notes,
              arrivalDate: patch.arrivalDate,
            });
            setAdding(false);
          }}
        />
      )}
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-3 text-center">
      <p className="text-xl font-black">{value}</p>
      <p className="text-[11px] font-bold text-ink/40">{label}</p>
    </div>
  );
}

function DogForm({
  initial,
  onClose,
  onSave,
  onDelete,
}: {
  initial?: Dog;
  onClose: () => void;
  onSave: (patch: Partial<Dog>) => void;
  onDelete?: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [breed, setBreed] = useState(initial?.breed ?? '');
  const [size, setSize] = useState<DogSize>(initial?.size ?? 'pequeno');
  const [emoji, setEmoji] = useState(initial?.emoji ?? '🐶');
  const [color, setColor] = useState(initial?.color ?? '#e39236');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [arrivalDate, setArrivalDate] = useState(initial?.arrivalDate ?? '');

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 pb-safe">
      <div className="mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream p-5">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15" />
        <h2 className="text-xl font-black">
          {initial ? `Editar ${initial.name}` : 'Novo cão'}
        </h2>

        <label className="mt-4 block text-sm font-bold text-ink/60">Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-brand-100 bg-white px-3 py-2.5 font-semibold outline-none focus:border-brand-400"
          placeholder="Nome do cão"
        />

        <label className="mt-3 block text-sm font-bold text-ink/60">Raça</label>
        <input
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="mt-1 w-full rounded-xl border border-brand-100 bg-white px-3 py-2.5 font-semibold outline-none focus:border-brand-400"
          placeholder="Ex: Spitz Alemão"
        />

        <label className="mt-3 block text-sm font-bold text-ink/60">
          Chegou em casa
        </label>
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          className="mt-1 w-full rounded-xl border border-brand-100 bg-white px-3 py-2.5 font-semibold outline-none focus:border-brand-400"
        />

        <label className="mt-3 block text-sm font-bold text-ink/60">Porte</label>
        <div className="mt-1 flex gap-2">
          {(['pequeno', 'medio', 'grande'] as DogSize[]).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`chip flex-1 justify-center border py-2 capitalize ${
                size === s
                  ? 'border-brand-400 bg-brand-400 text-white'
                  : 'border-brand-100 bg-white text-ink/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <label className="mt-3 block text-sm font-bold text-ink/60">Ícone</label>
        <div className="mt-1 flex flex-wrap gap-2">
          {emojiOptions.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${
                emoji === e ? 'bg-brand-400' : 'bg-white'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <label className="mt-3 block text-sm font-bold text-ink/60">Cor</label>
        <div className="mt-1 flex gap-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="h-9 w-9 rounded-full"
              style={{
                background: c,
                outline: color === c ? '3px solid #2c2420' : 'none',
                outlineOffset: 2,
              }}
              aria-label={c}
            />
          ))}
        </div>

        <label className="mt-3 block text-sm font-bold text-ink/60">
          Observações
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="mt-1 w-full resize-none rounded-xl border border-brand-100 bg-white px-3 py-2.5 font-semibold outline-none focus:border-brand-400"
          placeholder="Temperamento, histórico..."
        />

        <div className="mt-5 flex gap-2">
          <button className="btn-ghost flex-1" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-primary flex-1"
            onClick={() =>
              onSave({ name, breed, size, emoji, color, notes, arrivalDate })
            }
          >
            Salvar
          </button>
        </div>

        {onDelete && (
          <button
            className="mt-3 w-full py-2 text-sm font-bold text-rose-500"
            onClick={onDelete}
          >
            Remover este cão
          </button>
        )}
      </div>
    </div>
  );
}
