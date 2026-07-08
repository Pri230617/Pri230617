import { useState } from 'react';
import { useStore } from '../store/useStore';
import { DogAvatar } from './ui';

export default function DogSwitcher() {
  const { state, activeDog, setActiveDog } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 shadow-card"
      >
        <DogAvatar dog={activeDog} size={36} />
        <span className="text-sm font-extrabold">{activeDog.name}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-ink/40">
          <path
            d="m6 9 6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl bg-white p-1 shadow-soft">
            {state.dogs.map((dog) => (
              <button
                key={dog.id}
                onClick={() => {
                  setActiveDog(dog.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left ${
                  dog.id === activeDog.id ? 'bg-brand-50' : ''
                }`}
              >
                <DogAvatar dog={dog} size={34} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{dog.name}</p>
                  <p className="truncate text-xs text-ink/50">{dog.breed}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
