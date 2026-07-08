# 🐾 Adestra · Kazuki

App de adestramento canino com **reforço positivo**, feito com carinho para
ajudar a educar o **Kazuki** (spitz alemão, resgatado 🐶) — e qualquer outro
cão da casa, como o **Yuki**. Inspirado em apps como o Woofz, porém gratuito,
seu e sem assinatura.

## O que ele faz

- **Perfis dos cães** — Kazuki e Yuki já vêm cadastrados; dá pra editar e
  adicionar outros. Cada cão tem seu próprio progresso.
- **8 programas de treino passo a passo**, focados nos desafios reais:
  - 🎓 **Fundamentos** — como o treino funciona + comandos essenciais
  - 🔔 **Campainha sem escândalo** — não latir quando alguém chega
  - 🚪 **Silêncio no corredor** — não latir para quem passa no prédio
  - 🏠 **Ficar sozinho sem chorar** — ansiedade de separação
  - 🚶 **Passeio tranquilo** — não latir para pessoas e outros cães
  - 🤝 **Paz com o Yuki** — respeitar o espaço do cão mais velho
  - 🧸 **Dividir sem brigar** — parar de roubar/guardar brinquedos
  - 🧘 **Autocontrole e calma** — para o filhote elétrico e teimoso
- **Biblioteca de ~20 comandos** em 5 categorias: básico, comportamento
  (inclui "Quieto"/"Fala" para controle de latido), convivência (troca,
  esperar a vez, respeitar espaço), vida prática (xixi no lugar, dormir,
  aceitar manejo) e truques (dá a pata, gira, rola, faro…).
- **Guia** com artigos: convivência entre dois cães, o "mito da dominância",
  guarda de recursos, tipos de latido, linguagem corporal, filhote,
  castração e o método de reforço positivo.
- **Ferramentas de treino**: clicker, apito e cronômetro de sessão (todo o som
  é gerado no próprio app, sem arquivos externos).
- **Conquistas** (14 medalhas) e **Diário de treino** com anotações.
- **Plano diário, ofensiva (streak) e progresso** por cão.

> 💡 Método: recompensamos os acertos e **nunca punimos os erros** — o jeito
> mais gentil e eficaz, ainda mais para um filhote resgatado.

## Rodando o app

Precisa de [Node.js](https://nodejs.org) 18+ instalado.

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # abre em modo desenvolvimento (http://localhost:5173)
```

Para gerar a versão final (otimizada):

```bash
npm run build    # gera a pasta dist/
npm run preview  # testa a versão de produção
```

## Usando no celular (recomendado 📱)

O app é feito para caber na palma da mão durante o treino:

1. Rode `npm run dev` no computador (ele mostra um endereço de rede, tipo
   `http://192.168.x.x:5173`).
2. Abra esse endereço no navegador do celular (mesma rede Wi-Fi).
3. No menu do navegador, escolha **"Adicionar à tela inicial"** — ele vira um
   ícone de app de verdade, em tela cheia.

Todos os dados (progresso, ofensiva, cães) ficam salvos no próprio navegador
(`localStorage`), sem precisar de conta nem internet.

## 🔔 Notificações de treino (opcional)

O app pode enviar um lembrete diário para a tela de bloqueio do celular
(inclusive iPhone, iOS 16.4+). Isso usa Web Push e precisa de uma
configuração única no Vercel:

1. **Banco de dados (KV):** no painel do projeto no Vercel, vá em **Storage →
   Create Database → KV (Upstash)** e conecte ao projeto. Isso cria sozinho as
   variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN`.
2. **Variáveis de ambiente:** em **Settings → Environment Variables**, adicione:
   - `VAPID_PRIVATE_KEY` — a chave privada gerada (par da pública que está em
     `src/lib/push.ts`). Gere um par com `npx web-push generate-vapid-keys`.
   - `VAPID_SUBJECT` — `mailto:seuemail@exemplo.com`
   - `CRON_SECRET` — uma senha longa qualquer (protege o agendador).
3. **Redeploy** o projeto.
4. No celular, com o app **instalado na Tela de Início**, abra **Lembretes** e
   toque em **Ativar notificações**.

O agendador (`api/cron.js`) roda de hora em hora e envia o lembrete no horário
escolhido por cada aparelho. Para testar na hora, acesse
`https://SEU-APP.vercel.app/api/cron?key=SEU_CRON_SECRET&test=1`.

> Observação: no plano gratuito (Hobby), o cron da Vercel pode rodar só uma vez
> por dia. Para lembretes em horário exato, use um cron externo grátis (ex:
> cron-job.org) apontando para a URL de teste acima, ou o plano Pro.

## Tecnologia

React + TypeScript + Vite + Tailwind CSS no front. Notificações via Web Push
com funções serverless (`api/`), Vercel KV e Vercel Cron. Sem custos no uso
normal, sem assinatura. 🐕
