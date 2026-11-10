# CLAUDE.md — App dos Legionários

## O que é

App web responsivo da comunidade de legionários. HTML, CSS e JavaScript puro, sem build, sem dependência externa além do player do YouTube. Estado do membro em `localStorage`.

## Como rodar

```
python3 -m http.server 5173
```
Abrir `http://localhost:5173`.

## Metodologia obrigatória

Jornada IA Vibe Coding ativa. Todo comando segue P1–P8. Documentos: `PRD.md`, `DECISOES_TECNICAS.md`, `docs/FSD.md`, `docs/DESIGN.md`, `docs/REFERENCIAS.md`, `docs/PLANO.md`, `docs/STATUS.md`, `docs/ERROS.md`.

## Regras de código

- Cor, espaço, sombra e movimento entram **primeiro** em `assets/css/tokens.css`; nenhum componente escreve valor solto.
- Nenhum componente calcula regra de negócio: regra vive em `assets/js/estado.js`.
- Todo texto vindo do usuário passa por `escapar()` antes de entrar no DOM.
- Toda tela tem quatro estados: carregando, vazio, erro, sucesso.
- Toda animação respeita `prefers-reduced-motion`.
- Proibido: `transition: all`, `outline: none` sem foco substituto, `100vh` sem `dvh`, cor de acento fora do token.

## Design

`docs/DESIGN.md` é a fonte única. Claro por padrão, acento único `#FF4D00`, Inter, raio por família, tab bar de cinco itens, vazio ≥ 50 % na dobra de impacto.

## Portão de qualidade

```
node ~/.claude/skills/oficio/portoes.mjs index.html --larguras 360,768,1280
```
Vermelho não entrega. Depois do portão verde, aplicar `~/.claude/skills/oficio/rubrica.md`.

## Registro

- Toda alteração de código atualiza `docs/STATUS.md`.
- Todo erro entra em `docs/ERROS.md`, mesmo corrigido.
- Nunca criar `AGENTS.md`. Este arquivo é o contexto do projeto.
