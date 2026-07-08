import { ytSearch } from '../lib/video';

/**
 * Cartão de vídeo com "miniatura" ilustrada. Abre uma busca no YouTube
 * já filtrada para o treino específico — reforço positivo, em português.
 */
export default function VideoGuide({
  emoji,
  query,
  accent = '#e39236',
}: {
  emoji: string;
  query: string;
  accent?: string;
}) {
  const url = ytSearch(`${query} adestramento cachorro reforço positivo`);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card block overflow-hidden active:scale-[0.99]"
    >
      {/* miniatura */}
      <div
        className="relative flex h-40 items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(120% 90% at 70% 10%, rgba(255,255,255,.35), rgba(255,255,255,0) 55%), linear-gradient(160deg, ${accent}, ${accent}cc)`,
        }}
      >
        <span className="text-6xl drop-shadow-sm">{emoji}</span>
        {/* patinhas decorativas */}
        <span className="absolute left-4 top-4 text-xl opacity-30">🐾</span>
        <span className="absolute bottom-4 right-6 text-lg opacity-30">🐾</span>
        {/* botão play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-soft">
            <svg width="26" height="26" viewBox="0 0 24 24" className="ml-1">
              <path d="M6 4.5v15l13-7.5z" fill={accent} />
            </svg>
          </div>
        </div>
      </div>
      {/* rodapé */}
      <div className="flex items-center gap-2 p-3.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-lg">
          ▶️
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold leading-tight">
            Ver vídeos de exemplo
          </p>
          <p className="truncate text-xs text-ink/50">
            Abre buscas no YouTube sobre este treino
          </p>
        </div>
        <span className="text-ink/30">↗</span>
      </div>
    </a>
  );
}
