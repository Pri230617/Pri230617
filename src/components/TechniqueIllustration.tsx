import DogSpitz from './illustrations/DogSpitz';
import {
  Hand,
  OpenPalm,
  Arrow,
  Treat,
  Mat,
  Bed,
  Bell,
  Toy,
  Bowl,
  PeePad,
  Moon,
  Waves,
  Heart,
  Sparkle,
} from './illustrations/props';
import type { ReactNode } from 'react';

type Pose = 'sit' | 'down' | 'stand';
interface Scene {
  pose: Pose;
  caption: string;
  extras?: (accent: string, uid: string) => ReactNode;
}

// paw levantada (para "dá a pata")
function RaisedPaw({ x, y }: { x: number; y: number }) {
  return <rect x={x} y={y} width={12} height={26} rx={6} fill="#fff" transform={`rotate(-28 ${x} ${y})`} />;
}

const scenes: Record<string, Scene> = {
  sentar: {
    pose: 'sit',
    caption: 'Leve o petisco por cima da cabeça: o nariz sobe e o bumbum desce sozinho.',
    extras: (a, u) => (
      <>
        <Arrow d="M118 52 q22 -14 22 -34" color={a} markerId={`${u}a`} />
        <Hand x={150} y={26} rot={20} />
      </>
    ),
  },
  deitar: {
    pose: 'down',
    caption: 'Leve o petisco do focinho até o chão, em forma de “L”, e ele deita.',
    extras: () => <Hand x={34} y={140} rot={-4} />,
  },
  fica: {
    pose: 'sit',
    caption: 'Palma aberta = “Fica”. Recompense enquanto ele ainda está parado.',
    extras: () => <OpenPalm x={150} y={70} rot={-8} />,
  },
  vem: {
    pose: 'stand',
    caption: 'Chame animado e faça festa: vir até você é sempre a melhor coisa!',
    extras: (a, u) => (
      <>
        <Heart x={188} y={44} />
        <Arrow d="M150 92 q30 -6 40 -30" color={a} markerId={`${u}a`} />
      </>
    ),
  },
  junto: {
    pose: 'stand',
    caption: 'Ele caminha ao seu lado com a guia frouxa, sem puxar.',
    extras: (a) => (
      <>
        <rect x={180} y={40} width={16} height={100} rx={8} fill="#5b6b7a" />
        <path d="M186 120 Q150 120 120 110" stroke={a} strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  'no-lugar': {
    pose: 'down',
    caption: 'Mande “Lugar” e recompense a permanência calma na caminha.',
    extras: () => <Mat x={110} y={146} w={150} />,
  },
  olha: {
    pose: 'sit',
    caption: '“Olha”: petisco perto do seu olho para ele fazer contato visual.',
    extras: (a, u) => (
      <>
        <Treat x={152} y={58} />
        <Arrow d="M144 60 q-14 2 -22 6" color={a} markerId={`${u}a`} />
      </>
    ),
  },
  solta: {
    pose: 'sit',
    caption: 'Ofereça um petisco melhor e diga “Solta/Deixa” — ele larga o objeto.',
    extras: () => (
      <>
        <Toy x={80} y={132} />
        <Hand x={158} y={96} rot={12} />
      </>
    ),
  },
  fala: {
    pose: 'sit',
    caption: '“Fala”: recompense um ou dois latidos sob comando (par do “Quieto”).',
    extras: (a) => <Waves x={140} y={92} color={a} />,
  },
  quieto: {
    pose: 'sit',
    caption: '“Quieto”: recompense o silêncio, nunca o momento do latido.',
    extras: () => (
      <>
        <OpenPalm x={150} y={70} rot={-6} />
        <g stroke="#d05a5a" strokeWidth="3" strokeLinecap="round">
          <path d="M132 86 q10 -8 2 -18" fill="none" opacity={0.6} />
          <line x1={126} y1={70} x2={146} y2={90} />
        </g>
      </>
    ),
  },
  'nao-pula': {
    pose: 'sit',
    caption: 'Só dê atenção com as 4 patas no chão — ignore quando ele pula.',
    extras: (a, u) => (
      <>
        <rect x={178} y={30} width={16} height={110} rx={8} fill="#5b6b7a" />
        <Arrow d="M150 60 q6 24 0 44" color={a} markerId={`${u}a`} />
      </>
    ),
  },
  troca: {
    pose: 'sit',
    caption: 'Troque o brinquedo por um petisco — e devolva depois. Ninguém perde.',
    extras: (a, u) => (
      <>
        <Toy x={78} y={132} />
        <Hand x={158} y={96} rot={12} />
        <Arrow d="M150 108 q-30 16 -60 22" color={a} markerId={`${u}a`} />
      </>
    ),
  },
  'espera-a-vez': {
    pose: 'sit',
    caption: 'Ele espera calmo enquanto o Yuki é atendido primeiro.',
    extras: () => (
      <>
        <g transform="translate(-40 30) scale(0.6)">
          <DogSpitz pose="sit" fur="#eceff2" shade="#d3d9df" collar="#8a63c8" />
        </g>
        <Bowl x={40} y={140} color="#8a63c8" />
        <Bowl x={150} y={144} />
      </>
    ),
  },
  'respeita-espaco': {
    pose: 'stand',
    caption: 'A caminha do Yuki é um refúgio: o Kazuki respeita e fica no espaço dele.',
    extras: () => (
      <>
        <g transform="translate(150 44) scale(0.55)">
          <DogSpitz pose="down" fur="#eceff2" shade="#d3d9df" collar="#8a63c8" />
        </g>
        <Bed x={175} y={120} />
      </>
    ),
  },
  'xixi-no-lugar': {
    pose: 'stand',
    caption: 'Leve-o ao tapete certo e faça festa no instante em que ele acertar.',
    extras: () => <PeePad x={150} y={120} />,
  },
  'cama-dormir': {
    pose: 'down',
    caption: 'Rotina de sono: caminha + palavra “Dormir”. Um item com seu cheiro ajuda.',
    extras: () => (
      <>
        <Bed x={104} y={132} />
        <Moon x={180} y={44} />
      </>
    ),
  },
  'aceitar-manejo': {
    pose: 'sit',
    caption: 'Toque nas patas, orelhas e boca associando sempre a petisco.',
    extras: () => <Hand x={130} y={130} rot={40} treat={false} />,
  },
  toca: {
    pose: 'sit',
    caption: 'Ele encosta o focinho na sua palma aberta — base de vários truques.',
    extras: (a, u) => (
      <>
        <OpenPalm x={150} y={84} rot={-90} />
        <Arrow d="M124 88 q10 0 18 0" color={a} markerId={`${u}a`} />
      </>
    ),
  },
  'da-pata': {
    pose: 'sit',
    caption: 'Segure o petisco baixo e ele levanta a patinha para tocar sua mão.',
    extras: () => (
      <>
        <RaisedPaw x={132} y={116} />
        <Hand x={158} y={122} rot={20} />
      </>
    ),
  },
  gira: {
    pose: 'stand',
    caption: 'Faça um círculo com o petisco: ele roda no próprio eixo.',
    extras: (a, u) => <Arrow d="M150 70 a44 44 0 1 1 -2 0" color={a} markerId={`${u}a`} />,
  },
  rola: {
    pose: 'down',
    caption: 'Leve o petisco do focinho ao ombro para ele rolar o corpo.',
    extras: (a, u) => <Arrow d="M120 96 a30 22 0 1 1 -1 0" color={a} markerId={`${u}a`} />,
  },
  procura: {
    pose: 'stand',
    caption: 'Esconda petiscos e diga “Procura” — o faro cansa e acalma muito.',
    extras: (a) => (
      <>
        <Treat x={40} y={146} r={4} />
        <Treat x={175} y={148} r={4} />
        <Sparkle x={55} y={130} color={a} />
        <Sparkle x={165} y={132} color={a} />
      </>
    ),
  },
  vira: {
    pose: 'stand',
    caption: '“Vira”: gire 180° numa dancinha alegre e recompense ele por te acompanhar.',
    extras: (a, u) => (
      <Arrow d="M150 58 a34 42 0 1 1 0 84" color={a} markerId={`${u}a`} />
    ),
  },
  reatividade: {
    pose: 'sit',
    caption: 'Cão à vista, mas longe: recompense o Kazuki por olhar com calma e voltar pra você.',
    extras: (a, u) => (
      <>
        <g transform="translate(172 92) scale(0.34)">
          <DogSpitz pose="sit" fur="#e7ebef" shade="#cfd6dd" collar="#9aa4ad" />
        </g>
        <Treat x={150} y={60} />
        <Arrow d="M143 62 q-14 3 -22 8" color={a} markerId={`${u}a`} />
      </>
    ),
  },
  amizades: {
    pose: 'sit',
    caption: 'Playdate com um amigo calmo e conhecido: brincadeira supervisionada e com pausas.',
    extras: () => (
      <>
        <g transform="translate(-40 34) scale(0.6)">
          <DogSpitz pose="sit" fur="#efdcc0" shade="#d8bd92" collar="#c98a2b" />
        </g>
        <Heart x={70} y={54} />
      </>
    ),
  },
  // cenas de programas (lições)
  campainha: {
    pose: 'sit',
    caption: 'A campainha vira sinal de ir para o lugar — sem escândalo.',
    extras: () => (
      <>
        <Bell x={168} y={54} />
        <g stroke="#d05a5a" strokeWidth="3" strokeLinecap="round">
          <path d="M132 88 q10 -8 2 -18" fill="none" opacity={0.6} />
        </g>
      </>
    ),
  },
  sozinho: {
    pose: 'down',
    caption: 'Aumente o tempo sozinho em passos pequenos, sempre com um brinquedo bom.',
    extras: () => (
      <>
        <Bed x={104} y={132} />
        <Heart x={182} y={52} />
      </>
    ),
  },
  calma: {
    pose: 'down',
    caption: 'Recompense a calma: ele aprende a “desligar” e relaxar sozinho.',
    extras: () => <Mat x={104} y={146} w={150} color="#3f7fd0" />,
  },
};

const fallback: Scene = {
  pose: 'sit',
  caption: 'Treine com petisco e clicker: recompense o acerto no instante certo.',
  extras: () => <Heart x={168} y={60} />,
};

export function hasScene(key: string) {
  return key in scenes;
}

export default function TechniqueIllustration({
  sceneKey,
  accent = '#e39236',
}: {
  sceneKey: string;
  accent?: string;
}) {
  const scene = scenes[sceneKey] ?? fallback;
  const uid = 'sc-' + sceneKey.replace(/[^a-z0-9]/gi, '');

  return (
    <figure className="card overflow-hidden">
      <div
        className="relative"
        style={{
          backgroundImage:
            'radial-gradient(120% 100% at 70% 0%, rgba(255,255,255,.6), rgba(255,255,255,0) 60%), linear-gradient(160deg, #fff7ec, #fdefd8)',
        }}
      >
        <span className="absolute left-4 top-3 text-lg opacity-25">🐾</span>
        <span className="absolute right-5 top-5 text-sm opacity-20">🐾</span>
        <svg viewBox="0 0 240 170" className="w-full">
          <DogSpitz pose={scene.pose} collar={accent} />
          {scene.extras?.(accent, uid)}
        </svg>
      </div>
      <figcaption className="flex items-start gap-2 p-3.5">
        <span className="text-base">✏️</span>
        <p className="text-sm leading-relaxed text-ink/70">{scene.caption}</p>
      </figcaption>
    </figure>
  );
}
