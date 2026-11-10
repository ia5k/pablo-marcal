# PLANO DE EXECUÇÃO

Extraído do `docs/FSD.md` §25. Uma fase por vez, testada e registrada.

| Fase | Entrega | Critério de pronto |
|---|---|---|
| 1 | Esqueleto: `index.html`, sprite, tokens, base, componentes, roteador, tab bar | Abre no navegador, navega entre rotas vazias, quatro estados visíveis |
| 2 | Dados semente | Telas leem das sementes; nenhum texto solto no HTML |
| 3 | Entrada: primeiro acesso, login, recuperação | Regras do PRD §7 aplicadas; sessão persiste |
| 4 | Estrutura: cabeçalho, atalhos, "Em breve", toast, sheet | Navegação completa por atalho e aba |
| 5 | Início, Sobre, Loja, Igrejas | Conteúdo real, busca e filtro funcionando |
| 6 | Evento, produto, perfil, favorito, presença | Estado persiste ao recarregar |
| 7 | Chats: lista, conversa, novo chat, bloqueio, denúncia | Envio e recebimento simulados; denúncia registrada |
| 8 | Movimento e refinamento cinematográfico | Cada animação explica algo; `prefers-reduced-motion` respeitado |
| 9 | Portão e rubrica | `portoes.mjs` verde em 360/768/1280; rubrica sem reprovação |
| 10 | Painel administrativo | Login de equipe, telas do PRD §5, dois papéis |

## Dívida declarada

- Sincronização entre aparelhos e pessoas (exige servidor).
- Painel administrativo completo, se a fase 10 não couber na janela.
- Notificações push.
