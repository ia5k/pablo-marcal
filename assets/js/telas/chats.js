/* ============================================================
   TELA — Conversas
   ============================================================ */

import { escapar, $, $$, toast, vazio } from '../ui.js';
import { icone } from '../icons.js';
import { listaDeConversas, buscarPessoas, criarConversa } from '../estado.js';
import { linhaConversa, topoVoltar, avatarDe } from '../componentes/pedacos.js';
import { abrirSheet } from '../ui.js';
import { ir } from '../router.js';

export const titulo = 'Conversas';
export const aba = 'chats';

let termo = '';

function listaHTML() {
  const todas = listaDeConversas();
  const itens = todas.filter((c) => !termo || c.nome.toLowerCase().includes(termo.toLowerCase()));
  if (!itens.length) {
    return vazio({
      icone: 'message',
      titulo: 'Nenhuma conversa aqui',
      texto: termo ? 'Ninguém com esse nome por enquanto.' : 'Comece uma conversa com alguém da comunidade.',
      acao: '<button class="btn btn--sm" data-nova>Nova conversa</button>'
    });
  }
  return `<div class="lista">${itens.map(linhaConversa).join('')}</div>`;
}

export function render() {
  return `
  ${topoVoltar('Conversas', { voltar: '#/inicio' })}
  <div class="wrap revelar" style="margin-bottom:var(--sp-4)">
    <div class="busca">
      ${icone('search')}
      <input type="search" id="busca-conversa" placeholder="Buscar pessoa ou grupo" aria-label="Buscar conversa" value="${escapar(termo)}">
    </div>
  </div>
  <div class="wrap" id="lista-conversas">${listaHTML()}</div>
  <button class="fab" id="nova-conversa" aria-label="Nova conversa">${icone('plus')}</button>`;
}

export function montar(raiz) {
  const campo = $('#busca-conversa', raiz);
  const alvo = $('#lista-conversas', raiz);

  const redesenhar = () => {
    termo = campo.value.trim();
    alvo.innerHTML = listaHTML();
    ligar();
  };

  function ligar() {
    $('[data-nova]', alvo)?.addEventListener('click', novaConversa);
  }

  campo.addEventListener('input', redesenhar);
  $('#nova-conversa', raiz).addEventListener('click', novaConversa);
  ligar();
}

function novaConversa() {
  const sheet = abrirSheet({
    titulo: 'Nova conversa',
    corpo: `<div class="stack">
      <div class="busca">
        ${icone('search')}
        <input type="search" id="busca-pessoa" placeholder="Nome ou número" aria-label="Buscar legionário">
      </div>
      <div id="resultado-pessoas"></div>
    </div>`
  });

  const alvo = $('#resultado-pessoas', sheet);
  const campo = $('#busca-pessoa', sheet);

  const desenhar = () => {
    const pessoas = buscarPessoas(campo.value);
    if (!pessoas.length) {
      alvo.innerHTML = `<p class="sm muted" style="padding:var(--sp-4) 0">Nenhum legionário encontrado. Confira o nome ou o número.</p>`;
      return;
    }
    alvo.innerHTML = `<div class="lista">${pessoas.map((p) => `<button class="lista__item" data-pessoa="${escapar(p.numero)}">
      ${avatarDe(p.nome, 'avatar--sm')}
      <span class="lista__corpo">
        <span class="lista__titulo">${escapar(p.nome)}</span>
        <span class="lista__sub">#${escapar(p.numero)} · ${escapar(p.cidade)}</span>
      </span>
      ${icone('chev-right', 'lista__chev')}
    </button>`).join('')}</div>`;
    $$('[data-pessoa]', alvo).forEach((b) => {
      b.addEventListener('click', () => {
        const id = criarConversa(b.dataset.pessoa);
        if (!id) return toast('Não foi possível abrir a conversa.', 'erro');
        document.querySelectorAll('.sheet, .sheet-overlay').forEach((n) => n.remove());
        ir(`/conversa/${id}`);
      });
    });
  };

  campo.addEventListener('input', desenhar);
  desenhar();
  setTimeout(() => campo.focus(), 360);
}
