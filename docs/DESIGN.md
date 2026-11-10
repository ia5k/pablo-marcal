# DESIGN SYSTEM — App dos Legionários

> Base visual extraída de `https://legendarios-v2.147-93-67-121.nip.io/#/home` (inspeção dos tokens CSS e captura das telas em 393×852).
> Substitui o vídeo `WhatsApp Video 2026-11-10 at 09.39.15.mp4` como referência visual.
> Status: **aguardando aprovação** antes de ir para o PRD.

---

## 1. Direção

**Claro, direto e de alto contraste.** Fundo branco, texto quase preto, um único acento laranja que marca tudo o que é ação ou está ativo. Cartões brancos sobre fundo levemente cinza, cantos bem arredondados, tipografia grande e pesada nos títulos, microtexto cinza para contexto. Nada de gradiente decorativo, nada de sombra pesada: a hierarquia vem do tamanho da fonte, do peso e do laranja.

O tema escuro existe no sistema, mas **não é o padrão**.

**O que transfere da referência:** linguagem visual, componentes, grade, tab bar, chips, cards, listas.
**O que NÃO transfere:** a arquitetura de informação. A referência é um app de motociclistas (market, SOS, doações, comunidade). O nosso app tem Início, Sobre, Loja, Igrejas, Perfil e Chats. Copiamos a forma, não o conteúdo.

---

## 2. Tokens de cor

### Tema claro (padrão)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F4F4F6` | Fundo da tela |
| `--bg-elev` | `#FFFFFF` | Cartões, tab bar, campos |
| `--bg-elev-2` | `#EDEDF0` | Superfícies secundárias, chips neutros |
| `--bg-elev-3` | `#E2E2E7` | Trilhos, divisores preenchidos |
| `--line` | `rgba(0,0,0,.08)` | Borda padrão |
| `--line-strong` | `rgba(0,0,0,.14)` | Borda de destaque |
| `--txt` | `#0B0B0B` | Texto primário |
| `--txt-2` | `#4A4A4F` | Texto secundário |
| `--txt-3` | `#77777E` | Legenda, metadados |
| `--accent` | `#FF4D00` | Ação, item ativo, preço |
| `--accent-2` | `#FF7A33` | Hover / gradiente |
| `--accent-soft` | `rgba(255,77,0,.12)` | Fundo de chip/badge laranja claro |

### Tema escuro (opcional)

| Token | Valor |
|---|---|
| `--bg` | `#0B0B0B` |
| `--bg-elev` | `#141414` |
| `--bg-elev-2` | `#1C1C1C` |
| `--txt` | `#FFFFFF` |
| `--txt-2` | `#B4B4B4` |
| `--txt-3` | `#8A8A8A` |
| `--accent` | `#FF4D00` (inalterado) |

### Semânticas

| Token | Valor | Uso |
|---|---|---|
| `--ok` | `#32D74B` | Confirmado, disponível |
| `--warn` | `#FFD60A` | Atenção |
| `--danger` | `#FF3B30` | Erro, destrutivo, denúncia |
| `--info` | `#0A84FF` | Informativo |

**Regra:** o laranja nunca é usado para erro nem para sucesso. Ele é exclusivo de ação e estado ativo.

---

## 3. Tipografia

Fonte: **Inter**, com fallback `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif`.

| Escala | Tamanho / entrelinha | Peso | Uso |
|---|---|---|---|
| Display | 30 / 34 | 800 | Nome do legionário no topo |
| H1 | 23 / 29 | 700 | Título de tela |
| H2 | 19 / 24 | 700 | Título de seção |
| H3 | 16 / 22 | 600 | Título de card |
| Body | 15 / 22 | 400 | Texto corrido |
| SM | 13 / 18 | 400 | Metadados, subtítulos |
| XS | 11 / 14 | 500 | Rótulo de tab, badge |

Títulos sempre com `letter-spacing` levemente negativo (-0.01em a -0.02em). Caixa alta só em kickers curtos (ex.: "EVENTO DO CONSULADO"), com `letter-spacing` positivo.

---

## 4. Espaço, raio e sombra

**Grade de espaço (múltiplos de 4):** 4, 8, 12, 16, 20, 24, 32, 40, 48. Padding lateral da tela: **20px**.

**Raios:** sm 10 · md 16 · lg 20 · xl 24 · 2xl 32 · full 999.

| Elemento | Raio |
|---|---|
| Botão, chip, pill | `full` |
| Campo de busca | `full` |
| Card | `lg` (20px) |
| Card de mídia (imagem grande) | `xl` (24px) |
| Bottom sheet | `2xl` (32px) no topo |

**Sombras:** `--sh-1: 0 1px 2px rgba(0,0,0,.08)` para campos e chips; `--sh-2: 0 12px 40px rgba(0,0,0,.14)` para sheets e tab bar flutuante; `--sh-3: 0 24px 70px rgba(0,0,0,.2)` para modais. Cards em repouso **sem sombra** — só borda `--line`.

---

## 5. Movimento

| Token | Valor |
|---|---|
| `--d-1` | 120 ms (toque, hover) |
| `--d-2` | 220 ms (transição de estado) |
| `--d-3` | 320 ms (sheet, troca de tela) |
| `--d-4` | 600 ms (revelação de conteúdo) |
| `--e-out` | `cubic-bezier(.2,0,0,1)` |
| `--e-spring` | `cubic-bezier(.32,.72,0,1)` |
| `--e-reveal` | `cubic-bezier(.16,1,.3,1)` |

Respeitar `prefers-reduced-motion: reduce` → todas as durações viram 0 e o conteúdo aparece direto.

---

## 6. Componentes

Cada um com os quatro estados obrigatórios: **repouso, pressionado, desabilitado, carregando**. Vazio e erro quando aplicável.

| Componente | Especificação |
|---|---|
| **Header** | Logo/nome pequeno em caixa alta + saudação ("Hola,") em 13px `--txt-2` + nome em Display 30/800 + linha de metadados em 13px (`Número 50.5058 · 300 temilhas`). Sem barra de app separada. |
| **Hero media** | Imagem sangrando até as bordas laterais, raio `xl`, altura ~38% da tela, sobreposição escura suave no rodapé para legibilidade. |
| **Card** | Fundo `--bg-elev`, raio `lg`, borda `--line`, padding 16–20px. Variantes: `flush` (sem padding, imagem ocupa tudo), `accent` (borda laranja), `interactive` (eleva no toque). |
| **Pill row** | Linha horizontal com rolagem, botões pílula. Ativo = fundo `--accent` + texto branco; inativo = fundo `--bg-elev` + borda `--line` + texto `--txt`. |
| **Chips de categoria** | Mesma família, versão compacta, com ícone opcional à esquerda. |
| **Segmented** | Alternador de 2–4 opções dentro de um trilho `--bg-elev-2`. |
| **Botão primário** | Pílula laranja, texto branco, 48px de altura, peso 600, ícone opcional. |
| **Botão secundário** | Pílula branca com borda `--line`, texto `--txt`. |
| **Botão de ícone** | Círculo 44×44, fundo branco, ícone outline 24px. |
| **Campo de busca** | Pílula branca, ícone de lupa à esquerda, placeholder `--txt-3`, altura 48px. |
| **Campo de formulário** | Label 13px, input com borda `--line`, foco com borda `--accent`, erro com borda `--danger` + mensagem em 13px abaixo. |
| **Lista** | Linha branca: avatar → bloco de texto (título 16/600 + subtítulo 13 `--txt-3`) → chevron `--txt-3`. Altura mínima 64px. |
| **Card de produto** | Grade de 2 colunas. Imagem quadrada com raio `md`, badge de estado no topo esquerdo, coração no topo direito, nome 15/600, preço 16/700, localização 13 `--txt-3`. |
| **Card de evento** | Imagem 16:9 no topo, kicker em caixa alta laranja, título H2, duas linhas de metadados com ícone (local, data), bloco de contagem regressiva opcional. |
| **Contagem regressiva** | Quatro blocos brancos com borda, número grande 700 e rótulo XS em caixa alta, separador ":" em laranja. |
| **Badge / pill de estado** | Pílula pequena; variantes `ok`, `warn`, `danger`, `muted`. |
| **Avatar** | Círculo; tamanhos xs 24, sm 32, base 40, lg 56; variante com anel laranja (não lido/destaque). |
| **Tab bar** | 5 itens, ícone 24px + rótulo XS. Ativo = laranja; inativo = `--txt-3`. Fundo branco, borda superior `--line`, respeitando `safe-area-inset-bottom`. |
| **FAB** | Círculo 56px laranja, ícone branco, canto inferior direito, acima da tab bar. |
| **Bottom sheet** | Sobe de baixo, raio `2xl` no topo, alça de arrasto, overlay `rgba(20,20,20,.34)`, fecha ao toque fora. |
| **Toast** | Pílula escura flutuante acima da tab bar, `aria-live="polite"`, some em 4s. |
| **Acordeão (FAQ)** | Linha com pergunta 16/600 e indicador +/−; corpo revelado com animação `--d-3`. |
| **Balão de chat** | Próprio: fundo `--accent`, texto branco, raio `lg` com canto inferior direito reto. Do outro: fundo `--bg-elev-2`, texto `--txt`. Hora em XS. |
| **Estado vazio** | Ícone outline grande em `--txt-3`, título 16/600, frase 13 `--txt-3` e a ação possível. |
| **Skeleton** | Blocos `--bg-elev-2` pulsando enquanto carrega. Nunca spinner de tela inteira. |

---

## 7. Estrutura de tela

```
┌─────────────────────────────┐
│ Header (saudação + nome)    │  padding 20px
│ Pill row (ações rápidas)    │  rolagem horizontal
├─────────────────────────────┤
│                             │
│ Conteúdo (seções)           │  rolagem vertical
│  └ Section: título + link   │
│                             │
├─────────────────────────────┤
│ Tab bar (5 itens)           │  fixa, safe-area
└─────────────────────────────┘
```

- Largura de conteúdo em telas grandes: máximo **560px** centralizado.
- Não usar moldura de celular falsa — é um app web responsivo de verdade.
- Cabeçalho rola junto com o conteúdo, exceto a tab bar, que é fixa.

---

## 8. Acessibilidade (requisito, não extra)

- Contraste mínimo **WCAG AA**: 4.5:1 para texto normal, 3:1 para texto grande e ícones. O par laranja `#FF4D00` sobre branco dá **3.4:1** — só pode ser usado em texto ≥ 18px/700 ou em ícones; texto pequeno em laranja **não**.
- Alvo de toque mínimo **44×44 px**.
- Todo ícone sozinho tem `aria-label`; todo campo tem `<label>` associado.
- Foco visível: contorno de 2px `--accent` com offset de 2px.
- Texto respeita o tamanho de fonte do sistema (nada de `px` fixo em `html`).
- Estados nunca comunicados só por cor: sempre acompanhados de ícone ou texto.

---

## 9. Ícones

Traço outline, 24×24, `stroke-width` 1.8, cantos arredondados, `currentColor`. Conjunto necessário: home, users, bag, calendar, user, heart, shield, message, search, chevron-left, chevron-right, plus, filter, map-pin, clock, play, flag, sparkle, logout, bell, x.

São desenhados como `<symbol>` num único SVG sprite no topo do documento, usados via `<use>`.

---

## 10. Mapa para as telas do app

| Tela | Como o sistema visual se aplica |
|---|---|
| **Início** | Header com saudação e número → pill row → card de vídeo em destaque (hero media + play) → seção "Próximos eventos" com cards |
| **Sobre** | Header simples + acordeão de perguntas em cartões |
| **Loja** | Título + campo de busca com filtro + chips de categoria + banner de destaque + grade de 2 colunas de produtos |
| **Igrejas** | Título + busca + lista de cartões com logo, distância e horário |
| **Chats** | Título "Chats" + busca + lista de conversas + FAB de novo chat |
| **Conversa** | Header com voltar + nome, área de balões, composer fixo acima da tab bar |
| **Perfil** | Header com avatar grande + número + lista de campos somente leitura + lista de editáveis |

---

## 11. O que este documento proíbe

- Fundo escuro como padrão.
- Gradiente colorido decorativo em botão ou card.
- Mais de uma cor de acento.
- Sombra pesada em card em repouso.
- Ícone preenchido misturado com ícone outline na mesma tela.
- Texto pequeno em laranja.
- Moldura de celular falsa na versão web.
- Biblioteca de componentes que traga visual próprio (Bootstrap, Material): o sistema é este, escrito à mão.
