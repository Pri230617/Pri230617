import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Page } from '../components/ui';
import BackButton from '../components/BackButton';
import type { SessionLog } from '../types';

const moods: { id: NonNullable<SessionLog['mood']>; emoji: string; label: string }[] = [
  { id: 'otimo', emoji: '😄', label: 'Ótima' },
  { id: 'ok', emoji: '🙂', label: 'Ok' },
  { id: 'dificil', emoji: '😅', label: 'Difícil' },
];

function fmtDay(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yst = new Date();
  yst.setDate(today.getDate() - 1);
  const k = (x: Date) => x.toISOString().slice(0, 10);
  if (k(d) === k(today)) return 'Hoje';
  if (k(d) === k(yst)) return 'Ontem';
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
  });
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Journal() {
  const { state, activeDog, addJournalEntry, deleteSession } = useStore();
  const [open, setOpen] = useState(false);

  const sessions = state.sessions.filter((s) => s.dogId === activeDog.id);

  // agrupa por dia
  const groups: Record<string, SessionLog[]> = {};
  for (const s of sessions) {
    const day = s.date.slice(0, 10);
    (groups[day] ??= []).push(s);
  }
  const days = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <Page>
      <BackButton label="Voltar" />

      <header className="mt-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Diário</h1>
          <p className="text-sm text-ink/50">
            Histórico de treinos do {activeDog.name}
          </p>
        </div>
        <button className="btn-primary px-4 py-2" onClick={() => setOpen(true)}>
          + Registrar
        </button>
      </header>

      {days.length === 0 ? (
        <div className="card mt-6 p-6 text-center">
          <p className="text-4xl">📔</p>
          <p className="mt-2 font-extrabold">Diário vazio</p>
          <p className="text-sm text-ink/50">
            Complete lições e comandos ou registre um treino para começar seu
            histórico.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-6 pb-4">
          {days.map((day) => (
            <div key={day}>
              <h2 className="mb-2 px-1 text-sm font-black uppercase tracking-wide text-ink/40">
                {fmtDay(day)}
              </h2>
              <div className="space-y-2">
                {groups[day].map((s) => {
                  const mood = moods.find((m) => m.id === s.mood);
                  return (
                    <div key={s.id} className="card p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">
                          {mood ? mood.emoji : s.manual ? '📝' : '🎯'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold leading-tight">
                            {s.label}
                          </p>
                          <p className="text-xs text-ink/50">
                            {fmtTime(s.date)} · {s.minutes} min
                          </p>
                        </div>
                        <button
                          onClick={() => deleteSession(s.id)}
                          className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-ink/30"
                          aria-label="Excluir"
                        >
                          ✕
                        </button>
                      </div>
                      {s.note && (
                        <p className="mt-2 rounded-xl bg-brand-50/60 p-2.5 text-sm italic text-ink/70">
                          {s.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <EntryForm
          onClose={() => setOpen(false)}
          onSave={(entry) => {
            addJournalEntry(entry);
            setOpen(false);
          }}
        />
      )}
    </Page>
  );
}

function EntryForm({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (e: {
    label: string;
    minutes: number;
    note?: string;
    mood?: SessionLog['mood'];
  }) => void;
}) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState(5);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState<SessionLog['mood']>('otimo');

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 pb-safe">
      <div className="mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream p-5">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15" />
        <h2 className="text-xl font-black">Registrar treino</h2>

        <label className="mt-4 block text-sm font-bold text-ink/60">
          O que treinaram?
        </label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="mt-1 w-full rounded-xl border border-brand-100 bg-white px-3 py-2.5 font-semibold outline-none focus:border-brand-400"
          placeholder="Ex: Passeio sem puxar"
        />

        <label className="mt-3 block text-sm font-bold text-ink/60">
          Duração: {minutes} min
        </label>
        <input
          type="range"
          min={1}
          max={30}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="mt-2 w-full accent-brand-400"
        />

        <label className="mt-3 block text-sm font-bold text-ink/60">
          Como foi?
        </label>
        <div className="mt-1 flex gap-2">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              className={`chip flex-1 justify-center border py-2.5 text-sm ${
                mood === m.id
                  ? 'border-brand-400 bg-brand-400 text-white'
                  : 'border-brand-100 bg-white text-ink/60'
              }`}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        <label className="mt-3 block text-sm font-bold text-ink/60">
          Anotações (opcional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1 w-full resize-none rounded-xl border border-brand-100 bg-white px-3 py-2.5 font-semibold outline-none focus:border-brand-400"
          placeholder="Como o Kazuki reagiu? O que melhorou?"
        />

        <div className="mt-5 flex gap-2">
          <button className="btn-ghost flex-1" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-primary flex-1"
            onClick={() =>
              onSave({
                label: label.trim() || 'Sessão de treino',
                minutes,
                note: note.trim() || undefined,
                mood,
              })
            }
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
