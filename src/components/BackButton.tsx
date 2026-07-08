import { useNavigate } from 'react-router-dom';

export default function BackButton({ label }: { label?: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="mt-4 flex items-center gap-1 text-sm font-bold text-ink/50"
    >
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          d="m15 6-6 6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label ?? 'Voltar'}
    </button>
  );
}
