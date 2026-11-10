# REFERÊNCIAS — o que foi medido

Âncora única deste projeto: `https://legendarios-v2.147-93-67-121.nip.io/#/home`.
Medida em 2026-11-10, viewport 393×852. Nada aqui é adjetivo — é número.

## Ficha da âncora

| Campo | Medida |
|---|---|
| Proporção do quadro | 393 × 852 → **0,461** |
| Cor do campo (mediana da borda) | **#F0F0F0** (token de projeto: `#F4F4F6`) |
| Fração ocupada por conteúdo | **32,8 %** |
| Fração vazia | **67,2 %** |
| Margem superior | 25 px |
| Margem lateral | **0 px** — o herói sangra até a borda |
| Acento laranja | **3,3 %** da área da tela |
| Paleta quantizada (6) | #F0F0F0 63,4 % · #E0E0E0 2,7 % · #000000 1,4 % · #201000 1,4 % · #D0D0D0 1,1 % · #502010 0,9 % |
| Fonte | Inter, 7 níveis, display 30/34 peso 800 |
| Grade de espaço | múltiplos de 4, ritmo dominante 16 px, padding lateral 20 px |

## Como a âncora acerta os doze itens da rubrica

1. **Herói único** — o nome em display 30/800 domina; o card de evento vem depois, sem competir.
2. **Vazio intencional** — 67 % da tela. Acima do piso de 50 %.
3. **Escala 8:1** — 30 px de display contra 11 px de rótulo de tab: razão 2,7; contra o corpo de 13 px: 2,3. A hierarquia vem de **peso e cor**, não só de tamanho — o que permite escala menor sem achatar.
4. **Acento único** — laranja em 3,3 % da área, longe do teto de 15 %.
5. **Grade** — tudo em 20 px de padding; a mídia sangra de propósito, o que é exceção declarada.
6. **Texto** — Inter 15/22 no corpo; medida curta porque as colunas são estreitas por natureza.
7. **Quatro estados** — a âncora não tem; é lacuna dela, não nossa. O projeto entrega os quatro.
8. **Movimento** — durações de 120/220/320/600 ms com curva `cubic-bezier(.2,0,0,1)`.
9. **360 px** — a âncora é mobile-first e não quebra.
10. **Material** — raio consistente por família (pílula cheia, cartão 20, mídia 24), borda única de 1 px.
11. **Foco** — a âncora não desenha foco próprio; lacuna dela. O projeto desenha.
12. **Detalhe de ofício** — o bloco de contagem regressiva em quatro pastilhas com separador laranja.

## O que se copia e o que não se copia

**Copia-se:** proporção, fração de vazio, disciplina de acento, passo de 4 px, razão de escala, família de raio, tab bar de 5 itens.

**Não se copia:** a arquitetura de informação (a âncora é um app de motociclistas), o espanhol, a moldura falsa de iPhone, e a ausência de estados.

## Regras de vazio (§3.1)

- Peça de impacto: vazio ≥ 50 % da dobra.
- Nenhum gradiente de fundo para preencher vazio.
- O vazio separa grupos; nunca empurra conteúdo para o topo deixando a metade de baixo morta.
