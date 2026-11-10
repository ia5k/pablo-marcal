/* ============================================================
   ESTADO — toda a regra de negócio vive aqui, nenhum componente calcula.
   Persistência: localStorage; memória como plano B quando o navegador nega.
   ============================================================ */

import { LEGIONARIOS, CONVERSAS, EVENTOS } from './dados.js';
import { CONFIG } from './config.js';

const CHAVE = 'legionarios.estado.v1';

const PADRAO = {
  sessao: null,                 // { numero, expiraEm }
  senhas: {},                   // { numero: hash }
  perfis: {},                   // { numero: { nome, telefone, cidade, uf, igreja, area } }
  favoritos: [],
  presencas: [],
  mensagens: {},                // { conversaId: [ { de, autor, texto, em } ] }
  conversasExtras: [],          // contatos com quem o membro começou conversa
  preferencias: { tema: 'claro', movimento: 'padrao', avisos: true },
  tentativas: {},               // { numero: { falhas, bloqueadoAte } }
  criadoEm: null
};

/* ---------------- persistência ---------------- */
let memoria = null;

function ler() {
  if (memoria) return memoria;
  try {
    const bruto = localStorage.getItem(CHAVE);
    memoria = bruto ? { ...PADRAO, ...JSON.parse(bruto) } : { ...PADRAO };
  } catch {
    memoria = { ...PADRAO };
  }
  if (!memoria.criadoEm) {
    memoria.criadoEm = new Date().toISOString();
    gravar();
  }
  return memoria;
}

function gravar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(memoria));
  } catch {
    /* navegador sem storage: segue só em memória, o app não quebra */
  }
  notificar();
}

/* ---------------- observadores ---------------- */
const inscritos = new Set();
export function assinar(fn) {
  inscritos.add(fn);
  return () => inscritos.delete(fn);
}
function notificar() {
  inscritos.forEach((fn) => {
    try { fn(); } catch { /* um observador quebrado não derruba os outros */ }
  });
}

/* ---------------- utilidades ---------------- */
export function normalizarNumero(v) {
  return String(v ?? '').replace(/\D/g, '').replace(/^0+/, '').slice(0, 6);
}
export function normalizarData(v) {
  const d = String(v ?? '').replace(/\D/g, '').slice(0, 8);
  if (d.length !== 8) return '';
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}
export function mascararNumero(v) {
  return normalizarNumero(v);
}
export function mascararData(v) {
  const d = String(v ?? '').replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

/* ---------------- hash da senha ---------------- */
async function digestao(texto) {
  const bytes = new TextEncoder().encode(texto);
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return `s1:${[...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')}`;
  }
  let h = 5381;
  for (const b of bytes) h = ((h * 33) ^ b) >>> 0;
  return `f1:${h.toString(16)}`;
}
const hashDe = (numero, senha) => digestao(`${numero}·${senha}·legionarios`);

/* ---------------- cadastro ---------------- */
export function legionario(numero) {
  const n = normalizarNumero(numero);
  return LEGIONARIOS.find((l) => l.numero === n) ?? null;
}

/** Mescla a semente imutável com o que o membro editou */
export function perfilDe(numero) {
  const base = legionario(numero);
  if (!base) return null;
  return { ...base, ...(ler().perfis[base.numero] ?? {}) };
}

/** 'inexistente' | 'novo' (sem senha ainda) | 'senha' */
export function estadoDoNumero(numero) {
  const n = normalizarNumero(numero);
  if (!legionario(n)) return 'inexistente';
  return ler().senhas[n] ? 'senha' : 'novo';
}

/* ---------------- trava de tentativas ---------------- */
export function esperaRestante(numero) {
  const n = normalizarNumero(numero);
  const t = ler().tentativas[n];
  if (!t?.bloqueadoAte) return 0;
  return Math.max(0, t.bloqueadoAte - Date.now());
}
function registrarFalha(numero) {
  const s = ler();
  const n = normalizarNumero(numero);
  const t = s.tentativas[n] ?? { falhas: 0, bloqueadoAte: 0 };
  t.falhas += 1;
  if (t.falhas >= CONFIG.tentativasMax) {
    const excedente = t.falhas - CONFIG.tentativasMax;
    const espera = Math.min(CONFIG.esperaBaseMs * 2 ** excedente, CONFIG.esperaMaxMs);
    t.bloqueadoAte = Date.now() + espera;
  }
  s.tentativas[n] = t;
  gravar();
  return { falhas: t.falhas, espera: Math.max(0, t.bloqueadoAte - Date.now()) };
}
function limparFalhas(numero) {
  const s = ler();
  delete s.tentativas[normalizarNumero(numero)];
  gravar();
}

/* ---------------- entrada ---------------- */
/**
 * @returns {Promise<{ok:boolean, motivo?:string, espera?:number}>}
 */
export async function entrar({ numero, nascimento, senha }) {
  const n = normalizarNumero(numero);
  const base = legionario(n);
  const espera = esperaRestante(n);
  if (espera > 0) return { ok: false, motivo: 'bloqueado', espera };

  if (!base) return { ok: false, motivo: 'numero' };
  if (String(nascimento) !== base.nascimento.replace(/\//g, '/')) return { ok: false, motivo: 'nascimento' };

  const s = ler();
  const guardada = s.senhas[n];

  if (!guardada) {
    const motivoSenha = validarSenhaNova(senha);
    if (motivoSenha) return { ok: false, motivo: motivoSenha };
    s.senhas[n] = await hashDe(n, senha);
    abrirSessao(n);
    return { ok: true, primeiroAcesso: true };
  }

  const tentativa = await hashDe(n, senha);
  if (tentativa !== guardada) {
    const r = registrarFalha(n);
    return { ok: false, motivo: 'senha', falhas: r.falhas, espera: r.espera };
  }
  limparFalhas(n);
  abrirSessao(n);
  return { ok: true };
}

export function validarSenhaNova(senha) {
  const v = String(senha ?? '');
  if (v.length < 6) return 'senha-curta';
  if (!/[a-zA-Z]/.test(v) || !/\d/.test(v)) return 'senha-fraca';
  return '';
}

function abrirSessao(numero) {
  const s = ler();
  s.sessao = { numero, expiraEm: Date.now() + CONFIG.diasDeSessao * 86_400_000 };
  gravar();
}

export function sair() {
  const s = ler();
  s.sessao = null;
  gravar();
}

export function sessao() {
  const s = ler();
  if (!s.sessao) return null;
  if (s.sessao.expiraEm < Date.now()) {
    s.sessao = null;
    gravar();
    return null;
  }
  return perfilDe(s.sessao.numero);
}

export function renovarSessao() {
  const s = ler();
  if (s.sessao) {
    s.sessao.expiraEm = Date.now() + CONFIG.diasDeSessao * 86_400_000;
    gravar();
  }
}

/* ---------------- primeiro acesso / recuperação ---------------- */
export function codigoDeRecuperacao(numero) {
  const n = normalizarNumero(numero);
  let h = 7;
  for (const c of n) h = (h * 31 + c.charCodeAt(0)) % 1_000_000;
  return String(h).padStart(6, '0');
}

export async function redefinirSenha({ numero, codigo, senha }) {
  const n = normalizarNumero(numero);
  if (!legionario(n)) return { ok: false, motivo: 'numero' };
  if (String(codigo).replace(/\D/g, '') !== codigoDeRecuperacao(n)) return { ok: false, motivo: 'codigo' };
  const motivoSenha = validarSenhaNova(senha);
  if (motivoSenha) return { ok: false, motivo: motivoSenha };
  const s = ler();
  s.senhas[n] = await hashDe(n, senha);
  limparFalhas(n);
  abrirSessao(n);
  return { ok: true };
}

/* ---------------- perfil ---------------- */
export function atualizarPerfil(dados) {
  const s = ler();
  const atual = sessao();
  if (!atual) return { ok: false, motivo: 'sessao' };
  const limpo = {};
  for (const campo of ['nome', 'telefone', 'cidade', 'uf', 'igreja', 'area']) {
    if (typeof dados[campo] === 'string') limpo[campo] = dados[campo].trim().slice(0, 80);
  }
  s.perfis[atual.numero] = { ...(s.perfis[atual.numero] ?? {}), ...limpo };
  gravar();
  return { ok: true };
}

/* ---------------- favoritos ---------------- */
export function ehFavorito(id) {
  return ler().favoritos.includes(id);
}
export function alternarFavorito(id) {
  const s = ler();
  const i = s.favoritos.indexOf(id);
  if (i >= 0) s.favoritos.splice(i, 1);
  else s.favoritos.unshift(id);
  gravar();
  return i < 0;
}
export const favoritos = () => [...ler().favoritos];

/* ---------------- presenças ---------------- */
export function vaiParticipar(eventoId) {
  return ler().presencas.includes(eventoId);
}
export function alternarPresenca(eventoId) {
  const s = ler();
  const i = s.presencas.indexOf(eventoId);
  if (i >= 0) s.presencas.splice(i, 1);
  else s.presencas.unshift(eventoId);
  gravar();
  return i < 0;
}
export const presencas = () => [...ler().presencas];
export const proximosEventos = () =>
  EVENTOS.filter((e) => e.status !== 'Encerrado').sort((a, b) => a.data.localeCompare(b.data));

/* ---------------- conversas ---------------- */
function conversasTodas() {
  const s = ler();
  return [...CONVERSAS, ...(s.conversasExtras ?? [])];
}

function conversaBase(id) {
  return conversasTodas().find((c) => c.id === id) ?? null;
}

export function criarConversa(numero) {
  const n = normalizarNumero(numero);
  const l = legionario(n);
  if (!l) return null;
  const existente = conversasTodas().find((c) => c.contato === n);
  if (existente) return existente.id;
  const s = ler();
  const id = `x${n}`;
  s.conversasExtras.push({ id, contato: n, nome: l.nome, tipo: 'pessoa', pais: l.pais, mensagens: [] });
  gravar();
  return id;
}

export function listaDeConversas() {
  const s = ler();
  return conversasTodas().map((c) => {
    const extras = s.mensagens[c.id] ?? [];
    const todas = [...c.mensagens, ...extras];
    const ultima = todas[todas.length - 1];
    return { ...c, mensagens: todas, ultima, total: todas.length };
  }).sort((a, b) => (b.ultima?.em ?? '').localeCompare(a.ultima?.em ?? ''));
}

export function mensagensDe(id) {
  const base = conversaBase(id);
  if (!base) return [];
  return [...base.mensagens, ...(ler().mensagens[id] ?? [])];
}

export function enviarMensagem(conversaId, texto) {
  const limpo = String(texto ?? '').trim().slice(0, 600);
  if (!limpo) return { ok: false, motivo: 'vazio' };
  if (!conversaBase(conversaId)) return { ok: false, motivo: 'conversa' };
  const s = ler();
  const agora = new Date().toISOString();
  (s.mensagens[conversaId] ??= []).push({ de: 'eu', autor: 'Você', texto: limpo, em: agora });
  gravar();

  /* resposta simulada: não há servidor nesta versão (dívida declarada) */
  const respostas = {
    grupo: 'Recebido. Vamos levar para o grupo e te respondemos por aqui.',
    pessoa: 'Show, obrigado por avisar. Falamos mais no encontro.'
  };
  const base = conversaBase(conversaId);
  setTimeout(() => {
    const st = ler();
    (st.mensagens[conversaId] ??= []).push({
      de: 'outro',
      autor: base.nome,
      texto: respostas[base.tipo] ?? respostas.pessoa,
      em: new Date().toISOString()
    });
    gravar();
  }, 1400);

  return { ok: true, em: agora };
}

export function conversaInfo(id) {
  return conversaBase(id);
}

export function buscarPessoas(termo) {
  const t = String(termo ?? '').trim().toLowerCase();
  const jaTem = new Set(conversasTodas().map((c) => c.contato));
  return LEGIONARIOS.filter((l) => !jaTem.has(l.numero))
    .filter((l) => !t || l.nome.toLowerCase().includes(t) || l.numero.includes(t.replace(/\D/g, '')))
    .slice(0, 8);
}

/* ---------------- preferências ---------------- */
export function preferencias() {
  return { ...ler().preferencias };
}
export function definirPreferencia(chave, valor) {
  const s = ler();
  s.preferencias = { ...s.preferencias, [chave]: valor };
  gravar();
}

/* ---------------- números do perfil ---------------- */
export function resumoDoMembro(numero) {
  const p = perfilDe(numero);
  if (!p) return null;
  const desde = new Date(`${p.entrada}T12:00:00`);
  const meses = Math.max(1, Math.round((Date.now() - desde.getTime()) / 2_629_800_000));
  return {
    eventos: presencas().length,
    favoritos: favoritos().length,
    anos: Math.max(1, Math.floor(meses / 12)),
    desde: desde.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  };
}

/* ---------------- apagar tudo (usado em Ajustes) ---------------- */
export function apagarTudo() {
  memoria = { ...PADRAO, criadoEm: new Date().toISOString() };
  try { localStorage.removeItem(CHAVE); } catch { /* sem storage */ }
  gravar();
}
