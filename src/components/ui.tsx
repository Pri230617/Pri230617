import type { ReactNode } from 'react';
import type { Difficulty, Dog } from '../types';

export function DogAvatar({ dog, size = 44 }: { dog: Dog; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full shadow-inner"
      style={{
        width: size,
        height: size,
        background: `${dog.color}22`,
        border: `2px solid ${dog.color}`,
        fontSize: size * 0.5,
      }}
      aria-hidden
    >
      {dog.emoji}
    </div>
  );
}

export function ProgressBar({
  value,
  color = '#e39236',
}: {
  value: number; // 0..1
  color?: string;
}) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-100">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

const diffMap: Record<Difficulty, { label: string; cls: string }> = {
  facil: { label: 'Fácil', cls: 'bg-emerald-100 text-emerald-700' },
  medio: { label: 'Médio', cls: 'bg-amber-100 text-amber-700' },
  dificil: { label: 'Avançado', cls: 'bg-rose-100 text-rose-700' },
};

export function DifficultyChip({ level }: { level: Difficulty }) {
  const d = diffMap[level];
  return <span className={`chip ${d.cls}`}>{d.label}</span>;
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 mt-6 flex items-center justify-between px-1">
      <h2 className="text-lg font-extrabold text-ink">{children}</h2>
      {action}
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="px-4 pt-safe">{children}</div>;
}
