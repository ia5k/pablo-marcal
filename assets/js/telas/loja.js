/* ============================================================
   TELA — Loja
   ============================================================ */

import { escapar, $, $$, toast, vazio } from '../ui.js';
import { icone } from '../icons.js';
import { PRODUTOS, CATEGORIAS } from '../dados.js';
import { ehFavorito, alternarFavorito } from '../estado.js';
import { cartaoProduto, topoVoltar } from '../componentes/pedacos.js';

export const titulo = 'Loja';
export const aba = 'loja';

const filtro = { termo: '', categoria: 'Todas' };

function filtrar() {
  return PRODUTOS
    .filter((p) => filtro.categoria === 'Todas' || p.categoria === filtro.categoria)
    .filter((p) => !filtro.termo || p.nome.toLowerCase().includes(filtro.termo.toLowerCase()))
    .sort((a, b) => a.destaque - b.destaque);
}

function gradeHTML() {
  const itens = filtrar();
  if (!itens.length) {
    return vazio({
      icone: 'bag',
      titulo: 'Nada por aqui',
      texto: `Nenhum produto combina com "${filtro.termo}". Tente outra palavra ou volte para todas as categorias.`,
      acao: '<button class="btn btn--sm" data-limpar>Ver tudo</button>'
    });
  }
  return `<div class="grade-produtos">${itens.map((p) => cartaoProduto(p, { fav: ehFavorito(p.id) })).join('')}</div>`;
}

export function render() {
  return `
  ${topoVoltar('Loja', { voltar: '#/inicio', acoes: `<button class="btn btn--icon btn--ghost" id="loja-busca" aria-label="Buscar produto">${icone('search')}</button>` })}

  <div class="wrap revelar" style="margin-bottom:var(--sp-4)">
    <div class="busca" id="bloco-busca" hidden>
      ${icone('search')}
      <input type="search" id="campo-busca" placeholder="Camiseta, boné, copo…" aria-label="Buscar produto" value="${escapar(filtro.termo)}">
      <button id="limpar-busca" aria-label="Limpar busca" hidden>${icone('x')}</button>
    </div>
  </div>

  <div class="pill-row scroller revelar" role="group" aria-label="Categorias">
    ${['Todas', ...CATEGORIAS].map((c) => `<button class="pill" data-cat="${escapar(c)}" aria-pressed="${filtro.categoria === c}">${escapar(c)}</button>`).join('')}
  </div>

  <div class="wrap" id="grade-loja">${gradeHTML()}</div>`;
}

export function montar(raiz) {
  const bloco = $('#bloco-busca', raiz);
  const campo = $('#campo-busca', raiz);
  const limpar = $('#limpar-busca', raiz);
  const grade = $('#grade-loja', raiz);

  $('#loja-busca', raiz).addEventListener('click', () => {
    bloco.hidden = !bloco.hidden;
    if (!bloco.hidden) campo.focus();
  });

  campo.addEventListener('input', () => {
    filtro.termo = campo.value.trim();
    limpar.hidden = !filtro.termo;
    redesenhar();
  });
  limpar.addEventListener('click', () => {
    campo.value = '';
    filtro.termo = '';
    limpar.hidden = true;
    redesenhar();
    campo.focus();
  });

  $$('[data-cat]', raiz).forEach((p) => {
    p.addEventListener('click', () => {
      filtro.categoria = p.dataset.cat;
      $$('[data-cat]', raiz).forEach((o) => o.setAttribute('aria-pressed', String(o === p)));
      redesenhar();
    });
  });

  function redesenhar() {
    grade.innerHTML = gradeHTML();
    ligarFavoritos();
    $('[data-limpar]', grade)?.addEventListener('click', () => {
      filtro.termo = '';
      filtro.categoria = 'Todas';
      campo.value = '';
      limpar.hidden = true;
      $$('[data-cat]', raiz).forEach((o) => o.setAttribute('aria-pressed', String(o.dataset.cat === 'Todas')));
      redesenhar();
    });
  }

  function ligarFavoritos() {
    $$('[data-fav]', grade).forEach((b) => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        const ativo = alternarFavorito(b.dataset.fav);
        b.setAttribute('aria-pressed', String(ativo));
        toast(ativo ? 'Salvo nos favoritos.' : 'Removido dos favoritos.', ativo ? 'ok' : 'aviso');
      });
    });
  }

  ligarFavoritos();
}
