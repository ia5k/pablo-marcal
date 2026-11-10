/* ============================================================
   ROTEADOR — rotas por hash, guarda de rota privada, transição de vista
   ============================================================ */

import { sessao } from './estado.js';

const rotas = [];
let raiz = null;
let aoTrocar = () => {};
let primeira = true;

/** @param {string} padrao ex.: '/evento/:id' */
export function registrar(padrao, opcoes) {
  const chaves = [];
  const regex = new RegExp(
    '^' + padrao.replace(/:([a-zA-Z]+)/g, (_, k) => { chaves.push(k); return '([^/]+)'; }) + '$'
  );
  rotas.push({ padrao, regex, chaves, ...opcoes });
}

export function caminhoAtual() {
  const bruto = location.hash.replace(/^#/, '');
  return bruto || '/inicio';
}

export function ir(rota, { substituir = false } = {}) {
  const alvo = rota.startsWith('#') ? rota.slice(1) : rota;
  const hash = `#${alvo}`;
  if (location.hash === hash) return;
  if (substituir) history.replaceState(null, '', hash);
  else location.hash = hash;
  if (substituir) renderizar();
}

function casar(caminho) {
  return rotas.find((r) => r.regex.test(caminho)) ?? null;
}

function renderizar() {
  const caminho = caminhoAtual();
  const rota = casar(caminho);

  if (!rota) {
    ir('/inicio', { substituir: true });
    return;
  }

  if (!rota.publica && !sessao()) {
    ir('/entrada', { substituir: true });
    return;
  }
  if (rota.somenteVisitante && sessao()) {
    ir('/inicio', { substituir: true });
    return;
  }

  const params = {};
  const valores = caminho.match(rota.regex).slice(1);
  rota.chaves.forEach((k, i) => { params[k] = decodeURIComponent(valores[i]); });

  const desenhar = () => {
    const html = rota.render(params);
    raiz.innerHTML = html;
    raiz.dataset.rota = rota.padrao;
    document.body.dataset.tela = rota.padrao;
    document.title = rota.titulo ? `${rota.titulo} · Pablo Marçal` : 'Pablo Marçal';

    if (!rota.semRolagem || !primeira) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    primeira = false;
    aoTrocar(rota, params);
    document.dispatchEvent(new CustomEvent('rota:desenhada', { detail: { rota, params } }));
  };

  const animado = document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (animado) {
    try {
      const transicao = document.startViewTransition(desenhar);
      // uma navegação que atropela a anterior aborta a transição; a promessa
      // rejeita e, sem tratamento, vira erro não capturado. O desenho em si já
      // aconteceu — não há o que recuperar.
      transicao.ready.catch(() => {});
      transicao.finished.catch(() => {});
    } catch {
      desenhar(); // navegador sem suporte real: desenha direto
    }
  } else desenhar();
}

/** Redesenha a rota atual sem tocar no histórico */
export function recarregar() {
  renderizar();
}

export function iniciarRouter({ elemento, aoDesenhar }) {  raiz = elemento;
  aoTrocar = aoDesenhar ?? (() => {});
  window.addEventListener('hashchange', renderizar);
  if (!location.hash) history.replaceState(null, '', '#/inicio');
  renderizar();
}
