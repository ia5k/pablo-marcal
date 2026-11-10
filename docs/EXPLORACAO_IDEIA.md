# Exploração da Ideia — App do Pablo Marçal

> Saída do **Passo 2 da Fase 1 (Explorar a Ideia)** da metodologia Jornada IA Vibe Coding.
> Entrevista conduzida por agente entrevistador; respostas dadas pelo papel de Product Owner, com base no vídeo de referência (`WhatsApp Video 2026-11-10 at 09.39.15.mp4`).
> **Não é PRD.** Não contém decisão técnica. Alimenta o `PRD.md` (Passo 3 da Fase 1).

---

## 1. Resumo do sistema

Aplicativo da comunidade de membros do Pablo Marçal, com identidade de membro visível em todas as telas (o número de membro) e cinco abas fixas: Sobre, Loja, Início, Igrejas e Perfil. O Início traz um vídeo em destaque e os próximos eventos; o Sobre concentra perguntas frequentes; a Loja é um catálogo sem venda dentro do app; as Igrejas formam um diretório com distância e horários; e os Chats reúnem conversas privadas entre membros e grupos por país. Um cabeçalho fixo com saudação, número, atalhos circulares (incluindo Networking, Social e Ranking, ainda "em breve") e ícones de moedas e mensagens amarra tudo. Todo o conteúdo é alimentado por um painel administrativo separado, operado pela equipe interna. v1 em português, com o Brasil como mercado inicial, e o campo país já presente em cada conteúdo.

## 2. Problema que o sistema resolve

Hoje a comunidade se comunica espalhada por grupos de WhatsApp e redes sociais, sem um lugar único e oficial. Isso gera cinco dores concretas:

- **(a) falta de identidade** — o membro não tem onde o seu número signifique alguma coisa;
- **(b) comunicação oficial se perde** no meio de grupos informais;
- **(c) eventos e avisos da liderança não têm canal próprio**;
- **(d) não existe um diretório de igrejas** com endereço, distância e horário de culto;
- **(e) não há canal direto entre membros**, muito menos entre membros de países diferentes.

O app resolve isso sendo a casa oficial da comunidade: uma porta de entrada com identidade, conteúdo curado pela liderança e um mensageiro interno — sem depender de redes externas para o essencial.

## 3. Usuários e perfis envolvidos

- **Membro (membro):** entra com número + senha, consome conteúdo, favorita produtos, confirma presença em eventos, conversa e participa dos grupos. É o único usuário do app do membro na v1.
- **Administrador (equipe interna):** acesso total ao painel — membros, igrejas, produtos, eventos, conteúdo do Início, textos do Sobre, grupos e denúncias.
- **Editor (equipe interna):** acesso ao painel restrito a Igrejas, Produtos, Eventos, Mensagem do Início e Textos do Sobre.
- **Igreja e vendedor:** aparecem como conteúdo cadastrado, **sem acesso próprio** na v1 — não têm login nem cadastro.
- **Não existe** autoatendimento de inclusão: quem não está na base não entra e é direcionado à equipe.

## 4. Funcionalidades essenciais da primeira versão

### Entrada

- Primeiro acesso: informar número de membro + data de nascimento (CPF como alternativa, se a base tiver o campo). Conferindo, o membro cria a própria senha e entra.
- Falha na conferência: mensagem "não encontramos esse número na comunidade" com o caminho de contato da equipe.
- Limite de tentativas com espera crescente, para o número não ser adivinhado.
- Login seguinte: número + senha.
- Recuperação de acesso: código enviado ao telefone que está na base, com saída secundária "falar com a liderança".
- Aviso de privacidade com aceite no primeiro acesso.

### Cabeçalho e atalhos (transversal a todas as abas)

- Avatar, saudação "Olá, Membro [nome]" e número de membro sempre visíveis.
- Ícone de mensagens abre os Chats; ícone de moedas abre tela "Em breve".
- Carrossel de atalhos circulares: Sobre, Loja, Networking, Social, Igrejas e Ranking. Networking, Social e Ranking abrem tela curta de "Em breve" com o nome e uma frase do que virá — não são ocultados.
- Navegação inferior de cinco abas: Sobre, Loja, Início, Igrejas, Perfil.

### Início

- **Bloco Mensagens:** um único vídeo em destaque por vez, com arte e título cadastrados. Ao tocar, toca em player dentro do app, começando sem som, indo para tela cheia na horizontal. Sem vídeo cadastrado, o bloco permanece visível com arte fixa e uma frase curta.
- **Bloco Próximos eventos:** cards com data, banner, título e selo de status manual ("Disponível", "Em breve", "Encerrado"). O ícone de agenda no título do bloco leva à lista completa de eventos.

### Evento (tela de detalhe)

- Data, horário, local, descrição, imagem.
- Botão "Vou participar"; após confirmar, exibe contagem e lista de nomes dos confirmados e permite "Cancelar presença". A liderança vê quem confirmou.
- "Adicionar à agenda" baixa um arquivo de calendário.
- Sem vagas limitadas, sem fila de espera, sem check-in e sem evento recorrente — cada edição é cadastrada uma a uma.

### Sobre

- Acordeão de perguntas frequentes com textos institucionais (formação, empreendedorismo, trabalho em equipe, inovação), com ordem definida pela equipe.

### Loja

- Busca ("Encontre o que precisa") e filtro.
- Categorias (Camisetas, Bonés, Pulseiras, Bandana e outras definidas pela equipe).
- Banner de destaque ("Produtos exclusivos / todos LEGENDÁRIOS / Comprar Aqui"), por curadoria manual.
- "Mais vendidos" (lista curada à mão) com "Ver todos".
- Cards de produto com imagem, nome, preço e coração de favoritar.
- Detalhe do produto com variação (ex.: tamanho/cor) e quantidade.
- "Comprar Aqui" monta a mensagem do pedido (produto, variação, quantidade) e sai do app para WhatsApp ou checkout externo. **Sem carrinho, sem pagamento, sem frete, sem estoque.**
- Favoritos ligados ao número do membro, não ao aparelho.

### Igrejas

- Busca por denominação ("Encontre a denominação") e filtro.
- "Mais próximo" com "Ver todos": a distância é calculada a partir da cidade/estado informados no perfil — **o app não pede localização**.
- Cards com logo, nome, distância e horários de culto.
- "Como chegar" abre o aplicativo de mapas do aparelho com o endereço cadastrado.
- Lista completa de igrejas.

### Chats

- Lista de conversas com avatar ou bandeira, nome, prévia da última mensagem e chevron; busca "Procure chat".
- Botão "+" para buscar qualquer membro por nome ou número e abrir conversa privada.
- Conversa privada: balões enviados/recebidos, envio de imagem, bloqueio e denúncia da conversa.
- Grupos por país/time (ex.: "Brasil I BC", "Argentina I TL"): todos os membros escrevem; a liderança fixa avisos no topo e remove mensagens; o administrador remove participantes.
- Atualização ao abrir a conversa e ao puxar para baixo — **sem entrega instantânea na v1**.
- Sem áudio, sem vídeo e sem documento na v1.

### Perfil

- Somente leitura: nome, número, igreja vinculada, data de entrada.
- Editável pelo membro: foto, cidade/estado, telefone e área de atuação.
- Mostra favoritos da Loja e eventos confirmados, com acesso às conversas.
- Sair da conta.
- Sem versão "como os outros me veem".

### Painel administrativo

- Área separada do app do membro, acessada pelo navegador, com login próprio de equipe (e-mail e senha).
- Telas: Visão geral (contadores), Membros, Igrejas, Produtos, Eventos (com lista de confirmados), Mensagem do Início, Textos do Sobre, Grupos, Denúncias.
- Membros, Grupos e Denúncias exclusivos do administrador; o editor vê Igrejas, Produtos, Eventos, Mensagem do Início e Textos do Sobre.
- Inclusão de novos membros e correção de vínculo feitas aqui.
- Curadoria de todos os destaques, com campo de destaque e ordem.
- Sem histórico de alterações na v1.

### Comportamento transversal (vazio e sem conexão)

- Todo bloco vazio tem frase curta e neutra + a ação possível (limpar busca, trocar categoria, voltar). Nunca tela em branco.
- Sem conexão: o conteúdo já carregado continua legível com aviso fixo no topo; ações que gravam dados dão aviso de bloqueio e **não** ficam pendentes para envio posterior.

## 5. Funcionalidades que ficam fora da primeira versão

### Útil depois

- Networking (diretório de membros com busca por cidade e área de atuação, com botão que abre conversa).
- Social (mural oficial de avisos e conteúdos da liderança).
- Ranking (pódio de engajamento por presença em evento e mensagem assistida, por país e por igreja).
- Moedas (ícone já presente no cabeçalho) e qualquer lógica de pontos/benefícios.
- Notificações e avisos push.
- Carrinho e checkout próprios.
- Inscrição em eventos com vagas, fila de espera e check-in (a confirmação simples já entrou na v1).
- Áudio, vídeo e documento no chat.
- Entrega instantânea de mensagens.
- Tradução e multi-idioma (espanhol, inglês).
- Versão "como os outros me veem" no perfil.
- Histórico de alterações no painel.
- Acesso próprio de igreja e de vendedor; cadastro e aprovação de conteúdo por terceiros.

### Avançado demais

- Pagamento real dentro do app.
- Transmissão ao vivo.
- Chat em tempo real em escala.
- Geolocalização por GPS e rotas reais dentro do app.
- Hospedagem própria de vídeo.

## 6. Informações que o sistema precisa armazenar

- **Membro:** número (único), nome, data de nascimento, CPF (quando houver), telefone, cidade/estado, área de atuação, foto, igreja vinculada, data de entrada, credencial de acesso (senha criada pelo próprio membro), situação (ativo/inativo) e país.
- **Controle de acesso:** tentativas de primeiro acesso e espera em curso; código e validade de recuperação de acesso.
- **Igreja:** nome/denominação, logo, endereço, cidade/estado, país, horários de culto, destaque e ordem.
- **Produto:** nome, imagens, preço, categoria, variações (ex.: tamanho, cor), descrição, favorito, destaque e ordem.
- **Evento:** título, imagem, data, horário, local, descrição, status manual, e a lista de quem confirmou presença (com data/hora da confirmação).
- **Conteúdo do Início:** link do vídeo, título, arte do card e destaque.
- **Textos do Sobre:** pergunta, resposta e ordem.
- **Conversas e grupos:** participantes, mensagens (texto ou imagem, autor, data/hora), mensagem removida, aviso fixado, nome e país/time do grupo, bloqueios entre membros e denúncias (quem denunciou, contra quem, motivo, situação).
- **Favoritos:** vínculo entre número do membro e produto.
- **Equipe:** login e papel (administrador ou editor).
- **Não precisa armazenar na v1:** estoque, pedido, pagamento, frete, saldo de moedas e pontuação de ranking.

## 7. Regras de negócio identificadas

1. O número de membro é único, vem de uma base existente, é somente leitura, não tem níveis nem hierarquia e é a identidade principal do membro.
2. O vínculo entre pessoa e número acontece no primeiro acesso, conferindo data de nascimento (ou CPF) contra a base; o membro então cria a própria senha.
3. Número não encontrado na base encerra o fluxo com mensagem própria e caminho para a equipe — não há cadastro próprio na v1.
4. Há limite de tentativas de primeiro acesso com espera crescente.
5. Recuperação de acesso só pelo telefone que já está na base, ou pela liderança.
6. Todo conteúdo é global, com o campo país em cada item, sem tradução na v1; as bandeirinhas identificam o país do contato ou do grupo.
7. A igreja do membro vem da base e não é escolhida nem editada por ele.
8. A distância das igrejas é calculada pela cidade/estado do perfil; o app nunca pede localização.
9. A Loja não vende: "Comprar Aqui" apenas monta a mensagem do pedido e entrega ao WhatsApp ou checkout externo.
10. Favoritos pertencem ao número do membro, não ao aparelho, e exigem estar logado.
11. Todo destaque (banner da Loja, "Mais vendidos", vídeo do Início, igreja em evidência) é curadoria manual com ordem definida no painel — nada é calculado automaticamente.
12. O bloco Mensagens exibe um vídeo por vez, tocado dentro do app, iniciando sem som, com tela cheia na horizontal; sem vídeo, permanece visível com arte fixa.
13. O evento tem status manual ("Disponível", "Em breve", "Encerrado") e confirmação simples: sem vagas, sem espera, sem check-in, sem recorrência.
14. A lista de confirmados de um evento é visível aos membros; a liderança vê quem confirmou; o próprio membro cancela a presença.
15. Qualquer membro pode iniciar conversa com qualquer outro, por nome ou número; bloqueio e denúncia estão sempre disponíveis.
16. Denúncia cai no painel da equipe.
17. Nos grupos de país/time todos escrevem; a liderança fixa avisos e remove mensagens; o administrador remove participantes.
18. A conversa atualiza ao abrir e ao puxar para baixo — sem promessa de instantaneidade.
19. Networking, Social e Ranking ficam visíveis como atalhos, mas apenas com tela "Em breve" e uma frase descritiva.
20. Nenhuma tela fica em branco: todo vazio tem frase e ação; sem conexão, o já carregado continua legível e as ações de escrita são bloqueadas com aviso, sem fila de envio.
21. O painel é área separada, com dois papéis; Membros, Grupos e Denúncias são exclusivos do administrador.
22. Nomenclatura: "Membro" designa a pessoa; "LEGENDÁRIOS" é marca gráfica da Loja.

## 8. Dúvidas levantadas e decisão adotada

| # | Dúvida | Decisão adotada |
|---|---|---|
| 1 | Ícone de moedas no cabeçalho | Visível; abre tela "Em breve". Sem saldo nem transação na v1. |
| 2 | Ícone de mensagens no cabeçalho | Abre diretamente a aba de Chats. Não existe central de notificações na v1. |
| 3 | "Membro" x "Legendário" | "Membro" no texto e no cabeçalho; "LEGENDÁRIOS" só como marca gráfica da Loja. |
| 4 | Entrada nos grupos de país/time | A equipe cria o grupo e adiciona os membros; o membro pode sair, mas não criar grupos na v1. |
| 5 | Limite de tentativas de acesso | Cinco tentativas, com espera crescente até 15 minutos, e orientação para falar com a liderança. |
| 6 | Destino do "Como chegar" | Abre o aplicativo de mapas do aparelho com o endereço cadastrado; nenhuma rota ou GPS dentro do app. |
| 7 | Acessibilidade | **Requisito da v1**: contraste mínimo WCAG AA, área de toque mínima de 44×44 px, textos legíveis por leitor de tela e respeito à fonte ampliada do sistema. |
| 8 | Privacidade / LGPD | Aviso de privacidade com aceite no primeiro acesso, registrando data e hora do aceite. Sem gestão de consentimento nem exclusão pelo próprio membro na v1. |
| 9 | Notificações | Nenhum aviso é prometido na v1; o membro descobre conteúdo ao abrir o app. |
| 10 | Nome exibido em listas e conversas | Nome e sobrenome da base, somente leitura, sem apelido. |

## 9. Recomendações para a criação do PRD

### O que o PRD não deve inventar

- **Não transforme a Loja em e-commerce.** Nada de carrinho, pagamento, frete, cupom, estoque, pedido ou rastreio.
- **Não prometa tempo real.** Escrever literalmente "atualiza ao abrir e ao puxar para baixo".
- **Não invente geolocalização.** Sem GPS, sem mapa próprio, sem rota.
- **Não crie feed social.** Social é mural da liderança; membro não publica.
- **Não crie inscrição com vagas** em eventos.
- **Não crie cadastro de igreja, de vendedor nem de membro.**
- **Não transforme o bloco Mensagens em lista ou playlist** nem prometa hospedagem de vídeo.
- **Não atribua níveis, hierarquia ou poder ao número.**
- **Não inclua multi-idioma, moedas, ranking, Networking ou Social funcionando.**
- **Não descreva telas que não existem** — para os três atalhos futuros o requisito é a tela "em breve".
- **Não escreva arquitetura, tecnologia, banco ou hospedagem** — pertence às Decisões Técnicas.
- **Não importe o vídeo como requisito.** O vídeo é referência visual.

### Como escrever

- Um requisito por comportamento observável, com critério de aceite verificável.
- Marcar em cada requisito **quem** faz: membro, administrador ou editor.
- Separar três blocos: app do membro, painel administrativo e conteúdo.
- Tratar estados de exceção como requisito de primeira classe: vazio, sem conexão, sem vídeo cadastrado, sem evento, sem igreja na cidade, sem conversa, número não encontrado, senha errada.
- Manter glossário curto (Membro, LEGENDÁRIOS, Igreja, Grupo de país/time, Mensagem em destaque, Selo do evento).
