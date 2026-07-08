// Adereços reutilizáveis das ilustrações (mão, petisco, setas, tapete...).
// Tudo desenhado por nós — arte original.

const SKIN = '#f2c9a0';
const SKIN_D = '#e6b485';

export function Treat({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={-r} cy={0} r={r} fill="#8a5a34" />
      <circle cx={r} cy={0} r={r} fill="#8a5a34" />
      <rect x={-r} y={-r * 0.7} width={r * 2} height={r * 1.4} rx={r * 0.6} fill="#a06a3e" />
    </g>
  );
}

export function Hand({
  x,
  y,
  rot = 0,
  treat = true,
}: {
  x: number;
  y: number;
  rot?: number;
  treat?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {/* punho/braço */}
      <rect x={2} y={-9} width={26} height={18} rx={9} fill={SKIN} />
      {/* dedos que seguram */}
      <circle cx={2} cy={-6} r={5} fill={SKIN} />
      <circle cx={-2} cy={0} r={5.5} fill={SKIN_D} />
      <circle cx={2} cy={6} r={5} fill={SKIN} />
      {treat && <Treat x={-6} y={0} r={4} />}
    </g>
  );
}

export function OpenPalm({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-12} y={-14} width={24} height={26} rx={11} fill={SKIN} />
      <rect x={-11} y={-22} width={5} height={12} rx={2.5} fill={SKIN} />
      <rect x={-3} y={-24} width={5} height={14} rx={2.5} fill={SKIN} />
      <rect x={5} y={-22} width={5} height={12} rx={2.5} fill={SKIN} />
      <rect x={12} y={-16} width={9} height={5} rx={2.5} fill={SKIN} transform="rotate(40 12 -14)" />
    </g>
  );
}

export function Arrow({
  d,
  color = '#e39236',
  markerId,
}: {
  d: string;
  color?: string;
  markerId: string;
}) {
  return (
    <g>
      <defs>
        <marker
          id={markerId}
          markerUnits="userSpaceOnUse"
          markerWidth="13"
          markerHeight="13"
          refX="6"
          refY="6.5"
          orient="auto"
        >
          <path d="M0 0 L13 6.5 L0 13 Z" fill={color} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.5 7"
        markerEnd={`url(#${markerId})`}
      />
    </g>
  );
}

export function Mat({ x, y, w = 120, color = '#c9a06b' }: { x: number; y: number; w?: number; color?: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={w / 2} ry={12} fill={color} opacity={0.35} />
      <ellipse cx={x} cy={y} rx={w / 2 - 8} ry={8} fill={color} opacity={0.5} />
    </g>
  );
}

export function Bed({ x, y, color = '#b98cd6' }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 10} rx={70} ry={16} fill={color} opacity={0.9} />
      <ellipse cx={x} cy={y + 4} rx={58} ry={11} fill="#fff" opacity={0.7} />
    </g>
  );
}

export function Bell({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-14 8 Q-14 -12 0 -14 Q14 -12 14 8 Z" fill="#f2c14e" />
      <rect x={-17} y={6} width={34} height={6} rx={3} fill="#d9a12f" />
      <circle cx={0} cy={16} r={4} fill="#d9a12f" />
      <circle cx={0} cy={-16} r={3} fill="#d9a12f" />
    </g>
  );
}

export function Toy({ x, y }: { x: number; y: number }) {
  // ossinho de brinquedo
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={-14} cy={-6} r={6} fill="#7bb0e0" />
      <circle cx={-14} cy={6} r={6} fill="#7bb0e0" />
      <circle cx={14} cy={-6} r={6} fill="#7bb0e0" />
      <circle cx={14} cy={6} r={6} fill="#7bb0e0" />
      <rect x={-14} y={-6} width={28} height={12} rx={5} fill="#93c2ec" />
    </g>
  );
}

export function Bowl({ x, y, color = '#e39236' }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-16 0 Q0 18 16 0 Z" fill={color} />
      <ellipse cx={0} cy={0} rx={16} ry={5} fill="#fff" opacity={0.5} />
      <ellipse cx={0} cy={-1} rx={11} ry={3} fill="#8a5a34" />
    </g>
  );
}

export function PeePad({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-34} y={-22} width={68} height={44} rx={6} fill="#dfeaf5" />
      <rect x={-34} y={-22} width={68} height={44} rx={6} fill="none" stroke="#a9c4de" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M0 -6 q7 8 0 14 q-7 -6 0 -14Z" fill="#7fb0dd" />
    </g>
  );
}

export function Moon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M8 -12 A13 13 0 1 0 8 14 A10 10 0 0 1 8 -12Z" fill="#f2d675" />
      <text x={18} y={-6} fontSize="12" fill="#c9a04a" fontWeight="bold">z</text>
      <text x={26} y={-14} fontSize="9" fill="#c9a04a" fontWeight="bold">z</text>
    </g>
  );
}

export function Waves({ x, y, color = '#e39236' }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
      <path d="M0 0 q8 -10 0 -20" opacity={0.9} />
      <path d="M10 4 q14 -14 0 -30" opacity={0.6} />
      <path d="M20 8 q20 -18 0 -40" opacity={0.35} />
    </g>
  );
}

export function Heart({ x, y, color = '#e06a8b' }: { x: number; y: number; color?: string }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 6 C-8 -4 -16 2 -8 10 L0 16 L8 10 C16 2 8 -4 0 6Z"
      fill={color}
    />
  );
}

export function Sparkle({ x, y, color = '#e39236' }: { x: number; y: number; color?: string }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5Z"
      fill={color}
    />
  );
}
