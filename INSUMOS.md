# INSUMOS

Conferência de coerência antes de codificar.

## Documentos lidos

| Documento | Papel | Coerente? |
|---|---|---|
| `PRD.md` | O que o app faz | sim |
| `DECISOES_TECNICAS.md` | Como | sim |
| `docs/FSD.md` | Comportamento por fase | sim |
| `docs/DESIGN.md` | Tokens e componentes | sim |
| `docs/REFERENCIAS.md` | Âncora medida | sim |
| `docs/EXPLORACAO_IDEIA.md` | Decisões de produto | sim |
| `docs/PLANO.md` | Fases | sim |
| `docs/STATUS.md` | Andamento | sim |
| `docs/ERROS.md` | Dívidas declaradas | sim |

## Verificação FSD × PRD

Todo requisito do PRD §5 tem seção correspondente no FSD. Nenhum requisito órfão.

## Verificação de decisões técnicas

Stack, persistência, autenticação, uploads, integrações e configuração global estão fechados. Não há lacuna que force a IA a inventar.

## Conflitos encontrados e resolvidos

1. **Vídeo × referência visual.** O vídeo mostrava tema escuro; a referência apontada pelo usuário é clara. Resolvido a favor do usuário: `docs/DESIGN.md` é claro por padrão.
2. **Referência é de outro produto.** A âncora é um app de motociclistas; copia-se a forma, não a arquitetura de informação. Registrado em `docs/REFERENCIAS.md`.
3. **Chat em tempo real × sem servidor.** Resolvido como chat local simulado, com a limitação declarada em `docs/ERROS.md`.

## Ponto de partida

Fase 1 do `docs/PLANO.md`: esqueleto.

## Riscos

- Sem backend, o chat não é real entre pessoas. Declarado.
- Painel administrativo é fase 10 e pode não caber. Declarado.
