/* ============================================================
   TELA — Igrejas
   ============================================================ */

import { escapar, $, $$, toast, vazio } from '../ui.js';
import { icone } from '../icons.js';
import { IGREJAS } from '../dados.js';
import { linhaIgreja, topoVoltar } from '../componentes/pedacos.js';
import { abrirSheet } from '../ui.js';

export const titulo = 'Igrejas';
export const aba = 'igrejas';

let termo = '';

function lista() {
  return IGREJAS
    .filter((i) => !termo || `${i.nome} ${i.cidade} ${i.endereco}`.toLowerCase().includes(termo.toLowerCase()))
    .sort((a, b) => a.km - b.km);
}

function listaHTML() {
  const itens = lista();
  if (!itens.length) {
    return vazio({ icone: 'shield', titulo: 'Nenhuma igreja encontrada', texto: 'Tente o nome da igreja ou da cidade. Se a sua não estiver aqui, fale com a liderança.', acao: '<button class="btn btn--sm" data-limpar>Limpar busca</button>' });
  }
  return `<div class="lista">${itens.map(linhaIgreja).join('')}</div>`;
}

export function render() {
  return `
  ${topoVoltar('Igrejas', { voltar: '#/inicio' })}
  <div class="wrap revelar" style="margin-bottom:var(--sp-4)">
    <div class="busca">
      ${icone('search')}
      <input type="search" id="busca-igreja" placeholder="Nome da igreja ou cidade" aria-label="Buscar igreja" value="${escapar(termo)}">
    </div>
  </div>
  <div class="wrap revelar" style="margin-bottom:var(--sp-3)">
    <p class="sm muted">${IGREJAS.length} igrejas parceiras · ordenadas pela distância até você</p>
  </div>
  <div class="wrap" id="lista-igrejas">${listaHTML()}</div>`;
}

export function montar(raiz) {
  const campo = $('#busca-igreja', raiz);
  const alvo = $('#lista-igrejas', raiz);

  const redesenhar = () => {
    termo = campo.value.trim();
    alvo.innerHTML = listaHTML();
    ligar();
  };

  function ligar() {
    $('[data-limpar]', alvo)?.addEventListener('click', () => { campo.value = ''; redesenhar(); campo.focus(); });
    $$('[data-igreja]', alvo).forEach((b) => {
      b.addEventListener('click', () => abrirIgreja(b.dataset.igreja));
    });
  }

  campo.addEventListener('input', redesenhar);
  ligar();
}

function abrirIgreja(id) {
  const ig = IGREJAS.find((i) => i.id === id);
  if (!ig) return;
  const busca = encodeURIComponent(`${ig.nome}, ${ig.endereco}, ${ig.cidade} - ${ig.uf}`);
  abrirSheet({
    titulo: ig.nome,
    corpo: `<div class="stack">
      <div class="lista__meta" style="gap:var(--sp-3)">
        <span>${icone('pin')}${escapar(ig.cidade)} · ${escapar(String(ig.km).replace('.', ','))} km</span>
        <span>${icone('clock')}${escapar(ig.horarios)}</span>
      </div>
      <p class="soft">${escapar(ig.endereco)}</p>
      <p class="sm muted">Cultos abertos a todos os membros. Chegando, apresente seu número — alguém da casa vai te receber.</p>
    </div>`,
    pe: `<a class="btn btn--primary btn--block" href="https://www.google.com/maps/search/?api=1&query=${busca}" target="_blank" rel="noopener">${icone('pin')}Traçar rota</a>`
  });
  toast('Toque em traçar rota para abrir o mapa.', 'ok');
}
