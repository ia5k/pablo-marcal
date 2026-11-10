/* ============================================================
   TELA — Sobre
   ============================================================ */

import { escapar, $, $$, arte } from '../ui.js';
import { icone } from '../icons.js';
import { FAQ } from '../dados.js';
import { topoVoltar } from '../componentes/pedacos.js';

export const titulo = 'Sobre';
export const aba = 'inicio';

const PILARES = [
  { i: 'heart', t: 'Amor', d: 'O que fazemos começa em quem está ao lado. Nada aqui é sobre posição.' },
  { i: 'flag', t: 'Honra', d: 'Honrar é reconhecer o valor de quem veio antes — e não esquecer o número de ninguém.' },
  { i: 'users', t: 'Unidade', d: 'Igrejas diferentes, uma só comunidade. O app existe para juntar, não para separar.' }
];

export function render() {
  return `
  ${topoVoltar('Sobre', { voltar: '#/inicio' })}

  <section class="wrap stack-lg revelar">
    <div class="detalhe__capa" style="margin-inline:0;aspect-ratio:16/11">
      <img src="${arte('sobre-manifesto')}" alt="" width="720" height="495" decoding="async">
    </div>
    <div>
      <p class="kicker">Manifesto</p>
      <h2 class="detalhe__titulo" style="margin-top:var(--sp-1)">Ninguém caminha<br>sozinho.</h2>
      <p class="detalhe__txt">Legionários é uma comunidade que se reconhece pelo número, pela conduta e pelo serviço. O app é a casa dela: os encontros, as igrejas, o comércio dos irmãos e a conversa de todos os dias.</p>
    </div>
  </section>

  <section class="secao revelar">
    <div class="linha-titulo"><h2 class="secao__titulo">No que acreditamos</h2></div>
    <div class="wrap stack">
      ${PILARES.map((p) => `<div class="card revelar">
        <div class="pil" style="display:flex;gap:var(--sp-3);align-items:flex-start">
          <span class="em-breve__selo" style="width:44px;height:44px;flex:none">${icone(p.i)}</span>
          <div>
            <h3 class="h3">${escapar(p.t)}</h3>
            <p class="sm soft" style="margin-top:var(--sp-1)">${escapar(p.d)}</p>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </section>

  <section class="secao revelar">
    <div class="linha-titulo"><h2 class="secao__titulo">Perguntas frequentes</h2></div>
    <div class="wrap">
      <div class="acordeao">
        ${FAQ.map((f) => `<div class="acordeao__item">
          <button class="acordeao__botao" data-faq="${escapar(f.id)}" aria-expanded="false" aria-controls="p-${escapar(f.id)}">
            <span>${escapar(f.pergunta)}</span>
            ${icone('plus', 'acordeao__sinal')}
          </button>
          <div class="acordeao__painel" id="p-${escapar(f.id)}" data-aberto="false">
            <div class="acordeao__dentro"><p class="acordeao__texto sm">${escapar(f.resposta)}</p></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="secao revelar">
    <div class="wrap">
      <div class="card stack">
        <p class="kicker">Contato</p>
        <p class="sm soft">Falar com a liderança é sempre pelo canal oficial. Estamos na aba de conversas.</p>
        <a class="btn btn--block" href="#/chats">${icone('message')}Abrir conversas</a>
      </div>
    </div>
  </section>`;
}

export function montar(raiz) {
  $$('[data-faq]', raiz).forEach((botao) => {
    botao.addEventListener('click', () => {
      const aberto = botao.getAttribute('aria-expanded') === 'true';
      $$('[data-faq]', raiz).forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        const p = document.getElementById(b.getAttribute('aria-controls'));
        if (p) p.dataset.aberto = 'false';
      });
      if (!aberto) {
        botao.setAttribute('aria-expanded', 'true');
        const painel = document.getElementById(botao.getAttribute('aria-controls'));
        if (painel) painel.dataset.aberto = 'true';
      }
    });
  });
}
