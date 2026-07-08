// Personagem original (spitz fofo, estilo flat) desenhado em SVG.
// Sem dependências externas — arte 100% nossa, sem risco de direitos autorais.

interface Props {
  pose?: 'sit' | 'down' | 'stand';
  fur?: string;
  shade?: string;
  collar?: string;
}

const NOSE = '#4b3a2f';
const EYE = '#3b2e26';
const TONGUE = '#f0a0a0';

export default function DogSpitz({
  pose = 'sit',
  fur = '#fbf3e4',
  shade = '#ecdabc',
  collar = '#e39236',
}: Props) {
  if (pose === 'down') return <Down fur={fur} shade={shade} collar={collar} />;
  if (pose === 'stand') return <Stand fur={fur} shade={shade} collar={collar} />;
  return <Sit fur={fur} shade={shade} collar={collar} />;
}

// nuvenzinha de "pelo" — vários círculos sobrepostos formam a silhueta fofa
function Fluff({
  cx,
  cy,
  r,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} />;
}

function Head({
  x,
  y,
  fur,
  shade,
  look = 0,
}: {
  x: number;
  y: number;
  fur: string;
  shade: string;
  look?: number; // deslocamento vertical do olhar
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* orelhas (sólidas, com rosinha interno) */}
      <path d="M-30 -12 L-17 -44 L-2 -13 Z" fill={shade} />
      <path d="M30 -12 L17 -44 L2 -13 Z" fill={shade} />
      <path d="M-28 -13 L-17 -40 L-4 -13 Z" fill={fur} />
      <path d="M28 -13 L17 -40 L4 -13 Z" fill={fur} />
      <path d="M-22 -15 L-16 -32 L-9 -15 Z" fill="#f3d3d0" />
      <path d="M22 -15 L16 -32 L9 -15 Z" fill="#f3d3d0" />
      {/* cabeça fofa */}
      <Fluff cx={-18} cy={2} r={14} fill={fur} />
      <Fluff cx={18} cy={2} r={14} fill={fur} />
      <Fluff cx={0} cy={-6} r={18} fill={fur} />
      <circle cx={0} cy={4} r={22} fill={fur} />
      {/* focinho */}
      <ellipse cx={0} cy={14} rx={12} ry={10} fill="#fff" />
      <ellipse cx={0} cy={9} rx={3.4} ry={2.6} fill={NOSE} />
      {/* boca */}
      <path
        d="M0 12 q0 5 -5 6 M0 12 q0 5 5 6"
        stroke={NOSE}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={0} cy={19} rx={3.5} ry={4} fill={TONGUE} />
      {/* olhos */}
      <circle cx={-8} cy={0 + look} r={3} fill={EYE} />
      <circle cx={8} cy={0 + look} r={3} fill={EYE} />
      <circle cx={-7} cy={-1 + look} r={1} fill="#fff" />
      <circle cx={9} cy={-1 + look} r={1} fill="#fff" />
    </g>
  );
}

function Collar({ cx, cy, w, color }: { cx: number; cy: number; w: number; color: string }) {
  return (
    <g>
      <rect x={cx - w / 2} y={cy} width={w} height={5} rx={2.5} fill={color} />
      <circle cx={cx} cy={cy + 6} r={3} fill="#ffd76a" />
    </g>
  );
}

function Sit({ fur, shade, collar }: { fur: string; shade: string; collar: string }) {
  return (
    <g>
      {/* sombra no chão */}
      <ellipse cx={100} cy={148} rx={46} ry={8} fill="#00000010" />
      {/* rabo fofo */}
      <Fluff cx={148} cy={110} r={16} fill={shade} />
      <Fluff cx={150} cy={100} r={12} fill={fur} />
      {/* corpo sentado (triangular, fofo) */}
      <path
        d="M72 150 Q66 96 100 84 Q134 96 128 150 Z"
        fill={fur}
      />
      <Fluff cx={80} cy={132} r={16} fill={fur} />
      <Fluff cx={120} cy={132} r={16} fill={fur} />
      <Fluff cx={100} cy={140} r={18} fill={fur} />
      {/* patas dianteiras */}
      <rect x={84} y={128} width={13} height={22} rx={6} fill="#fff" />
      <rect x={103} y={128} width={13} height={22} rx={6} fill="#fff" />
      {/* peito */}
      <ellipse cx={100} cy={116} rx={20} ry={22} fill="#fff" />
      <Collar cx={100} cy={98} w={30} color={collar} />
      {/* cabeça */}
      <Head x={100} y={74} fur={fur} shade={shade} />
    </g>
  );
}

function Down({ fur, shade, collar }: { fur: string; shade: string; collar: string }) {
  return (
    <g>
      <ellipse cx={104} cy={150} rx={62} ry={8} fill="#00000010" />
      {/* rabo */}
      <Fluff cx={168} cy={132} r={14} fill={shade} />
      {/* corpo deitado (horizontal) */}
      <ellipse cx={110} cy={132} rx={58} ry={22} fill={fur} />
      <Fluff cx={80} cy={128} r={18} fill={fur} />
      <Fluff cx={120} cy={126} r={18} fill={fur} />
      <Fluff cx={150} cy={130} r={15} fill={fur} />
      {/* patas esticadas à frente */}
      <rect x={44} y={138} width={30} height={12} rx={6} fill="#fff" />
      <rect x={60} y={138} width={30} height={12} rx={6} fill="#fff" />
      <Collar cx={66} cy={120} w={26} color={collar} />
      {/* cabeça baixa, apoiada */}
      <Head x={62} y={112} fur={fur} shade={shade} look={2} />
    </g>
  );
}

function Stand({ fur, shade, collar }: { fur: string; shade: string; collar: string }) {
  return (
    <g>
      <ellipse cx={104} cy={150} rx={58} ry={8} fill="#00000010" />
      {/* rabo curvado pra cima */}
      <Fluff cx={158} cy={92} r={15} fill={shade} />
      <Fluff cx={160} cy={82} r={11} fill={fur} />
      {/* patas */}
      <rect x={70} y={116} width={12} height={34} rx={6} fill="#fff" />
      <rect x={128} y={116} width={12} height={34} rx={6} fill="#fff" />
      <rect x={86} y={118} width={12} height={32} rx={6} fill="#f2e6cf" />
      <rect x={112} y={118} width={12} height={32} rx={6} fill="#f2e6cf" />
      {/* corpo */}
      <ellipse cx={104} cy={110} rx={44} ry={26} fill={fur} />
      <Fluff cx={78} cy={106} r={16} fill={fur} />
      <Fluff cx={130} cy={104} r={16} fill={fur} />
      {/* peito */}
      <ellipse cx={70} cy={112} rx={16} ry={18} fill="#fff" />
      <Collar cx={66} cy={96} w={26} color={collar} />
      {/* cabeça */}
      <Head x={62} y={86} fur={fur} shade={shade} />
    </g>
  );
}
