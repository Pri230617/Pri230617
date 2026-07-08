import { useState } from 'react';
import { useStore } from '../store/useStore';

const slides = [
  {
    emoji: '🐶',
    title: 'Oi! Bora adestrar o Kazuki?',
    text: 'Um app feito com carinho para transformar seu spitz levado num cãozinho educado e calmo — no ritmo dele.',
  },
  {
    emoji: '🦴',
    title: 'Só reforço positivo',
    text: 'Aqui a gente recompensa os acertos e nunca pune os erros. É o método mais gentil e o que mais funciona com filhotes resgatados.',
  },
  {
    emoji: '🎯',
    title: 'Programas para cada problema',
    text: 'Campainha, latir na rua, chorar quando você sai, autocontrole... tem um plano passo a passo para cada desafio.',
  },
  {
    emoji: '🔥',
    title: 'Um pouquinho todo dia',
    text: 'Sessões de 5 minutos, várias vezes ao dia. Marque as lições feitas e mantenha sua ofensiva acesa!',
  },
];

export default function Onboarding() {
  const { setOnboarded } = useStore();
  const [i, setI] = useState(0);
  const last = i === slides.length - 1;
  const s = slides[i];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50 to-cream px-6 pt-safe">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white text-7xl shadow-soft">
          {s.emoji}
        </div>
        <h1 className="mb-3 text-2xl font-black text-ink">{s.title}</h1>
        <p className="max-w-xs text-base leading-relaxed text-ink/60">{s.text}</p>
      </div>

      <div className="mb-2 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === i ? 'w-6 bg-brand-400' : 'w-2 bg-brand-200'
            }`}
          />
        ))}
      </div>

      <div className="pb-10 pt-4">
        <button
          className="btn-primary w-full text-lg"
          onClick={() => (last ? setOnboarded(true) : setI(i + 1))}
        >
          {last ? 'Começar 🐾' : 'Continuar'}
        </button>
        {!last && (
          <button
            className="mt-2 w-full py-2 text-sm font-bold text-ink/40"
            onClick={() => setOnboarded(true)}
          >
            Pular
          </button>
        )}
      </div>
    </div>
  );
}
