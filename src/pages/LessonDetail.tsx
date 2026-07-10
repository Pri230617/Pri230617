import { useParams, useNavigate } from 'react-router-dom';
import { programsById } from '../data/programs';
import { useStore } from '../store/useStore';
import { Page } from '../components/ui';
import BackButton from '../components/BackButton';
import SessionTimer from '../components/SessionTimer';
import TechniqueIllustration from '../components/TechniqueIllustration';

// cada programa mostra a cena mais representativa do seu objetivo
const programScene: Record<string, string> = {
  fundamentos: 'sentar',
  campainha: 'campainha',
  corredor: 'quieto',
  sozinho: 'sozinho',
  rua: 'olha',
  autocontrole: 'calma',
  convivencia: 'espera-a-vez',
  brinquedos: 'troca',
  reatividade: 'reatividade',
  socializacao: 'amizades',
};

export default function LessonDetail() {
  const { programId, lessonId } = useParams();
  const navigate = useNavigate();
  const { activeDog, isLessonDone, toggleLesson, logSession } = useStore();

  const program = programId ? programsById[programId] : undefined;
  const lesson = program?.lessons.find((l) => l.id === lessonId);

  if (!program || !lesson) {
    return (
      <Page>
        <BackButton />
        <p className="mt-10 text-center text-ink/50">Lição não encontrada.</p>
      </Page>
    );
  }

  const done = isLessonDone(lesson.id);
  const idx = program.lessons.findIndex((l) => l.id === lesson.id);
  const next = program.lessons[idx + 1];

  function handleComplete() {
    if (!done) logSession(lesson!.title, lesson!.minutes);
    toggleLesson(lesson!.id);
    if (!done && next) {
      navigate(`/programas/${program!.id}/${next.id}`);
    }
  }

  return (
    <Page>
      <BackButton label={program.title} />

      <div className="mt-2 flex items-center gap-2 text-sm font-bold text-ink/40">
        <span>Lição {idx + 1} de {program.lessons.length}</span>
        <span>·</span>
        <span>{lesson.minutes} min</span>
      </div>
      <h1 className="mt-1 text-2xl font-black leading-tight">{lesson.title}</h1>

      <div
        className="mt-4 rounded-2xl p-4"
        style={{ background: `${program.color}18` }}
      >
        <p className="text-xs font-black uppercase tracking-wide" style={{ color: program.color }}>
          🎯 Objetivo
        </p>
        <p className="mt-1 text-sm font-semibold text-ink/80">{lesson.goal}</p>
      </div>

      <h2 className="mb-2 mt-6 px-1 text-lg font-extrabold">Veja como fazer ✏️</h2>
      <TechniqueIllustration
        sceneKey={programScene[program.id] ?? 'sentar'}
        accent={program.color}
      />

      <h2 className="mb-2 mt-6 px-1 text-lg font-extrabold">Passo a passo</h2>
      <ol className="space-y-2.5">
        {lesson.steps.map((step, i) => (
          <li key={i} className="card flex gap-3 p-3.5">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
              style={{ background: program.color }}
            >
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-ink/80">{step}</p>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-600">
          ✅ Como saber que deu certo
        </p>
        <p className="mt-1 text-sm font-semibold text-emerald-800">
          {lesson.successSign}
        </p>
      </div>

      <h2 className="mb-2 mt-7 px-1 text-lg font-extrabold">
        Cronômetro + Clicker
      </h2>
      <SessionTimer minutes={lesson.minutes} accent={program.color} />

      <div className="sticky bottom-24 mt-6">
        <button
          className={`w-full ${done ? 'btn-ghost' : 'btn-primary'}`}
          onClick={handleComplete}
        >
          {done
            ? '↩︎ Marcar como não feita'
            : `✓ Concluí com o ${activeDog.name}`}
        </button>
      </div>
    </Page>
  );
}
