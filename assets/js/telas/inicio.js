/* ============================================================
   TELA — Início
   ============================================================ */

import { escapar, $ } from '../ui.js';
import { icone } from '../icons.js';
import { sessao, proximosEventos, vaiParticipar, presencas } from '../estado.js';
import { ATALHOS, MENSAGEM_DESTAQUE } from '../dados.js';
import { CONFIG } from '../config.js';
import { avatarDe, cartaoEvento, contagemHTML, ligarContagens, linhaTitulo } from '../componentes/pedacos.js';
import { abrirSheet } from '../ui.js';

export const titulo = 'Início';
export const aba = 'inicio';

function saudacao() {
  const h = new Date().getHours();
  if (h < 6) return 'Boa madrugada';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function render() {
  const eu = sessao();
  const primeiro = eu.nome.split(' ')[0];
  const eventos = proximosEventos();
  const proximo = eventos[0];
  const vai = proximo ? vaiParticipar(proximo.id) : false;

  return `
  <header class="cabecalho revelar">
    <div class="cabecalho__id">
      <a href="#/perfil" aria-label="Abrir meu perfil">${avatarDe(eu.nome, 'avatar--lg')}</a>
      <div class="cabecalho__txt">
        <p class="cabecalho__ola">${escapar(saudacao())}</p>
        <h1 class="cabecalho__nome">${escapar(primeiro)}</h1>
        <p class="cabecalho__meta">#${escapar(eu.numero)} · ${escapar(eu.cidade)}, ${escapar(eu.uf)}</p>
      </div>
    </div>
    <div class="cabecalho__acoes">
      <a class="btn btn--icon btn--ghost" href="#/chats" aria-label="Conversas">${icone('message')}</a>
    </div>
  </header>

  <section class="wrap revelar" aria-label="Mensagem da semana">
    <button class="destaque" data-video="inicio" aria-label="Assistir ${escapar(MENSAGEM_DESTAQUE.titulo)}">
      <span class="destaque__luz" aria-hidden="true"></span>
      <span class="destaque__topo">
        <span class="destaque__kicker">${escapar(MENSAGEM_DESTAQUE.kicker)}</span>
        <span class="destaque__selo">Mensagem da semana</span>
      </span>
      <span class="destaque__play">${icone('play')}</span>
      <span class="destaque__rodape">
        <span class="destaque__titulo">${escapar(MENSAGEM_DESTAQUE.titulo)}</span>
      </span>
    </button>
  </section>

  ${proximo ? `
  <section class="wrap secao revelar">
    <div class="banner">
      <p class="banner__kicker">Próximo encontro · ${escapar(proximo.local)}</p>
      <h2 class="banner__titulo">${escapar(proximo.titulo)}</h2>
      ${contagemHTML(proximo.data)}
      <a class="btn btn--primary" href="#/evento/${escapar(proximo.id)}">
        ${vai ? `${icone('check')}Você vai` : 'Ver o encontro'}
      </a>
    </div>
  </section>` : ''}

  <section class="secao revelar" aria-label="Atalhos">
    ${linhaTitulo('Atalhos')}
    <div class="atalhos">
      ${ATALHOS.map((a, i) => `<a class="atalho" href="${escapar(a.rota)}" style="--ordem:${i}">
        <span class="atalho__i">${icone(a.icone)}</span>
        <span class="sm">${escapar(a.rotulo)}</span>
      </a>`).join('')}
    </div>
  </section>

  <section class="secao revelar" aria-label="Encontros">
    ${linhaTitulo('Encontros')}
    <div class="wrap stack">
      ${eventos.slice(0, 3).map((e) => cartaoEvento(e, { vai: vaiParticipar(e.id) })).join('')}
    </div>
  </section>

  <section class="secao revelar" aria-label="Resumo do membro">
    <div class="wrap">
      <div class="card stack">
        <p class="kicker">Seu caminho</p>
        <p class="sm soft">${presencas().length
          ? `Você já confirmou presença em ${presencas().length} encontro${presencas().length > 1 ? 's' : ''}.`
          : 'Você ainda não confirmou presença em nenhum encontro.'}</p>
        <a class="secao__link" href="#/perfil">Ver meu perfil${icone('chev-right')}</a>
      </div>
    </div>
  </section>`;
}

export function montar(raiz) {
  const parar = ligarContagens(raiz);

  $('[data-video="inicio"]', raiz)?.addEventListener('click', () => {
    const temVideo = Boolean(CONFIG.videoDoInicio);
    abrirSheet({
      titulo: MENSAGEM_DESTAQUE.titulo,
      corpo: temVideo
        ? `<div class="player"><iframe src="${escapar(CONFIG.videoDoInicio)}" title="${escapar(MENSAGEM_DESTAQUE.titulo)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
           <p class="sm muted" style="margin-top:var(--sp-3)">Vídeo oficial da comunidade.</p>`
        : `<div class="vazio">
             ${icone('play', 'vazio__i')}
             <p class="vazio__titulo">Mensagem em preparação</p>
             <p class="vazio__txt">O vídeo desta semana ainda não foi publicado. Assim que sair, ele aparece exatamente aqui.</p>
           </div>`
    });
  });

  return parar;
}
