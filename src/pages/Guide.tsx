import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles, articleCategories } from '../data/guide';
import { Page } from '../components/ui';

export default function Guide() {
  const [cat, setCat] = useState<string>('todos');

  const list =
    cat === 'todos' ? articles : articles.filter((a) => a.category === cat);

  return (
    <Page>
      <header className="pt-6">
        <h1 className="text-2xl font-black">Guia</h1>
        <p className="text-sm text-ink/50">
          Tudo o que você precisa saber para educar com carinho.
        </p>
      </header>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCat('todos')}
          className={`chip shrink-0 border px-4 py-2 text-sm ${
            cat === 'todos'
              ? 'border-brand-400 bg-brand-400 text-white'
              : 'border-brand-100 bg-white text-ink/60'
          }`}
        >
          Todos
        </button>
        {articleCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`chip shrink-0 border px-4 py-2 text-sm ${
              cat === c.id
                ? 'border-brand-400 bg-brand-400 text-white'
                : 'border-brand-100 bg-white text-ink/60'
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {list.map((a) => (
          <Link
            key={a.id}
            to={`/guia/${a.id}`}
            className="card flex items-center gap-3 p-4 active:scale-[0.99]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
              {a.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold leading-tight">{a.title}</p>
              <p className="line-clamp-2 text-xs text-ink/50">{a.excerpt}</p>
              <p className="mt-1 text-[11px] font-bold text-brand-500">
                {a.readMinutes} min de leitura
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Page>
  );
}
