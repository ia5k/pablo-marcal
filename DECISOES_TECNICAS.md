# DECISÕES TÉCNICAS

## 1. Linguagem e framework

**HTML, CSS e JavaScript puro (ES Modules). Sem framework, sem build.**
Motivo: a âncora medida é um SPA estático de 8 KB com módulos nativos; a maior parte desta v1 é interface e estado local. Um framework adicionaria passo de build, dependência e tempo de arranque sem resolver nenhum problema que exista aqui. Se um dia entrar, entra como decisão nova registrada neste documento.

## 2. Banco de dados

**Nenhum servidor de banco na v1.** Os dados vivem em dois lugares:
- `assets/js/dados/*.js` — semente imutável (legionários da base, igrejas, produtos, eventos, FAQ, textos legais).
- `localStorage` — o que o membro produz (sessão, favoritos, presenças, perfil editado, conversas locais).

**Consequência declarada:** não há sincronização entre aparelhos nem entre pessoas. O chat da v1 é local: cada navegador tem suas próprias conversas. Isso é limitação de protótipo, não de produto — está registrado como dívida em `docs/ERROS.md`.

## 3. Ambiente local

Servidor estático: `python3 -m http.server 5173` na raiz do projeto. Sem instalação de nada.

## 4. Deploy

Qualquer hospedagem estática (Hostnet, Netlify, GitHub Pages). Sem variável de ambiente, sem segredo, sem processo.

## 5. Organização de pastas

```
/
  index.html
  app/            painel administrativo (fase posterior)
  assets/
    css/  tokens.css  base.css  componentes.css  telas.css  movimento.css
    js/   app.js  router.js  estado.js  telas/*.js  componentes/*.js  dados/*.js  icons.js
    img/
  docs/
```

## 6. Login e sessão

Autenticação **simulada contra a semente local**, com as regras do PRD: número + data de nascimento, senha criada no primeiro acesso (hash SHA-256 via `crypto.subtle`), limite de 5 tentativas com espera crescente, recuperação por código de 6 dígitos exibido no próprio app em modo demonstração. Sessão em `localStorage` com validade de 7 dias.

Senha nunca é gravada em texto claro, nem na simulação.

## 7. Perfis

`legionario`, `administrador`, `editor`. Verificado no roteador por guarda de rota.

## 8. Auditoria

Sem tabela de auditoria na v1. O aceite de privacidade registra data e hora.

## 9. Soft delete

Semente é imutável; itens removidos pelo membro (favorito, presença) são apagados de fato no `localStorage`.

## 10. Logs

Erros de runtime em `console.error` e numa lista `diario` em memória, exibida no Perfil em modo de desenvolvimento. Nada é enviado para fora.

## 11. Contingência

Sem servidor para cair. `localStorage` indisponível → o app funciona em memória e avisa que nada será salvo.

## 12. Uploads

Foto de perfil: `FileReader` → data URL → `localStorage`, com limite de 1 MB e validação de tipo real por assinatura de bytes. Sem upload para servidor.

## 13. Exportações

"Adicionar à agenda" gera `.ics` no cliente. Nada mais exporta na v1.

## 14. APIs e integrações

- Vídeo do Início: player embutido do YouTube via iframe, carregado só ao toque.
- "Comprar Aqui": `wa.me` com o pedido na query.
- "Como chegar": `maps` do sistema operacional via link universal.

Nenhuma chave de API. Nenhum segredo no repositório.

## 15. Configurações globais

`assets/js/config.js`: nome do app, número de WhatsApp da loja, tempo de espera por tentativa, duração de sessão, flag de demonstração.

## 16. Outras decisões

- **Acessibilidade**: alvo de 44 px, contraste AA, foco visível desenhado, `prefers-reduced-motion` respeitado em toda animação.
- **Sem biblioteca de UI**: o sistema visual é o de `docs/DESIGN.md`, escrito à mão.
- **Ícones**: sprite SVG único com `<symbol>`.
- **Formato do código**: módulos ES, um arquivo por tela, sem transpilação.
