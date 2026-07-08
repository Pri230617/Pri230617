import { useRef, useState } from 'react';
import { Page } from '../components/ui';
import SessionTimer from '../components/SessionTimer';
import { playClick, startWhistle } from '../lib/audio';

export default function Tools() {
  const [clicks, setClicks] = useState(0);
  const [whistling, setWhistling] = useState(false);
  const stopRef = useRef<null | (() => void)>(null);

  function startW() {
    if (stopRef.current) return;
    stopRef.current = startWhistle();
    setWhistling(true);
  }
  function stopW() {
    stopRef.current?.();
    stopRef.current = null;
    setWhistling(false);
  }

  return (
    <Page>
      <header className="pt-6">
        <h1 className="text-2xl font-black">Ferramentas</h1>
        <p className="text-sm text-ink/50">
          Seu kit de treino de bolso. Deixe o som ligado 🔊
        </p>
      </header>

      {/* Clicker */}
      <section className="mt-5">
        <h2 className="mb-2 px-1 text-lg font-extrabold">Clicker</h2>
        <button
          onClick={() => {
            playClick();
            setClicks((c) => c + 1);
          }}
          className="flex h-44 w-full flex-col items-center justify-center rounded-3xl bg-brand-400 text-white shadow-soft active:scale-[0.98]"
        >
          <span className="text-6xl">🔊</span>
          <span className="mt-2 text-xl font-black">CLICK</span>
          <span className="text-sm opacity-80">{clicks} cliques hoje</span>
        </button>
        <p className="mt-2 px-1 text-xs text-ink/50">
          Marque o acerto no instante exato e recompense logo depois.
        </p>
      </section>

      {/* Apito */}
      <section className="mt-7">
        <h2 className="mb-2 px-1 text-lg font-extrabold">Apito</h2>
        <button
          onPointerDown={startW}
          onPointerUp={stopW}
          onPointerLeave={stopW}
          onPointerCancel={stopW}
          className={`flex h-32 w-full flex-col items-center justify-center rounded-3xl text-white shadow-soft transition ${
            whistling ? 'scale-[0.98] bg-brand-600' : 'bg-brand-500'
          }`}
        >
          <span className="text-5xl">📣</span>
          <span className="mt-1 font-black">
            {whistling ? 'Apitando…' : 'Segure para apitar'}
          </span>
        </button>
        <p className="mt-2 px-1 text-xs text-ink/50">
          Use com moderação para chamar a atenção — nunca perto demais do ouvido dele.
        </p>
      </section>

      {/* Timer livre */}
      <section className="mt-7">
        <h2 className="mb-2 px-1 text-lg font-extrabold">Cronômetro livre</h2>
        <SessionTimer minutes={5} />
      </section>
    </Page>
  );
}
