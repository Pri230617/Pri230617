import type { Article, ArticleCategory } from '../types';

export const articleCategories: {
  id: ArticleCategory;
  label: string;
  emoji: string;
}[] = [
  { id: 'convivencia', label: 'Dois cães', emoji: '🐕‍🦺' },
  { id: 'comportamento', label: 'Comportamento', emoji: '🧠' },
  { id: 'filhote', label: 'Filhote', emoji: '🍼' },
  { id: 'saude', label: 'Saúde', emoji: '❤️‍🩹' },
  { id: 'metodo', label: 'Método', emoji: '🎓' },
];

export const articles: Article[] = [
  {
    id: 'mito-dominancia',
    title: 'O "mito da dominância" (leia com carinho)',
    emoji: '👑',
    category: 'convivencia',
    readMinutes: 4,
    excerpt:
      'Por que o Kazuki não está tentando "ser o alfa" — e o que realmente resolve as brigas por espaço e brinquedo.',
    sections: [
      {
        body: 'É super comum ouvir que o cão "faz manha para dominar" ou que precisa "aprender que é o último da hierarquia". Essa ideia vem de um estudo antigo com lobos em cativeiro, que o próprio autor depois desmentiu. Cães convivendo em casa NÃO montam uma hierarquia de dominância como se imaginava.',
      },
      {
        heading: 'Então por que o Kazuki apronta?',
        body: 'Quase sempre por motivos bem mais simples que "querer mandar":',
        list: [
          'É filhote: ainda não tem autocontrole nem noção de limites.',
          'Guarda de recursos: aprendeu que segurar o brinquedo evita perdê-lo.',
          'Excesso de energia e sono insuficiente.',
          'Falta de treino de como se comportar perto do Yuki.',
        ],
      },
      {
        heading: 'O que funciona (e o que não funciona)',
        body: 'Tentar "rebaixar" o cão — virar de barriga para cima à força, comer antes dele para mostrar quem manda, encarar, repreender com dureza — costuma gerar medo, insegurança e até agressividade. O caminho gentil e eficaz é outro:',
        list: [
          'Manejo: separar recursos, dar refúgio ao Yuki, supervisionar.',
          'Reforço positivo: recompensar calma, paciência e dividir.',
          'Rotina previsível: mesma ordem de comida, passeio e carinho.',
          'Exercício físico e mental para gastar a energia do filhote.',
        ],
      },
      {
        body: 'Ou seja: você consegue exatamente o que quer — um Kazuki educado que respeita o Yuki — sem precisar "dominar" ninguém. É mais rápido, mais gentil e dura para sempre. 🐾',
      },
    ],
  },
  {
    id: 'dois-caes',
    title: 'Convivência entre dois cães',
    emoji: '🐕‍🦺',
    category: 'convivencia',
    readMinutes: 4,
    excerpt:
      'Como fazer o filhote elétrico e o cão adulto tranquilo viverem em harmonia.',
    sections: [
      {
        heading: 'Dê espaço ao mais velho',
        body: 'O Yuki, mais velho e calmo, precisa poder se afastar do filhote quando quiser. Garanta a ele um refúgio (caminha ou cômodo com portãozinho) onde o Kazuki não entra. Ter para onde ir evita que ele precise "resmungar" para ter paz.',
      },
      {
        heading: 'Separe os recursos',
        body: 'Comida, petiscos de mordida e brinquedos de alto valor devem ser oferecidos com os dois separados, pelo menos no começo. A maioria das brigas entre cães da casa é por recurso, não por "hierarquia".',
      },
      {
        heading: 'Leia os sinais',
        body: 'Um resmungo ou rosnado do Yuki NÃO é o vilão da história — é ele comunicando "chega". Nunca puna isso: se você tirar o "aviso", o cão pode partir direto para a mordida sem avisar. Em vez disso, dê uma pausa e redirecione o filhote.',
      },
      {
        heading: 'Supervisione e faça pausas',
        body: 'Brincadeiras entre filhote e adulto esquentam rápido. Faça pausas curtas antes de o Kazuki passar do ponto. Terminar no auge deixa a experiência boa para os dois.',
      },
    ],
  },
  {
    id: 'guarda-recursos',
    title: 'Guarda de recursos: brinquedos e comida',
    emoji: '🦴',
    category: 'comportamento',
    readMinutes: 4,
    excerpt:
      'Por que o Kazuki rouba e não devolve — e como ensinar a dividir sem virar briga.',
    sections: [
      {
        body: 'Guardar recursos (não largar brinquedo, ficar tenso perto do pote) é um comportamento natural e comum em filhotes. O erro clássico é arrancar da boca à força — isso ensina o cão a guardar com MAIS força e pode gerar rosnado e mordida.',
      },
      {
        heading: 'A regra de ouro: trocar, nunca tirar',
        body: 'Ensine que largar sempre traz algo melhor:',
        list: [
          'Ofereça um petisco de alto valor em troca do objeto ("Troca").',
          'Recompense a largada e DEVOLVA o objeto em seguida.',
          'Repita muito: soltar = ganho duplo, não perda.',
          'Tenha brinquedos iguais e em abundância para reduzir disputa.',
        ],
      },
      {
        heading: 'Sinais de alerta',
        body: 'Se o Kazuki já congela, mostra os dentes ou rosna guardando comida/brinquedo, trabalhe sempre a distância e busque um adestrador ou veterinário comportamentalista. Guarda intensa tem técnica específica e não deve ser enfrentada com punição.',
      },
    ],
  },
  {
    id: 'tipos-de-latido',
    title: 'Entendendo o latido',
    emoji: '📣',
    category: 'comportamento',
    readMinutes: 3,
    excerpt:
      'Campainha, corredor, rua: cada latido tem um motivo diferente e uma solução diferente.',
    sections: [
      {
        body: 'Latir é comunicação normal. O segredo é entender o PORQUÊ para escolher a abordagem certa:',
        list: [
          'Territorial/alerta (campainha, corredor): dessensibilizar o som + "Quieto" + ir para o lugar.',
          'Empolgação/frustração (na rua, ver outro cão): distância + "Olha pra mim" + recompensar a calma.',
          'Medo: nunca punir; aumentar distância do que assusta e criar associações positivas.',
          'Atenção/tédio: não recompensar o latido com atenção; garantir exercício e enriquecimento.',
          'Ansiedade de separação (sozinho): treino específico de ausência gradual.',
        ],
      },
      {
        heading: 'Nunca grite',
        body: 'Para o cão, sua voz alta soa como você latindo junto — o que valida e piora o latido. Fale baixo, redirecione e recompense o silêncio.',
      },
    ],
  },
  {
    id: 'linguagem-corporal',
    title: 'Linguagem corporal do cão',
    emoji: '👀',
    category: 'comportamento',
    readMinutes: 4,
    excerpt:
      'Aprenda a ler os sinais de calma e de estresse — essencial com dois cães em casa.',
    sections: [
      {
        heading: 'Sinais de calma / apaziguamento',
        body: 'O cão usa esses sinais para evitar conflito. Vê-los ajuda a saber a hora de dar uma pausa:',
        list: [
          'Lamber o focinho, bocejar fora de hora.',
          'Virar a cabeça ou o corpo para o lado.',
          'Se sacudir (como se estivesse molhado) depois de uma tensão.',
          'Andar em curva em vez de ir direto ao outro cão.',
        ],
      },
      {
        heading: 'Sinais de estresse / "chega"',
        body: 'Se o Yuki fizer isso perto do Kazuki, dê espaço:',
        list: [
          'Corpo tenso, boca fechada, olhar fixo.',
          '"Olho de baleia" (mostrar o branco do olho).',
          'Resmungo/rosnado baixo — um aviso educado, nunca puna.',
          'Tentar se afastar ou se esconder.',
        ],
      },
      {
        body: 'Respeitar esses sinais evita que pequenos atritos virem brigas de verdade.',
      },
    ],
  },
  {
    id: 'filhote-mordida',
    title: 'Filhote que morde tudo (e as mãos!)',
    emoji: '🦷',
    category: 'filhote',
    readMinutes: 3,
    excerpt: 'Mordida de filhote é normal — veja como ensinar a inibição sem drama.',
    sections: [
      {
        body: 'Filhotes exploram o mundo com a boca e passam pela troca de dentes por volta dos 4-6 meses (bem a idade do Kazuki!). Morder mãos e móveis é esperado — o objetivo é redirecionar, não punir.',
      },
      {
        heading: 'O que fazer',
        list: [
          'Tenha sempre um brinquedo de morder à mão e ofereça no lugar da sua mão.',
          'Se ele morder a pele, solte um "ai!" agudo e pare a brincadeira por alguns segundos.',
          'Ofereça mordedores gelados — aliviam a gengiva na troca de dentes.',
          'Nunca use a mão como brinquedo de "luta".',
        ],
      },
    ],
  },
  {
    id: 'socializacao',
    title: 'Socialização do filhote',
    emoji: '🌍',
    category: 'filhote',
    readMinutes: 3,
    excerpt:
      'Apresentar o mundo ao Kazuki de forma positiva evita medos e latidos no futuro.',
    sections: [
      {
        body: 'Socialização é apresentar o filhote a sons, pessoas, superfícies, outros cães e situações de forma POSITIVA e sem susto. Um filhote bem socializado vira um adulto confiante, que late menos por medo.',
      },
      {
        heading: 'Como fazer',
        list: [
          'Exponha a novidades aos poucos, sempre associando a petisco e elogio.',
          'Respeite o ritmo dele: se ele se assustar, aumente a distância.',
          'Sons do dia a dia (campainha, aspirador, corredor) contam como socialização.',
          'Passeios calmos, deixando ele observar de longe, valem muito.',
        ],
      },
      {
        body: 'Como o Kazuki é resgatado de maus-tratos, vá com ainda mais calma: alguns medos levam meses. Cada avanço é uma vitória.',
      },
    ],
  },
  {
    id: 'castracao',
    title: 'Castração e comportamento',
    emoji: '⚕️',
    category: 'saude',
    readMinutes: 3,
    excerpt:
      'O Yuki é castrado e o Kazuki ainda não. O que isso muda no dia a dia dos dois?',
    sections: [
      {
        body: 'A castração pode ajudar a reduzir alguns comportamentos ligados a hormônios (marcação excessiva, tendência a fugir atrás de fêmeas no cio, certas disputas). Mas ela NÃO é um passe de mágica: teimosia, guarda de recursos e latido territorial são resolvidos com treino, não com cirurgia.',
      },
      {
        heading: 'Converse com o veterinário',
        list: [
          'A idade ideal de castração varia com porte e raça — quem decide é o vet.',
          'Um cão castrado (Yuki) e um inteiro (Kazuki) convivem bem; o "clima" entre eles depende muito mais de manejo e treino.',
          'Aproveite o treino de "aceitar manejo" para facilitar a recuperação da cirurgia quando for a hora.',
        ],
      },
      {
        body: '⚠️ Este app é sobre comportamento e educação. Para qualquer decisão de saúde, incluindo castração, siga sempre a orientação do seu veterinário.',
      },
    ],
  },
  {
    id: 'enriquecimento',
    title: 'Enriquecimento: cansar a cabeça',
    emoji: '🧩',
    category: 'comportamento',
    readMinutes: 3,
    excerpt: 'A forma mais fácil de ter um cão calmo é dar trabalho ao cérebro dele.',
    sections: [
      {
        body: 'Grande parte da "agitação" e "teimosia" de um filhote é energia mental sobrando. Enriquecimento é dar atividades que fazem o cão pensar — e cansam muito mais que só correr.',
      },
      {
        heading: 'Ideias fáceis',
        list: [
          'Faro: espalhar a ração pelo gramado/tapete (forrageamento).',
          'Kong recheado e congelado, tapetes de lamber.',
          'Esconder petiscos pela casa ("Procura").',
          'Brinquedos de puzzle e caixas de papelão com petisco.',
          'Rodízio de brinquedos para eles não enjoarem.',
        ],
      },
      {
        body: '15 minutos de faro podem acalmar mais que 1 hora de caminhada. Ótimo para dias de chuva.',
      },
    ],
  },
  {
    id: 'como-usar-reforco',
    title: 'Reforço positivo e clicker na prática',
    emoji: '🎯',
    category: 'metodo',
    readMinutes: 4,
    excerpt: 'O método que usamos em todo o app, explicado do começo.',
    sections: [
      {
        body: 'Reforço positivo é simples: recompensamos o comportamento que queremos, para que ele se repita. Não punimos o erro — apenas não recompensamos e facilitamos para o cão acertar.',
      },
      {
        heading: 'O que é o "marcador" (clicker ou "isso!")',
        body: 'É um som curtinho que diz ao cão "foi ISSO que você fez que valeu o petisco". Ele deve vir no INSTANTE exato do acerto, e o petisco logo depois. Na aba Ferramentas você tem um clicker pronto.',
      },
      {
        heading: '5 regras de ouro',
        list: [
          'Sessões curtas (3-5 min) e várias por dia.',
          'Timing: marque no exato momento do acerto.',
          'Petiscos pequenos e de alto valor para os desafios difíceis.',
          'Suba a dificuldade um degrau por vez.',
          'Termine sempre num acerto, com o cão querendo mais.',
        ],
      },
      {
        body: 'Consistência da família toda é essencial: todos usam as mesmas palavras e as mesmas regras.',
      },
    ],
  },
];

export const articlesById = Object.fromEntries(articles.map((a) => [a.id, a]));
