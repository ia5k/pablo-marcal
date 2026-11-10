# FSD — Especificação Funcional

## 1. Visão geral

App web responsivo de uma página, com roteador por hash, cinco abas fixas e um painel administrativo separado. Todo o estado do membro vive no navegador. Sem servidor na v1.

## 2. Documentos de implementação

Este FSD e `docs/DESIGN.md`. O DESIGN é a fonte de token; este documento é a fonte de comportamento. Em conflito, o DESIGN vence em aparência e o FSD vence em regra.

## 3. Stack

HTML5, CSS3 com custom properties, JavaScript ES2022 em módulos nativos. Sem dependência externa além do player do YouTube.

## 4. Ambientes

Local (`python3 -m http.server`), produção estática. Sem homologação dedicada na v1.

## 5. Arquitetura

MVC leve no cliente:
- **Modelo** — `estado.js` (estado + persistência + regras de negócio puras).
- **Visão** — `telas/*.js` devolvem HTML; `componentes/*.js` montam pedaços reutilizáveis.
- **Controle** — `router.js` (rotas, guarda de sessão, transição) e `app.js` (arranque, tab bar, eventos globais).

## 6. Segurança no contexto

Não há servidor, então não há injeção de SQL. Permanecem: XSS (todo texto vindo do usuário passa por escape antes de entrar no DOM), senha com hash, sessão com validade, guarda de rota, e nenhum segredo no repositório.

## 7. Estrutura base — Fase 1

`index.html`, sprite de ícones, tokens, base, componentes, roteador, tab bar, quatro estados visuais.

## 8. Dados e sementes — Fase 2

`dados/legionarios.js` (30 registros com número, nome, nascimento, telefone, cidade, igreja, área, entrada, país), `dados/igrejas.js` (12), `dados/produtos.js` (14 em 5 categorias), `dados/eventos.js` (5), `dados/faq.js` (8), `dados/conversas.js` (6), `dados/textos.js`.

## 9. Autenticação — Fase 3

Rotas `/entrar`, `/primeiro-acesso`, `/recuperar`. Guarda: qualquer rota interna sem sessão redireciona para `/entrar`.

## 10. Recursos estruturais — Fase 4

Cabeçalho, atalhos circulares, tab bar, tela "Em breve", toast, folha inferior (sheet), aviso de conexão.

## 11. Entidades — Fase 5

Legionário, Igreja, Produto, Evento, Presença, Favorito, Conversa, Mensagem, Grupo, Denúncia, ItemSobre, Destaque.

## 12. CRUDs — Fase 6

No app do membro: criar/atualizar perfil, criar/remover favorito, criar/remover presença, criar mensagem, criar denúncia. O CRUD de conteúdo é do painel (fase posterior).

## 13. Fluxos — Fase 7

Descritos no PRD §9. Cada um tem caminho feliz, caminho de erro e caminho de saída.

## 14. Validações e regras

Número com 6 dígitos; data de nascimento no formato DD/MM/AAAA; senha com mínimo de 8 caracteres e ao menos um número; telefone com 10 ou 11 dígitos; cidade obrigatória para calcular distância; imagem até 1 MB e tipo real de imagem.

## 15. Autenticação e sessão

`estado.sessao = { numero, nome, expiraEm }`, validade de 7 dias, renovada a cada abertura.

## 16. Controle de acesso

`router.js` mantém um mapa de rotas públicas e privadas e um de rotas por papel. Rota privada sem sessão → `/entrar`. Rota de papel não permitido → `/inicio` com toast.

## 17. Auditoria e histórico

Aceite de privacidade com data e hora. Sem histórico de navegação.

## 18. Soft delete

Não se aplica. Remoções são definitivas no armazenamento local.

## 19. Logs

`console.error` em falha de renderização e uma lista em memória com no máximo 50 entradas, visível no Perfil.

## 20. Configurações globais

`config.js` com app, whatsappDaLoja, tentativasMax, esperaBase, diasDeSessao, modoDemo.

## 21. Uploads

Foto de perfil com `FileReader`, limite 1 MB, assinatura de bytes verificada, redimensionamento para 512 px no cliente.

## 22. Relatórios e consultas

Busca de produto por nome e categoria; busca de igreja por denominação; filtro por distância; busca de legionário por nome ou número; busca de conversa por nome.

## 23. APIs e integrações

YouTube (iframe sob demanda), WhatsApp (`wa.me`), mapas (link universal), arquivo `.ics` gerado localmente.

## 24. Segurança funcional

Escape de HTML em todo conteúdo de usuário; nenhuma senha em claro; nenhuma chave no repositório; sessão com expiração; limite de tentativas persistido.

## 25. Organização da implementação

Fase 1 esqueleto · Fase 2 dados · Fase 3 entrada · Fase 4 estrutura · Fase 5 telas de conteúdo · Fase 6 interação (favorito, presença, perfil) · Fase 7 chats · Fase 8 movimento e refinamento · Fase 9 portão e rubrica · Fase 10 painel administrativo.

## 26. Critérios de aceitação técnica

Portão `portoes.mjs` verde em 360, 768 e 1280 px; rubrica sem reprovação; quatro estados em toda tela; nenhuma rolagem horizontal; `prefers-reduced-motion` respeitado; nenhum `transition: all`; nenhum `100vh` sem `dvh`.

## 27. Pendências

Painel administrativo completo e sincronização entre aparelhos ficam para a fase seguinte, registrados em `docs/ERROS.md` como dívida declarada.

## 28. Conclusão

A v1 é uma interface completa, navegável e persistente, com as regras do PRD aplicadas no cliente. O que falta é servidor — e isso está nomeado, não escondido.
