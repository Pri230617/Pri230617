import { useParams } from 'react-router-dom';
import { articlesById } from '../data/guide';
import { Page } from '../components/ui';
import BackButton from '../components/BackButton';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const article = articleId ? articlesById[articleId] : undefined;

  if (!article) {
    return (
      <Page>
        <BackButton label="Guia" />
        <p className="mt-10 text-center text-ink/50">Artigo não encontrado.</p>
      </Page>
    );
  }

  return (
    <Page>
      <BackButton label="Guia" />

      <div className="mt-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-5xl">
        {article.emoji}
      </div>
      <h1 className="mt-3 text-2xl font-black leading-tight">{article.title}</h1>
      <p className="mt-1 text-sm font-bold text-brand-500">
        {article.readMinutes} min de leitura
      </p>

      <article className="mt-5 space-y-5 pb-4">
        {article.sections.map((sec, i) => (
          <section key={i}>
            {sec.heading && (
              <h2 className="mb-1.5 text-lg font-extrabold text-ink">
                {sec.heading}
              </h2>
            )}
            {sec.body && (
              <p className="text-[15px] leading-relaxed text-ink/75">
                {sec.body}
              </p>
            )}
            {sec.list && (
              <ul className="mt-2 space-y-1.5">
                {sec.list.map((item, j) => (
                  <li key={j} className="flex gap-2 text-[15px] leading-relaxed text-ink/75">
                    <span className="mt-1 text-brand-400">🐾</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </Page>
  );
}
