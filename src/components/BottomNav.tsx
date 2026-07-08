import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Início', icon: HomeIcon, end: true },
  { to: '/programas', label: 'Programas', icon: BookIcon, end: false },
  { to: '/comandos', label: 'Comandos', icon: TargetIcon, end: false },
  { to: '/ferramentas', label: 'Ferramentas', icon: ToolIcon, end: false },
  { to: '/perfil', label: 'Perfil', icon: DogIcon, end: false },
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-brand-100 bg-white/95 pb-safe backdrop-blur">
      <ul className="flex items-stretch justify-around px-1 pt-1.5">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-bold transition ${
                  isActive ? 'text-brand-500' : 'text-ink/40'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon active={isActive} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface IconProps {
  active: boolean;
}

function base(active: boolean) {
  return {
    width: 24,
    height: 24,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: active ? 2.4 : 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
}

function HomeIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9.5 20v-5h5v5" />
    </svg>
  );
}
function BookIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  );
}
function TargetIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ToolIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <path d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.6l-6 6 2 2 6-6a3.5 3.5 0 0 0 4.6-4.6l-2.2 2.2-1.8-1.8z" />
    </svg>
  );
}
function DogIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <path d="M10 5 7 3v4" />
      <path d="M14 5l3-2v4" />
      <path d="M5 9c0-1 1-2 2-2h10c1 0 2 1 2 2v3a7 7 0 0 1-14 0z" />
      <path d="M9 13h.01M15 13h.01" />
      <path d="M12 16v1" />
    </svg>
  );
}
