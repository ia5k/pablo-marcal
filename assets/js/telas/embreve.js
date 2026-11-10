/* ============================================================
   TELA — Em breve
   ============================================================ */

import { escapar, $, vazio } from '../ui.js';
import { icone } from '../icons.js';
import { ATALHOS, PROMESSAS } from '../dados.js';
import { topoVoltar } from '../componentes/pedacos.js';

export const titulo = 'Em breve';
export const semAba = true;

export function render({ chave }) {
  const atalho = ATALHOS.find((a) => a.id === chave);
  if (!atalho) {
    return `${topoVoltar('Em breve', { voltar: '#/inicio' })}
      ${vazio({ icone: 'sparkle', titulo: 'Ainda não existe', texto: 'Essa área não faz parte desta versão.', acao: '<a class="btn" href="#/inicio">Voltar ao início</a>' })}`;
  }
  return `
  ${topoVoltar(atalho.rotulo, { voltar: '#/inicio' })}
  <div class="em-breve revelar">
    <span class="em-breve__selo">${icone(atalho.icone)}</span>
    <h1 class="em-breve__titulo">${escapar(atalho.rotulo)} está a caminho</h1>
    <p class="em-breve__txt">${escapar(PROMESSAS[chave] ?? 'Esta área será liberada numa próxima versão.')}</p>
    <a class="btn btn--ghost" href="#/inicio">Voltar ao início</a>
  </div>`;
}
