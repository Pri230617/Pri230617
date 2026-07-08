import { useEffect, useRef, useState } from 'react';
import { playClick, playBeep } from '../lib/audio';

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/**
 * Cronômetro de sessão com clicker embutido.
 * Conta regressivamente a partir de `minutes` e avisa no fim.
 */
export default function SessionTimer({
  minutes,
  accent = '#e39236',
}: {
  minutes: number;
  accent?: string;
}) {
  const [remaining, setRemaining] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = window.setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            window.clearInterval(ref.current!);
            setRunning(false);
            playBeep(3);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
  }, [running]);

  const total = minutes * 60;
  const pct = total ? 1 - remaining / total : 0;

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink/40">
            Sessão
          </p>
          <p className="text-4xl font-black tabular-nums" style={{ color: accent }}>
            {fmt(remaining)}
          </p>
        </div>
        <button
          onClick={playClick}
          className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-brand-50 text-brand-600 active:scale-95"
          aria-label="Clicker"
        >
          <span className="text-2xl">🔊</span>
          <span className="text-[10px] font-black">CLICK</span>
        </button>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct * 100}%`, background: accent }}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="btn-primary flex-1"
          onClick={() => {
            if (remaining === 0) setRemaining(total);
            setRunning((r) => !r);
          }}
          style={{ background: accent }}
        >
          {running ? 'Pausar' : remaining === 0 ? 'Repetir' : 'Iniciar'}
        </button>
        <button
          className="btn-ghost"
          onClick={() => {
            setRunning(false);
            setRemaining(total);
          }}
        >
          Zerar
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-ink/40">
        Toque em CLICK no exato momento em que ele acertar 🎯
      </p>
    </div>
  );
}
