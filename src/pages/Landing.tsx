import { useStore } from '../store/useStore';
import { programs } from '../data/programs';
import { commands } from '../data/commands';
import { articles } from '../data/guide';
import { DogAvatar } from '../components/ui';

const problems = [
  { emoji: '🔔', label: 'Campainha' },
  { emoji: '🚪', label: 'Corredor' },
  { emoji: '🚶', label: 'Latir na rua' },
  { emoji: '🏠', label: 'Ficar sozinho' },
  { emoji: '🧸', label: 'Brinquedos' },
  { emoji: '🧘', label: 'Calma' },
];

const features = [
  {
    emoji: '❤️',
    title: 'Só reforço positivo',
    text: 'O método mais gentil e eficaz: recompensamos o acerto, nunca punimos o erro.',
  },
  {
    emoji: '📚',
    title: 'Passo a passo',
    text: 'Cada treino é dividido em passos curtos, fáceis de seguir no dia a dia.',
  },
  {
    emoji: '🏆',
    title: 'Progresso e conquistas',
    text: 'Ofensiva diária, medalhas e um diário para acompanhar a evolução.',
  },
  {
    emoji: '🧰',
    title: 'Ferramentas de treino',
    text: 'Clicker, apito e cronômetro de sessão prontos na palma da mão.',
  },
];

const steps = [
  {
    n: '1',
    title: 'Escolha um objetivo',
    text: 'Campainha, latir na rua, dividir brinquedos com o Yuki... tem um programa pra cada.',
  },
  {
    n: '2',
    title: 'Treine 5 minutinhos',
    text: 'Siga os passos com petisco e clicker. Sessões curtas, várias vezes ao dia.',
  },
  {
    n: '3',
    title: 'Veja a evolução',
    text: 'Marque as lições, mantenha a ofensiva e desbloqueie conquistas.',
  },
];

export default function Landing({ onStart }: { onStart: () => void }) {
  const { state } = useStore();

  return (
    <div className="min-h-screen bg-cream pb-10">
      {/* HERO */}
      <header className="hero-gradient relative overflow-hidden rounded-b-[2.5rem] px-6 pb-10 pt-safe text-white">
        {/* patinhas decorativas */}
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
          <span className="absolute left-6 top-24 text-3xl">🐾</span>
          <span className="absolute right-8 top-40 text-2xl">🐾</span>
          <span className="absolute right-16 top-16 text-xl">🐾</span>
          <span className="absolute left-10 bottom-10 text-2xl">🐾</span>
        </div>

        <div className="relative flex items-center gap-2 pt-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/25 text-xl backdrop-blur">
            🐾
          </div>
          <span className="text-lg font-black tracking-tight">Adestra</span>
          <span className="ml-auto rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
            sem mensalidade
          </span>
        </div>

        <div className="relative mt-10 flex justify-center gap-2 text-6xl">
          <span className="drop-shadow-sm">🐶</span>
          <span className="mt-3 drop-shadow-sm">🦴</span>
        </div>

        <h1 className="relative mt-6 text-center text-[2rem] font-black leading-tight">
          Eduque o Kazuki com carinho e ciência
        </h1>
        <p className="relative mx-auto mt-3 max-w-xs text-center text-[15px] font-semibold leading-relaxed text-white/90">
          Transforme seu filhote levado num cãozinho educado e calmo — no
          ritmo dele, com reforço positivo.
        </p>

        <button
          onClick={onStart}
          className="relative mt-7 w-full rounded-2xl bg-white py-4 text-lg font-black text-brand-600 shadow-soft transition active:scale-[0.98]"
        >
          Começar agora 🐾
        </button>
      </header>

      {/* NÚMEROS */}
      <section className="-mt-6 px-6">
        <div className="card grid grid-cols-3 divide-x divide-brand-100 p-4 text-center">
          <Stat n={String(programs.length)} label="programas" />
          <Stat n={`${commands.length}+`} label="comandos" />
          <Stat n={String(articles.length)} label="artigos" />
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="mt-10 px-6">
        <h2 className="text-center text-xl font-black">
          Feito para os <span className="text-gradient">desafios reais</span>
        </h2>
        <p className="mx-auto mt-1 max-w-xs text-center text-sm text-ink/50">
          Cada probleminha do dia a dia tem um treino dedicado.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {problems.map((p) => (
            <span
              key={p.label}
              className="chip border border-brand-100 bg-white px-3 py-2 text-sm text-ink/70 shadow-card"
            >
              {p.emoji} {p.label}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-10 px-6">
        <div className="grid grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.title} className="card p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
                {f.emoji}
              </div>
              <h3 className="mt-3 font-extrabold leading-tight">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink/55">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mt-10 px-6">
        <h2 className="text-center text-xl font-black">Como funciona</h2>
        <div className="mt-5 space-y-3">
          {steps.map((s) => (
            <div key={s.n} className="card flex items-start gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-400 text-lg font-black text-white">
                {s.n}
              </div>
              <div>
                <h3 className="font-extrabold leading-tight">{s.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-ink/55">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* A MATILHA */}
      <section className="mt-10 px-6">
        <h2 className="text-center text-xl font-black">Conheça a matilha 🐾</h2>
        <div className="mt-5 space-y-3">
          {state.dogs.map((dog) => (
            <div key={dog.id} className="card flex items-center gap-3 p-4">
              <DogAvatar dog={dog} size={52} />
              <div className="min-w-0">
                <p className="font-extrabold">{dog.name}</p>
                <p className="text-sm text-ink/55">
                  {dog.id === 'kazuki'
                    ? 'O filhote levado que vamos educar 💛'
                    : dog.id === 'yuki'
                      ? 'O lord da casa, nosso exemplo de calma 👑'
                      : dog.breed}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-12 px-6">
        <div className="hero-gradient rounded-3xl p-6 text-center text-white">
          <p className="text-4xl">🐕‍🦺</p>
          <h2 className="mt-3 text-xl font-black leading-tight">
            Bora começar essa jornada?
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-sm font-semibold text-white/90">
            Grátis, sem anúncios, e todo o progresso fica salvo no seu aparelho.
          </p>
          <button
            onClick={onStart}
            className="mt-5 w-full rounded-2xl bg-white py-4 text-lg font-black text-brand-600 shadow-soft transition active:scale-[0.98]"
          >
            Adestrar o Kazuki 🚀
          </button>
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-ink/30">
        Feito com 🐾 e reforço positivo, para o Kazuki e o Yuki
      </p>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="px-2">
      <p className="text-2xl font-black text-brand-500">{n}</p>
      <p className="text-[11px] font-bold text-ink/45">{label}</p>
    </div>
  );
}
