/* ============================================================
   APP — ponto de entrada: rotas, barra de abas, montagem das telas
   ============================================================ */

import { $, ativarRevelacao, hidratarImagens, toast } from './ui.js';
import { icone } from './icons.js';
import { preferencias, sessao } from './estado.js';
import { registrar, iniciarRouter, caminhoAtual } from './router.js';

import * as entrada from './telas/entrada.js';
import * as inicio from './telas/inicio.js';
import * as sobre from './telas/sobre.js';
import * as loja from './telas/loja.js';
import * as produto from './telas/produto.js';
import * as igrejas from './telas/igrejas.js';
import * as chats from './telas/chats.js';
import * as conversa from './telas/conversa.js';
import * as evento from './telas/evento.js';
import * as perfil from './telas/perfil.js';
import * as embreve from './telas/embreve.js';

const ABAS = [
  { id: 'inicio', rotulo: 'Início', icone: 'home', rota: '#/inicio' },
  { id: 'igrejas', rotulo: 'Igrejas', icone: 'shield', rota: '#/igrejas' },
  { id: 'loja', rotulo: 'Loja', icone: 'bag', rota: '#/loja' },
  { id: 'chats', rotulo: 'Conversas', icone: 'message', rota: '#/chats' },
  { id: 'perfil', rotulo: 'Perfil', icone: 'user', rota: '#/perfil' }
];

/* ---------------- rotas ---------------- */
function preparar(modulo, rota) {
  registrar(rota, {
    titulo: modulo.titulo,
    aba: modulo.aba,
    publica: modulo.publica,
    somenteVisitante: modulo.somenteVisitante,
    semAba: modulo.semAba,
    render: modulo.render,
    montar: modulo.montar
  });
}

preparar(entrada, '/entrada');
preparar(inicio, '/inicio');
preparar(sobre, '/sobre');
preparar(loja, '/loja');
preparar(produto, '/produto/:id');
preparar(igrejas, '/igrejas');
preparar(chats, '/chats');
preparar(conversa, '/conversa/:id');
preparar(evento, '/evento/:id');
preparar(perfil, '/perfil');
preparar(embreve, '/em-breve/:chave');

/* ---------------- barra de abas ---------------- */
function desenharAbas(rota) {
  const barra = document.getElementById('tabbar');
  if (!barra) return;
  const visivel = !rota.semAba && !rota.somenteVisitante;
  barra.hidden = !visivel;
  if (!visivel) return;
  barra.innerHTML = ABAS.map((a) => {
    const ativo = a.id === rota.aba;
    return `<a class="tab" href="${a.rota}" ${ativo ? 'aria-current="page"' : ''} aria-label="${a.rotulo}">
      ${icone(a.icone)}
      <span class="tab__rotulo">${a.rotulo}</span>
    </a>`;
  }).join('');
}

/* ---------------- montagem ---------------- */
let limparAnterior = null;

function aoDesenhar(rota, params) {
  const raiz = document.getElementById('tela');
  const barra = document.getElementById('tabbar');

  if (typeof limparAnterior === 'function') {
    try { limparAnterior(); } catch { /* limpeza é opcional */ }
    limparAnterior = null;
  }

  desenharAbas(rota);

  /* telas sem aba não devem deixar espaço para a barra */
  raiz.classList.toggle('tela--sem-nav', Boolean(rota.semAba || rota.somenteVisitante));
  document.body.dataset.comAba = String(!barra.hidden);

  if (typeof rota.montar === 'function') {
    const r = rota.montar(raiz, params);
    if (typeof r === 'function') limparAnterior = r;
  }

  ativarRevelacao(raiz);
  hidratarImagens(raiz);

  /* foco previsível para leitores de tela */
  const titulo = raiz.querySelector('h1');
  if (titulo && !titulo.hasAttribute('tabindex')) {
    titulo.setAttribute('tabindex', '-1');
    titulo.focus({ preventScroll: true });
  }
}

/* ---------------- tema ---------------- */
function aplicarTema() {
  const { tema } = preferencias();
  if (tema === 'escuro') document.documentElement.dataset.theme = 'escuro';
  else delete document.documentElement.dataset.theme;
}

/* ---------------- conexão ---------------- */
function ligarConexao() {
  const aviso = () => {
    const existe = document.querySelector('.offline');
    if (navigator.onLine && existe) existe.remove();
    if (!navigator.onLine && !existe) {
      const div = document.createElement('div');
      div.className = 'offline';
      div.setAttribute('role', 'status');
      div.innerHTML = `${icone('wifi-off')}Sem conexão — o que você já viu continua aqui.`;
      document.body.prepend(div);
      toast('Você está sem conexão.', 'aviso');
    }
  };
  window.addEventListener('online', aviso);
  window.addEventListener('offline', aviso);
  aviso();
}

/* ---------------- início ---------------- */
function iniciar() {
  aplicarTema();

  const raiz = document.getElementById('tela');
  if (!raiz) return;

  iniciarRouter({ elemento: raiz, aoDesenhar });
  ligarConexao();

  /* atalho: pular direto ao conteúdo */
  $('.pular')?.addEventListener('click', (e) => {
    e.preventDefault();
    raiz.setAttribute('tabindex', '-1');
    raiz.focus();
  });

  /* sessão expirada em outra aba */
  window.addEventListener('storage', (e) => {
    if (e.key === 'pablomarcal.estado.v1' && !sessao() && caminhoAtual() !== '/entrada') {
      const atual = caminhoAtual();
      if (!['/entrada'].includes(atual)) location.hash = '#/entrada';
    }
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
else iniciar();
