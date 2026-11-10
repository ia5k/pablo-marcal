# ERROS

Modelo de registro. Todo erro entra aqui, mesmo já corrigido, com causa e correção.

```
## [data] — título curto
- **Em leigo:** o que a pessoa viu
- **Técnico:** mensagem real
- **Causa:** por quê
- **Correção:** o que foi feito
- **Status:** corrigido | aberto | dívida
```

---

## [2026-11-10] — Dívida declarada: app sem servidor
- **Em leigo:** as conversas e os dados ficam só neste aparelho; outra pessoa não vê.
- **Técnico:** estado em `localStorage`, sementes estáticas, sem API.
- **Causa:** decisão de escopo da v1 (`DECISOES_TECNICAS.md` §2) para entregar interface completa primeiro.
- **Correção:** fase seguinte com backend e sincronização.
- **Status:** dívida

## [2026-11-10] — Dívida declarada: painel administrativo
- **Em leigo:** a equipe ainda não tem onde cadastrar conteúdo.
- **Técnico:** painel é fase 10 do `PLANO.md`.
- **Causa:** prioridade na experiência do membro.
- **Correção:** construir após o portão da v1 do membro.
- **Status:** dívida

## [2026-11-10] — Dívida declarada: sem camada de desktop
- **Em leigo:** no computador o app fica como uma coluna estreita no meio da tela, com sobra dos dois lados.
- **Técnico:** nenhum `@media (min-width: …)` no CSS; `tokens.css:72` define `--max-w: 560px` sem sobrescrita.
- **Causa:** app mobile-first por origem; o shell de 560 px garante a mesma leitura em qualquer tela.
- **Correção:** se for pedido, criar uma camada ≥900 px (shell mais largo, grades de 2–3 colunas, tab bar virando rail). Antes disso, atualizar `docs/DESIGN.md`, que é fonte única.
- **Status:** dívida

## [2026-11-10] — Imagem de capa ficava invisível para sempre
- **Em leigo:** a foto do card não aparecia; o espaço ficava vazio.
- **Técnico:** a regra de esconder tinha especificidade maior que a de mostrar, então `data-pronta` nunca vencia.
- **Causa:** `html[data-revelar="on"] .midia img` (0,2,2) contra `.midia img[data-pronta]` (0,2,1) — a de esconder ganhava.
- **Correção:** a regra de mostrar passou a carregar a mesma raiz (`html[data-revelar="on"] … img[data-pronta]`), empatando a raiz e vencendo pelo atributo. Refeito para `.midia`, `.produto__midia` e `.evento__capa`.
- **Status:** corrigido

## [2026-11-10] — Texto de lista vazava do card
- **Em leigo:** uma linha longa esticava o card e empurrava o layout.
- **Técnico:** `text-overflow: ellipsis` não age em `inline`; o `span` interno não truncava.
- **Causa:** `display` do filho continuava `inline` dentro de `.lista__corpo`.
- **Correção:** o filho passou a `display: block` com `overflow: hidden`, permitindo o truncamento.
- **Status:** corrigido

## [2026-11-10] — Erro não capturado ao navegar rápido entre telas
- **Em leigo:** clicando rápido nos itens, às vezes nada acontecia e o console acendia vermelho.
- **Técnico:** `InvalidStateError` / promessa de `viewTransition` rejeitada sem tratamento.
- **Causa:** uma navegação que atropela a anterior aborta a transição; `ready` e `finished` rejeitam.
- **Correção:** `.catch(() => {})` nas duas promessas; a tela já foi desenhada, não há o que recuperar. O `try/catch` externo cobre navegador sem suporte real.
- **Status:** corrigido

## [2026-11-10] — Card de produto com recorte irregular
- **Em leigo:** a foto do produto aparecia cortada de um jeito estranho e o card dançava.
- **Técnico:** `aspect-ratio` da mídia divergia da proporção real das imagens.
- **Causa:** proporção declarada não batia com os arquivos de `dados.js`.
- **Correção:** `aspect-ratio` alinhado e `object-fit: cover` com `object-position` centrado.
- **Status:** corrigido

## [2026-11-10] — Tab bar com contraste fraco sobre conteúdo claro
- **Em leigo:** a barra de baixo sumia quando o conteúdo por trás era claro.
- **Técnico:** opacidade do fundo da tab bar baixa demais.
- **Correção:** opacidade elevada para valor que garante legibilidade sem perder o efeito de vidro.
- **Status:** corrigido

## [2026-11-10] — Arnês de captura gerava imagem em branco
- **Em leigo:** algumas fotos de teste saíram vazias.
- **Técnico:** `Page.captureScreenshot` devolvia quadro branco.
- **Causa:** dois Chrome headless rodando ao mesmo tempo e processos órfãos de execuções anteriores disputando a porta e o `user-data-dir`.
- **Correção:** captura sempre sequencial, uma instância por vez, com `pkill -9 -f "user-data-dir=/tmp/pablo-"` e limpeza dos diretórios temporários antes de cada lote. Não afeta o app — é defeito de bancada.
- **Status:** corrigido
