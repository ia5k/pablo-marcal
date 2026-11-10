/* ============================================================
   PEÇADOS — blocos reutilizados por mais de uma tela
   ============================================================ */

import { escapar, arte, dataCurta, horaCurta, haQuanto } from '../ui.js';
import { icone } from '../icons.js';

export function dinheiro(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function iniciais(nome) {
  const partes = String(nome ?? '').trim().split(/\s+/);
  return ((partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '')).toUpperCase() || '?';
}

export function avatarDe(nome, classe = '') {
  return `<span class="avatar ${classe}" aria-hidden="true">${escapar(iniciais(nome))}</span>`;
}

export function topoVoltar(titulo, { voltar = '#/inicio', acoes = '' } = {}) {
  return `<div class="topo">
    <a class="btn btn--icon btn--ghost" href="${escapar(voltar)}" aria-label="Voltar">${icone('chev-left')}</a>
    <h1 class="topo__titulo">${escapar(titulo)}</h1>
    ${acoes}
  </div>`;
}

export function cartaoEvento(e, { vai = false } = {}) {
  const selo = e.status === 'Disponível'
    ? '<span class="badge badge--acento evento__selo">Inscrições abertas</span>'
    : e.status === 'Em breve'
      ? '<span class="badge evento__selo">Em breve</span>'
      : '<span class="badge badge--warn evento__selo">Encerrado</span>';
  return `<a class="card card--flush card--interativo evento revelar" href="#/evento/${escapar(e.id)}">
    <div class="evento__capa">
      ${selo}
      <img src="${arte(e.id)}" alt="" width="640" height="400" decoding="async">
    </div>
    <div class="evento__corpo">
      <p class="kicker">${escapar(e.kicker)}</p>
      <h2 class="h2" style="margin-top:var(--sp-1)">${escapar(e.titulo)}</h2>
      <div class="evento__meta">
        <span>${icone('calendar')}${escapar(dataCurta(e.data))} · ${escapar(e.hora)}</span>
        <span>${icone('pin')}${escapar(e.local)}</span>
        ${vai ? `<span class="badge badge--ok">${icone('check')}Você vai</span>` : ''}
      </div>
    </div>
  </a>`;
}

export function cartaoProduto(p, { fav = false } = {}) {
  return `<div class="produto revelar">
    <a class="produto__midia" href="#/produto/${escapar(p.id)}" aria-label="${escapar(p.nome)} — ${escapar(dinheiro(p.preco))}">
      <img src="${arte(p.id, { forma: 'bloco' })}" alt="" width="400" height="400" loading="lazy" decoding="async">
      ${p.tag ? `<span class="badge badge--acento produto__tag">${escapar(p.tag)}</span>` : ''}
    </a>
    <button class="produto__fav" data-fav="${escapar(p.id)}" aria-pressed="${fav}" aria-label="Favoritar ${escapar(p.nome)}">
      ${icone('heart')}
    </button>
    <a href="#/produto/${escapar(p.id)}">
      <p class="produto__nome">${escapar(p.nome)}</p>
      <p class="produto__preco">${escapar(dinheiro(p.preco))}</p>
    </a>
  </div>`;
}

export function linhaIgreja(ig) {
  return `<button class="lista__item" data-igreja="${escapar(ig.id)}">
    <img class="igreja__logo" src="${arte(ig.id, { forma: 'bloco' })}" alt="" width="44" height="44" loading="lazy">
    <span class="lista__corpo">
      <span class="lista__titulo">${escapar(ig.nome)}</span>
      <span class="lista__sub">${escapar(ig.cidade)} · ${escapar(ig.horarios)}</span>
    </span>
    <span class="badge">${escapar(String(ig.km).replace('.', ','))} km</span>
    ${icone('chev-right', 'lista__chev')}
  </button>`;
}

export function linhaConversa(c) {
  const ultima = c.ultima;
  const previa = ultima ? `${ultima.de === 'eu' ? 'Você: ' : ''}${ultima.texto}` : 'Sem mensagens';
  return `<a class="lista__item" href="#/conversa/${escapar(c.id)}">
    ${avatarDe(c.nome, c.tipo === 'grupo' ? '' : 'avatar--sm')}
    <span class="lista__corpo">
      <span class="lista__titulo">${escapar(c.nome)}</span>
      <span class="lista__sub">${escapar(previa)}</span>
    </span>
    <span class="xs muted">${ultima ? escapar(haQuanto(ultima.em)) : ''}</span>
  </a>`;
}

export function contagemHTML(dataISO) {
  const alvo = new Date(`${dataISO}T12:00:00`).getTime();
  return `<div class="contagem" data-contagem="${escapar(dataISO)}" role="group" aria-label="Contagem para o evento">
    <div class="contagem__bloco"><span class="contagem__num" data-d>--</span><span class="contagem__rot">dias</span></div>
    <span class="contagem__sep" aria-hidden="true">:</span>
    <div class="contagem__bloco"><span class="contagem__num" data-h>--</span><span class="contagem__rot">horas</span></div>
    <span class="contagem__sep" aria-hidden="true">:</span>
    <div class="contagem__bloco"><span class="contagem__num" data-m>--</span><span class="contagem__rot">min</span></div>
    <span class="contagem__sep" aria-hidden="true">:</span>
    <div class="contagem__bloco"><span class="contagem__num" data-s>--</span><span class="contagem__rot">seg</span></div>
  </div>`;
}

export function ligarContagens(raiz = document) {
  const nos = [...raiz.querySelectorAll('[data-contagem]')];
  if (!nos.length) return () => {};
  const tique = () => {
    const agora = Date.now();
    nos.forEach((no) => {
      const alvo = new Date(`${no.dataset.contagem}T12:00:00`).getTime();
      let resto = Math.max(0, alvo - agora);
      const d = Math.floor(resto / 86_400_000); resto %= 86_400_000;
      const h = Math.floor(resto / 3_600_000); resto %= 3_600_000;
      const m = Math.floor(resto / 60_000); resto %= 60_000;
      const s = Math.floor(resto / 1000);
      const por = (sel, v) => {
        const el = no.querySelector(`[data-${sel}]`);
        if (el && el.textContent !== String(v).padStart(2, '0')) el.textContent = String(v).padStart(2, '0');
      };
      por('d', d); por('h', h); por('m', m); por('s', s);
    });
  };
  tique();
  const id = setInterval(tique, 1000);
  return () => clearInterval(id);
}

export function linhaTitulo(titulo, link, href) {
  return `<div class="linha-titulo">
    <h2 class="secao__titulo">${escapar(titulo)}</h2>
    ${link ? `<a class="secao__link" href="${escapar(href)}">${escapar(link)}${icone('chev-right')}</a>` : ''}
  </div>`;
}

export function seloTempo(iso) {
  return `${escapar(dataCurta(iso.slice(0, 10)))} · ${escapar(horaCurta(iso))}`;
}
