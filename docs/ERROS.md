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

## [2026-11-10] — Dívida resolvida: camada de desktop
- **Em leigo:** no computador o app ficava como uma coluna estreita no meio da tela, com sobra dos dois lados — e pior, rolar era mais longo no computador que no celular.
- **Técnico:** nenhum `@media (min-width: …)` no CSS; `tokens.css:72` definia `--max-w: 560px` sem sobrescrita. As capas, presas a `aspect-ratio` sobre largura total, cresciam junto com a tela: `/inicio` media 3685 px de rolagem em 1280 contra 2325 em 393.
- **Causa:** o app nasceu mobile-first; a camada de mesa nunca foi escrita.
- **Correção:** `assets/css/mesa.css`, carregado depois de `movimento.css`. Acima de 900 px: `--max-w: 1120`, `--pad: 36`, produtos em 4 colunas, atalhos em 6, encontros em grade de 3 com `.stack` neutralizado, tab bar virando pílula flutuante de 520 px centrada, e teto de altura em `.destaque`, `.evento__capa`, `.detalhe__capa` e `.player`. O `/inicio` caiu para 1667 px em 1280.
- **Status:** corrigido

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

## [2026-11-10] — 404 de `favicon.ico` em produção
- **Em leigo:** o navegador pedia um ícone que não existia; era o único erro na aba de rede do site publicado.
- **Técnico:** `GET /favicon.ico` → 404 em toda carga.
- **Causa:** a página nunca declarou ícone, e o navegador cai no pedido padrão pela raiz.
- **Correção:** `<link rel="icon">` com SVG em `data:` URI dentro do `index.html`. Sem arquivo extra, sem requisição, sem 404.
- **Status:** corrigido

## [2026-11-10] — Arnês de auditoria travava na tela de entrada
- **Em leigo:** todas as telas medidas apareciam iguais à tela de login.
- **Técnico:** `alt 932/948` em todas as rotas, `aba null`, `barra 0x0` — a guarda de rota privada redirecionava para `#/entrada`.
- **Causa:** o número semeado no arnês (`11999990000`) não existe em `dados.js`, então `perfilDe()` → `legionario()` devolvia `null` e a sessão não resolvia.
- **Correção:** semear um número real da semente (`505058`). Regra de negócio correta — o defeito era da bancada.
- **Status:** corrigido

## [2026-11-10] — Recarga da semente não tinha efeito
- **Em leigo:** mesmo com a sessão gravada, o app continuava na entrada.
- **Técnico:** `Page.navigate` para a mesma URL é navegação no mesmo documento quando muda só o hash; `estado.js` mantinha a `memoria` do módulo já carregado.
- **Causa:** o arnês navegava para `index.html#/inicio` logo depois de já estar em `index.html`.
- **Correção:** navegar com query de cache-bust (`index.html?semente=<timestamp>#/inicio`), forçando recarga real do módulo. Aplicado em todos os arneses de `/tmp`.
- **Status:** corrigido

## [2026-11-10] — GitHub Pages respondia "Site not found" após habilitar
- **Em leigo:** o link publicado dava página de erro logo depois de ligado.
- **Técnico:** `404` do Pages com o `build_type` recém-criado.
- **Causa:** a publicação estava em andamento; a primeira requisição chegou antes do build.
- **Correção:** consultar `gh api repos/…/pages/builds/latest -q .status` até `built` e só então verificar. Levou 11 consultas.
- **Status:** corrigido

## [2026-11-10] — Varredura falhou após a troca de marca
- **Em leigo:** depois de renomear, as telas medidas voltaram a ser a de entrada.
- **Técnico:** os arneses semeavam `legionarios.estado.v1`, mas o app já lia `pablomarcal.estado.v1`.
- **Causa:** a chave de armazenamento mudou junto com a marca e os scripts de bancada não acompanharam.
- **Correção:** `sed` da chave antiga para a nova nos quatro arneses. Lembrete: trocar a chave invalida sessão existente de propósito.
- **Status:** corrigido
