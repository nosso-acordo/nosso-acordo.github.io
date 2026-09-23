# Nosso Acordo

App de rotina familiar e uso consciente de tela. Site estático, sem build, sem dependências.
Publicado em https://nosso-acordo.github.io/

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app inteiro: telas, estilos, lógica e persistência |
| `manifest.json` | Torna o site instalável (nome, cores, ícones) |
| `sw.js` | Service worker — faz o app abrir offline |
| `icons/` | Ícones 192 e 512 (comuns e maskable) e ícone da Apple |
| `.nojekyll` | Impede o GitHub Pages de processar os arquivos |

## Publicar

1. No repositório, **Add file → Upload files**.
2. Arraste os 5 itens: `index.html`, `manifest.json`, `sw.js`, `.nojekyll` e a pasta `icons`.
3. Escreva a mensagem do commit e confirme.
4. **Confira o contador de commits** do repositório antes de sair da página. Se não subiu, refaça — o GitHub às vezes perde um envio confirmado cedo demais.
5. Em **Settings → Pages**, a origem deve ser a branch `main`, pasta `/ (root)`.
6. Aguarde de 1 a 2 minutos e abra https://nosso-acordo.github.io/

## Instalar no celular

- **Android (Chrome):** abra o site → menu ⋮ → *Instalar aplicativo*.
- **iPhone (Safari):** abra o site → botão Compartilhar → *Adicionar à Tela de Início*.

No iPhone a instalação é obrigatória para que notificações push funcionem no futuro.

## Dados

Tudo é salvo em `localStorage`, na chave `nossoAcordo.v1`, **apenas no aparelho**. Nada é enviado a servidor nenhum. Para limpar: aba de aparência (ícone de paleta) → *Recomeçar do zero*.

## Atualizar o app depois

Suba o `index.html` novo e **incremente a versão do cache** em `sw.js` (`const VERSAO = "nosso-acordo-v2"`). Sem isso, quem já instalou continua vendo a versão antiga.

## Próximos passos

1. Contas na nuvem (Supabase, link mágico) — offline-first, grava local e sincroniza.
2. Notificações push (VAPID + Edge Function).
3. Comunidade de famílias (posts e comentários com RLS).

Regra da fase nuvem: uma pasta `services/` é o único lugar que fala com o Supabase. A interface nunca chama o banco direto.
