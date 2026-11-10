/* ============================================================
   TELA — Produto
   ============================================================ */

import { escapar, $, $$, arte, toast, vazio } from '../ui.js';
import { icone } from '../icons.js';
import { PRODUTOS } from '../dados.js';
import { CONFIG } from '../config.js';
import { ehFavorito, alternarFavorito, sessao } from '../estado.js';
import { dinheiro, topoVoltar } from '../componentes/pedacos.js';

export const titulo = 'Produto';

export function render({ id }) {
  const p = PRODUTOS.find((x) => x.id === id);
  if (!p) {
    return `${topoVoltar('Produto', { voltar: '#/loja' })}
      ${vazio({ icone: 'bag', titulo: 'Produto não encontrado', texto: 'Ele pode ter saído da loja. Veja o que está disponível hoje.', acao: '<a class="btn" href="#/loja">Voltar para a loja</a>' })}`;
  }
  const fav = ehFavorito(p.id);

  return `
  ${topoVoltar(p.nome, { voltar: '#/loja', acoes: `<button class="btn btn--icon btn--ghost" data-fav="${escapar(p.id)}" aria-pressed="${fav}" aria-label="Favoritar">${icone('heart')}</button>` })}

  <section class="wrap revelar">
    <div class="detalhe__capa" style="margin-inline:0">
      <img src="${arte(p.id, { forma: 'bloco' })}" alt="${escapar(p.nome)}" width="720" height="540" decoding="async">
      ${p.tag ? `<span class="badge badge--acento evento__selo">${escapar(p.tag)}</span>` : ''}
    </div>
  </section>

  <section class="wrap revelar" style="margin-top:var(--sp-5)">
    <p class="kicker">${escapar(p.categoria)}</p>
    <h1 class="detalhe__titulo" style="margin-top:var(--sp-1)">${escapar(p.nome)}</h1>
    <p class="h1" style="margin-top:var(--sp-2);color:var(--accent)">${escapar(dinheiro(p.preco))}</p>
    <p class="sm muted" style="margin-top:var(--sp-1)">${p.vendidos} membros já levaram este item</p>
  </section>

  ${p.variacoes.length > 1 ? `
  <section class="secao revelar">
    <div class="linha-titulo"><h2 class="secao__titulo">Tamanho</h2></div>
    <div class="chips scroller" role="group" aria-label="Tamanho">
      ${p.variacoes.map((v, i) => `<button class="chip" data-var="${escapar(v)}" aria-pressed="${i === 0}">${escapar(v)}</button>`).join('')}
    </div>
  </section>` : ''}

  <section class="secao revelar">
    <div class="wrap">
      <div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:var(--sp-4)">
        <div>
          <p class="h3">Quantidade</p>
          <p class="xs muted">Envio para todo o Brasil</p>
        </div>
        <div style="display:flex;align-items:center;gap:var(--sp-2)">
          <button class="btn btn--icon" id="q-menos" aria-label="Diminuir quantidade">${icone('chev-left')}</button>
          <span class="h1" id="q-valor" aria-live="polite" style="min-width:2ch;text-align:center;font-variant-numeric:tabular-nums">1</span>
          <button class="btn btn--icon" id="q-mais" aria-label="Aumentar quantidade">${icone('chev-right')}</button>
        </div>
      </div>
    </div>
  </section>

  <section class="secao revelar">
    <div class="wrap stack">
      <p class="sm soft">Peça pelo WhatsApp da loja: o pedido sai com seu número de membro e o tamanho escolhido, para a equipe separar a peça certa.</p>
      <a class="btn btn--primary btn--block" id="comprar" href="#" rel="noopener">${icone('bag')}Comprar pelo WhatsApp</a>
      <a class="btn btn--ghost btn--block" href="#/loja">Continuar vendo</a>
    </div>
  </section>`;
}

export function montar(raiz, { id }) {
  const p = PRODUTOS.find((x) => x.id === id);
  if (!p) return;

  let variacao = p.variacoes[0];
  let qtd = 1;

  $$('[data-var]', raiz).forEach((b) => {
    b.addEventListener('click', () => {
      variacao = b.dataset.var;
      $$('[data-var]', raiz).forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    });
  });

  const valor = $('#q-valor', raiz);
  const atualizar = () => { valor.textContent = String(qtd); };
  $('#q-menos', raiz).addEventListener('click', () => { qtd = Math.max(1, qtd - 1); atualizar(); });
  $('#q-mais', raiz).addEventListener('click', () => { qtd = Math.min(9, qtd + 1); atualizar(); });

  $('[data-fav]', raiz)?.addEventListener('click', (e) => {
    const ativo = alternarFavorito(p.id);
    e.currentTarget.setAttribute('aria-pressed', String(ativo));
    toast(ativo ? 'Salvo nos favoritos.' : 'Removido dos favoritos.', ativo ? 'ok' : 'aviso');
  });

  $('#comprar', raiz).addEventListener('click', () => {
    const eu = sessao()?.numero ?? '';
    const texto = `Olá! Quero comprar: ${p.nome}${p.variacoes.length > 1 ? ` — tamanho ${variacao}` : ''} — ${qtd} un.${eu ? ` Meu número de membro é ${eu}.` : ''}`;
    const url = `https://wa.me/${CONFIG.whatsappDaLoja}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');
  });
}
