import { icone } from './icons.js';

/* ---------------- segurança: nada de usuário entra no DOM cru ---------------- */
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export function escapar(v) {
  return String(v ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/* ---------------- DOM ---------------- */
export const $ = (sel, raiz = document) => raiz.querySelector(sel);
export const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

/* ---------------- toast ---------------- */
let pilhaToast = [];
export function toast(mensagem, tipo = 'ok') {
  const raiz = document.getElementById('toast-root');
  if (!raiz) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.innerHTML = `${icone(tipo === 'erro' ? 'x' : tipo === 'aviso' ? 'bell' : 'check')}<span>${escapar(mensagem)}</span>`;
  raiz.append(el);
  pilhaToast.push(el);
  if (pilhaToast.length > 2) pilhaToast.shift()?.remove();
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    el.style.transition = 'opacity 220ms, transform 220ms';
    setTimeout(() => el.remove(), 240);
  }, 3200);
}

/* ---------------- folha inferior ---------------- */
export function abrirSheet({ titulo, corpo, pe = '' }) {
  fecharSheet();
  const overlay = document.createElement('div');
  overlay.className = 'sheet-overlay';
  overlay.dataset.aberto = 'false';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.dataset.aberto = 'false';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-label', titulo);
  sheet.innerHTML = `
    <div class="sheet__alca" aria-hidden="true"></div>
    <div class="sheet__topo">
      <h2 class="h2">${escapar(titulo)}</h2>
      <button class="btn btn--icon btn--ghost" data-fechar aria-label="Fechar">${icone('x')}</button>
    </div>
    <div class="sheet__corpo">${corpo}</div>
    ${pe ? `<div class="sheet__pe">${pe}</div>` : ''}`;
  document.getElementById('sheet-root').append(overlay, sheet);
  requestAnimationFrame(() => {
    overlay.dataset.aberto = 'true';
    sheet.dataset.aberto = 'true';
  });
  const fechar = () => fecharSheet();
  overlay.addEventListener('click', fechar);
  sheet.querySelector('[data-fechar]')?.addEventListener('click', fechar);
  document.addEventListener('keydown', aoEsc);
  function aoEsc(e) { if (e.key === 'Escape') { fechar(); document.removeEventListener('keydown', aoEsc); } }
  setTimeout(() => sheet.querySelector('button, a, input')?.focus(), 320);
  return sheet;
}
export function fecharSheet() {
  document.querySelectorAll('.sheet, .sheet-overlay').forEach((n) => {
    n.dataset.aberto = 'false';
    setTimeout(() => n.remove(), 340);
  });
}

/* ---------------- revelação em cascata ---------------- */
let observador;
export function ativarRevelacao(raiz = document) {
  observador?.disconnect();
  const alvos = $$('.revelar', raiz);
  if (!alvos.length) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.removeAttribute('data-revelar');
    alvos.forEach((el) => (el.dataset.visivel = 'true'));
    return;
  }
  document.documentElement.dataset.revelar = 'on';
  observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.dataset.visivel = 'true';
        observador.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  alvos.forEach((el, i) => {
    el.style.setProperty('--ordem', Math.min(i % 8, 7));
    observador.observe(el);
  });
}

/* ---------------- imagens: revela quando carrega ---------------- */
export function hidratarImagens(raiz = document) {
  $$('img', raiz).forEach((img) => {
    if (img.complete) img.dataset.pronta = 'true';
    else img.addEventListener('load', () => (img.dataset.pronta = 'true'), { once: true });
    img.addEventListener('error', () => (img.dataset.pronta = 'true'), { once: true });
  });
}

/* ---------------- arte gerada: nunca um quadrado cinza quebrado ---------------- */
const PALETAS = [
  ['#2A1408', '#8A3B12', '#FF7A33'],
  ['#0C1A2E', '#12507A', '#3AA6FF'],
  ['#1B0B22', '#5A1C74', '#C24BFF'],
  ['#0B1F16', '#14503A', '#31D68A'],
  ['#241005', '#6B2A0C', '#FFB020'],
  ['#1A1218', '#4A2438', '#FF5C8A']
];
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
export function arte(chave, { forma = 'circulo', paleta } = {}) {
  const h = hash(String(chave));
  const p = PALETAS[Number.isInteger(paleta) ? paleta % PALETAS.length : h % PALETAS.length];
  const ang = h % 360;
  const cx = 30 + (h % 40);
  const cy = 30 + ((h >> 3) % 40);
  const formaSvg = forma === 'circulo'
    ? `<circle cx="${cx}%" cy="${cy}%" r="42%" fill="url(#g2)" opacity=".85"/>`
    : `<rect x="${cx - 20}%" y="${cy - 20}%" width="60%" height="60%" rx="18%" fill="url(#g2)" opacity=".8" transform="rotate(${ang % 45} 50 50)"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="g1" gradientTransform="rotate(${ang})"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient>
<radialGradient id="g2"><stop offset="0" stop-color="${p[2]}" stop-opacity=".9"/><stop offset="1" stop-color="${p[2]}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="100" height="100" fill="url(#g1)"/>
${formaSvg}
<rect width="100" height="100" fill="url(#g2)" opacity=".25"/>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* ---------------- data legível ---------------- */
export function dataCurta(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
}
export function horaCurta(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
export function haQuanto(iso) {
  const dif = Date.now() - new Date(iso).getTime();
  const min = Math.round(dif / 60000);
  if (min < 1) return 'agora';
  if (min < 60) return `${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h`;
  return `${Math.round(h / 24)} d`;
}

/* ---------------- estado vazio ---------------- */
export function vazio({ icone: ic = 'sparkle', titulo, texto, acao = '' }) {
  return `<div class="vazio revelar">
    ${icone(ic, 'vazio__i')}
    <p class="vazio__titulo">${escapar(titulo)}</p>
    <p class="vazio__txt">${escapar(texto)}</p>
    ${acao}
  </div>`;
}

/* ---------------- esqueleto ---------------- */
export function esqueleto(linhas = 3) {
  return `<div class="wrap stack" aria-busy="true" aria-label="Carregando">
    <div class="esq esq--capa"></div>
    ${Array.from({ length: linhas }, () => '<div class="esq esq--linha"></div>').join('')}
  </div>`;
}
