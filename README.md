# 🐾 Adestra · Kazuki

App de adestramento canino com **reforço positivo**, feito com carinho para
ajudar a educar o **Kazuki** (spitz alemão, resgatado 🐶) — e qualquer outro
cão da casa, como o **Yuki**. Inspirado em apps como o Woofz, porém gratuito,
seu e sem assinatura.

## O que ele faz

- **Perfis dos cães** — Kazuki e Yuki já vêm cadastrados; dá pra editar e
  adicionar outros. Cada cão tem seu próprio progresso.
- **Programas de treino passo a passo**, incluindo módulos focados nos
  desafios do dia a dia:
  - 🎓 **Fundamentos** — como o treino funciona + comandos essenciais
  - 🔔 **Campainha sem escândalo** — não latir quando alguém chega
  - 🏠 **Ficar sozinho sem chorar** — ansiedade de separação
  - 🚶 **Passeio tranquilo** — não latir para pessoas e outros cães
  - 🧘 **Autocontrole e calma** — para o filhote elétrico e teimoso
- **Biblioteca de comandos** (senta, deita, fica, vem, junto, no lugar, olha,
  deixa) com passo a passo e dicas.
- **Ferramentas de treino**: clicker, apito e cronômetro de sessão (todo o som
  é gerado no próprio app, sem arquivos externos).
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

## Tecnologia

React + TypeScript + Vite + Tailwind CSS. Sem back-end, sem custos, sem
assinatura. 🐕
