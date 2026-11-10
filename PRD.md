# PRD — App do Pablo Marçal

Versão 1. Documento funcional, sem tecnologia. Fonte: `docs/EXPLORACAO_IDEIA.md`.

## 1. Visão geral

Aplicativo da comunidade de membros do Pablo Marçal. Uma porta de entrada com identidade (o número de membro), conteúdo curado pela liderança, diretório de igrejas, vitrine de produtos e um mensageiro interno. Cinco abas fixas: Sobre, Loja, Início, Igrejas e Perfil.

## 2. Problema que resolve

A comunidade está espalhada por grupos de WhatsApp e redes sociais, sem lugar único e oficial. Isso produz cinco dores: falta de identidade; comunicação oficial perdida em grupos informais; eventos sem canal próprio; nenhum diretório de igrejas com distância e horário; nenhum canal direto entre membros de países diferentes.

## 3. Objetivo

Ser a casa oficial da comunidade: identidade reconhecida, conteúdo da liderança em primeiro lugar, e conversa entre membros sem depender de rede externa para o essencial.

## 4. Público e perfis

- **Membro** — entra com número e senha; consome conteúdo, favorita produtos, confirma presença, conversa.
- **Administrador** — equipe interna; acesso total ao painel.
- **Editor** — equipe interna; só conteúdo (igrejas, produtos, eventos, mensagem do Início, textos do Sobre).
- **Igreja e vendedor** — são conteúdo cadastrado, sem acesso próprio na v1.

## 5. Funcionalidades da v1

### Entrada
1. Primeiro acesso com número de membro + data de nascimento conferidos na base; o membro cria a própria senha.
2. Número não encontrado encerra o fluxo com mensagem própria e caminho para a equipe.
3. Limite de tentativas com espera crescente.
4. Login seguinte com número + senha.
5. Recuperação de acesso por código enviado ao telefone da base, com saída secundária "falar com a liderança".
6. Aviso de privacidade com aceite registrado no primeiro acesso.

### Cabeçalho e navegação
7. Avatar, saudação "Olá, Membro [nome]" e número sempre visíveis.
8. Atalhos circulares: Sobre, Loja, Networking, Social, Igrejas, Ranking.
9. Networking, Social e Ranking abrem tela "Em breve" com nome e uma frase do que virá.
10. Ícone de mensagens abre Chats; ícone de moedas abre "Em breve".
11. Navegação inferior de cinco abas com estado ativo.

### Início
12. Bloco Mensagens com um vídeo em destaque por vez, arte e título cadastrados; toca em player interno, sem som, tela cheia na horizontal.
13. Sem vídeo cadastrado, o bloco permanece visível com arte fixa e frase curta.
14. Bloco Próximos eventos com cards de data, imagem, título e selo de status manual.
15. Ícone de agenda no título do bloco leva à lista completa de eventos.

### Evento
16. Detalhe com data, horário, local, descrição e imagem.
17. Botão "Vou participar" e "Cancelar presença"; após confirmar, contagem e lista de nomes.
18. "Adicionar à agenda" baixa arquivo de calendário.
19. Sem vagas, sem fila, sem check-in, sem evento recorrente.

### Sobre
20. Acordeão de perguntas frequentes com ordem definida pela equipe.

### Loja
21. Busca e filtro.
22. Categorias definidas pela equipe.
23. Banner de destaque por curadoria manual.
24. Lista "Mais vendidos" curada, com "Ver todos".
25. Cards de produto com imagem, nome, preço e favoritar.
26. Detalhe com variação e quantidade.
27. "Comprar Aqui" monta a mensagem do pedido e sai do app para WhatsApp ou checkout externo. Sem carrinho, sem pagamento, sem frete, sem estoque.
28. Favoritos ligados ao número do membro.

### Igrejas
29. Busca por denominação e filtro.
30. "Mais próximo" com "Ver todos", distância calculada pela cidade/estado do perfil. O app não pede localização.
31. Cards com logo, nome, distância e horários de culto.
32. "Como chegar" abre o aplicativo de mapas do aparelho.

### Chats
33. Lista de conversas com avatar ou bandeira, nome, prévia e chevron; busca.
34. Botão "+" busca qualquer membro por nome ou número e abre conversa privada.
35. Conversa com balões, envio de imagem, bloqueio e denúncia.
36. Grupos por país/time onde todos escrevem; liderança fixa aviso e remove mensagem; administrador remove participante.
37. Atualização ao abrir e ao puxar para baixo. Sem entrega instantânea.
38. Sem áudio, vídeo ou documento.

### Perfil
39. Somente leitura: nome, número, igreja vinculada, data de entrada.
40. Editável: foto, cidade/estado, telefone, área de atuação.
41. Mostra favoritos e eventos confirmados, com acesso às conversas.
42. Sair da conta.

### Painel administrativo
43. Área separada, no navegador, com login próprio de equipe.
44. Visão geral com contadores.
45. Telas: Membros, Igrejas, Produtos, Eventos com confirmados, Mensagem do Início, Textos do Sobre, Grupos, Denúncias.
46. Membros, Grupos e Denúncias exclusivos do administrador.
47. Curadoria de todo destaque com campo de destaque e ordem.
48. Sem histórico de alterações.

### Transversal
49. Nenhuma tela em branco: todo vazio tem frase e ação.
50. Sem conexão: o carregado continua legível com aviso no topo; ações de escrita são bloqueadas com aviso, nunca pendentes.

## 6. Fora da v1

**Útil depois:** Networking funcionando, Social funcionando, Ranking, moedas, notificações push, carrinho e checkout, inscrição com vagas, áudio/vídeo/documento no chat, entrega instantânea, multi-idioma, perfil público, histórico no painel, acesso próprio de igreja e vendedor.

**Avançado demais:** pagamento no app, transmissão ao vivo, chat em tempo real em escala, GPS e rotas internas, hospedagem própria de vídeo.

## 7. Regras de negócio

1. O número é único, vem da base, é somente leitura, sem níveis nem hierarquia.
2. O vínculo pessoa-número ocorre no primeiro acesso, conferindo data de nascimento contra a base; o membro cria a senha.
3. Número não encontrado encerra o fluxo; não há cadastro próprio.
4. Limite de cinco tentativas, com espera crescente até 15 minutos.
5. Recuperação só pelo telefone da base, ou pela liderança.
6. Conteúdo global com campo país; sem tradução na v1; bandeiras identificam contato ou grupo.
7. A igreja do membro vem da base e não é editada por ele.
8. Distância calculada pela cidade/estado do perfil; o app nunca pede localização.
9. A Loja não vende: "Comprar Aqui" entrega o pedido ao WhatsApp ou checkout externo.
10. Favoritos pertencem ao número e exigem estar logado.
11. Todo destaque é curadoria manual com ordem; nada é calculado.
12. O bloco Mensagens exibe um vídeo por vez, em player interno, sem som, tela cheia na horizontal.
13. Evento tem status manual e confirmação simples.
14. A lista de confirmados é visível aos membros; o próprio membro cancela.
15. Qualquer membro inicia conversa com qualquer outro; bloqueio e denúncia sempre disponíveis.
16. Denúncia cai no painel da equipe.
17. Nos grupos de país todos escrevem; liderança modera.
18. A conversa atualiza ao abrir e ao puxar; sem promessa de instantaneidade.
19. Networking, Social e Ranking ficam visíveis com tela "Em breve".
20. Nenhuma tela fica em branco; sem conexão, o carregado continua legível e a escrita é bloqueada.
21. O painel é área separada com dois papéis.
22. "Membro" designa a pessoa; "LEGENDÁRIOS" é marca gráfica da Loja.

## 8. Informações que o sistema controla

Membro (número, nome, nascimento, telefone, cidade/estado, área de atuação, foto, igreja, data de entrada, credencial, situação, país) · tentativas e código de recuperação · igreja (nome, logo, endereço, cidade/estado, país, horários, destaque e ordem) · produto (nome, imagens, preço, categoria, variações, descrição, destaque e ordem) · evento (título, imagem, data, horário, local, descrição, status, confirmados) · conteúdo do Início (link, título, arte) · textos do Sobre (pergunta, resposta, ordem) · conversas e grupos (participantes, mensagens, removidas, aviso fixado, bloqueios, denúncias) · favoritos · equipe (login e papel).

Não armazena na v1: estoque, pedido, pagamento, frete, saldo de moedas, pontuação de ranking.

## 9. Fluxos principais

**Primeiro acesso** → número → data de nascimento → conferência → cria senha → aceite de privacidade → Início.
**Login** → número + senha → Início.
**Confirmar presença** → Início → evento → "Vou participar" → lista atualizada → "Adicionar à agenda".
**Favoritar produto** → Loja → coração → Perfil mostra o favorito.
**Comprar** → produto → variação e quantidade → "Comprar Aqui" → sai para WhatsApp com o pedido escrito.
**Conversar** → Chats → "+" → busca membro → conversa → envio de imagem.

## 10. Critérios de aceitação

- Uma pessoa da base entra no primeiro acesso e chega ao Início sem ajuda.
- Número fora da base não entra e vê o caminho para a equipe.
- Favorito e presença confirmada sobrevivem a fechar e reabrir o app.
- Nenhuma tela fica vazia sem frase e ação.
- A 360 px nada rola na horizontal e o herói continua sendo o herói.

## 11. Pendências

Nenhuma bloqueante. As decisões provisórias da exploração estão fechadas em `docs/EXPLORACAO_IDEIA.md` seção 8.
