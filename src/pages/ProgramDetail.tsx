import { useParams, Link, useNavigate } from 'react-router-dom';
import { programsById } from '../data/programs';
import { useStore } from '../store/useStore';
import { Page, ProgressBar, DifficultyChip } from '../components/ui';
import BackButton from '../components/BackButton';

export default function ProgramDetail() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { isLessonDone } = useStore();
  const program = programId ? programsById[programId] : undefined;

  if (!program) {
    return (
      <Page>
        <BackButton />
        <p className="mt-10 text-center text-ink/50">Programa não encontrado.</p>
      </Page>
    );
  }

  const done = program.lessons.filter((l) => isLessonDone(l.id)).length;
  const ratio = done / program.lessons.length;
  const nextLesson = program.lessons.find((l) => !isLessonDone(l.id));

  return (
    <Page>
      <BackButton />

      <div
        className="mt-2 rounded-3xl p-5 text-white"
        style={{ background: program.color }}
      >
        <div className="text-5xl">{program.emoji}</div>
        <h1 className="mt-2 text-2xl font-black leading-tight">
          {program.title}
        </h1>
        <p className="text-sm opacity-90">{program.tagline}</p>
        {program.forProblem && (
          <span className="chip mt-3 bg-white/25 text-white">
            🎯 {program.forProblem}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <DifficultyChip level={program.level} />
        <span className="text-xs font-bold text-ink/40">
          {program.lessons.length} lições
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        {program.description}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <ProgressBar value={ratio} color={program.color} />
        <span className="shrink-0 text-xs font-bold text-ink/50">
          {done}/{program.lessons.length}
        </span>
      </div>

      {nextLesson && (
        <button
          className="btn-primary mt-4 w-full"
          onClick={() =>
            navigate(`/programas/${program.id}/${nextLesson.id}`)
          }
        >
          {done === 0 ? 'Começar programa' : 'Continuar'} ▶
        </button>
      )}

      <h2 className="mb-2 mt-7 px-1 text-lg font-extrabold">Lições</h2>
      <ol className="space-y-3">
        {program.lessons.map((l, idx) => {
          const complete = isLessonDone(l.id);
          return (
            <li key={l.id}>
              <Link
                to={`/programas/${program.id}/${l.id}`}
                className="card flex items-center gap-3 p-3.5 active:scale-[0.99]"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    complete
                      ? 'bg-emerald-500 text-white'
                      : 'bg-brand-100 text-brand-600'
                  }`}
                >
                  {complete ? '✓' : idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold leading-tight">{l.title}</p>
                  <p className="truncate text-xs text-ink/50">
                    {l.goal}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-bold text-ink/40">
                  {l.minutes}min
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Page>
  );
}
