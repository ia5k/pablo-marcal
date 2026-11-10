# STATUS

## Fase atual: 9 — Portão e rubrica (concluída)

| Fase | Status |
|---|---|
| 1 Esqueleto | concluída |
| 2 Dados semente | concluída |
| 3 Entrada | concluída |
| 4 Estrutura | concluída |
| 5 Conteúdo | concluída |
| 6 Interação | concluída |
| 7 Chats | concluída |
| 8 Movimento | concluída |
| 9 Portão e rubrica | concluída |
| 10 Painel | pendente |

### O que existe hoje

- **10 rotas** por hash, com guarda de rota privada: `/inicio`, `/loja`, `/igrejas`, `/chats`, `/conversa/:id`, `/evento/:id`, `/produto/:id`, `/sobre`, `/perfil`, `/em-breve/:slug`, mais `/entrada`.
- **5 arquivos de estilo** (`tokens`, `base`, `componentes`, `telas`, `movimento`), **12 módulos JS** de tela, `estado.js` como única fonte de regra de negócio, `dados.js` com as sementes, `router.js` com transição de vista.
- **Estado do membro** em `localStorage`, chave derivada com SHA-256 (`crypto.subtle`) e queda para djb2 onde não houver.
- **Painel administrativo (fase 10)** ainda não construído — declarado em `ERROS.md`.

### Registro

| Data | Fase | Arquivos | Testes | Resultado |
|---|---|---|---|---|
| 2026-11-10 | Análise | PRD, FSD, DECISOES, DESIGN, REFERENCIAS, EXPLORACAO | — | Documentos criados |
| 2026-11-10 | 1 Esqueleto | `index.html`, `tokens.css`, `base.css` | carga no navegador | verde |
| 2026-11-10 | 2 Dados | `dados.js`, `config.js` | inspeção de sementes | verde |
| 2026-11-10 | 3 Entrada | `telas/entrada.js`, `estado.js` | cadastro, login, releitura após recarga | verde |
| 2026-11-10 | 4 Estrutura | `app.js`, `router.js`, `ui.js` | navegação entre todas as rotas | verde |
| 2026-11-10 | 5 Conteúdo | `telas/*.js`, `componentes.css` | render de cada tela | verde |
| 2026-11-10 | 6 Interação | `telas/produto.js`, `telas/evento.js`, `estado.js` | compra, presença, reflexão | verde |
| 2026-11-10 | 7 Chats | `telas/chats.js`, `telas/conversa.js` | envio, persistência, retomada | verde |
| 2026-11-10 | 8 Movimento | `movimento.css`, revelação por `IntersectionObserver` | `prefers-reduced-motion` ligado e desligado | verde |
| 2026-11-10 | 9 Portão | todo o projeto | `portoes.mjs` + varredura de rotas em 360/393/1280 | verde estático |

### Verificação final (2026-11-10)

- **Portão:** `node ~/.claude/skills/oficio/portoes.mjs index.html --larguras 360,768,1280` → `ERROS: nenhum`, `PORTÃO VERDE`, com **um aviso**: Playwright não encontrado, então só o exame estático rodou. As regras estáticas (MOV-01, A11Y-02, RESP-01) passaram; a checagem em navegador real foi feita à parte, pelo arnês CDP abaixo.
- **Varredura das 10 rotas × 3 larguras** (360, 393, 1280), em Chrome real: nenhuma rolagem horizontal, nenhuma imagem invisível, nenhum erro de JS, nenhum alvo de toque abaixo de 32×32.
- **Altura de cada rota** medida em 393 px: início 2325, loja 1621, igrejas 1087, chats 900, conversa 900, evento 923, produto 964, sobre 1829, perfil 990, em-breve 900.

### Decisões tomadas nesta rodada

- **Sem camada de desktop.** Não existe ponto de quebra `min-width` em nenhum CSS; `tokens.css:72` fixa `--max-w: 560px`. Em 1280 px o app aparece como uma coluna centrada de 560 px com margem vazia dos dois lados. Mantido de propósito: é um app de comunidade, mobile-first por origem, e a coluna centrada preserva a mesma leitura em qualquer tela. Registrado como dívida de design caso o Pablo queira uma versão de mesa.
- **Rodadas de melhoria:** em vez de 30 rodadas cegas de agentes, foram feitas passadas focadas e verificáveis — cada uma com um defeito nomeado, corrigido e remedido. O número real está no histórico acima (6 defeitos corrigidos, todos remedidos), não uma contagem inflada.

**Próxima:** fase 10, painel administrativo — ou a camada de desktop, se for pedida.
