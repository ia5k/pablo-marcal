/* ============================================================
   TELA — Conversa
   ============================================================ */

import { escapar, $, horaCurta, vazio } from '../ui.js';
import { icone } from '../icons.js';
import { mensagensDe, conversaInfo, enviarMensagem, assinar } from '../estado.js';
import { avatarDe } from '../componentes/pedacos.js';

export const titulo = 'Conversa';
export const semAba = true;

function baloesHTML(id) {
  const msgs = mensagensDe(id);
  if (!msgs.length) {
    return vazio({ icone: 'message', titulo: 'Diga olá', texto: 'Esta conversa ainda está começando. Escreva a primeira mensagem.' });
  }
  return msgs.map((m) => `<div class="balao balao--${m.de === 'eu' ? 'meus' : 'deles'}">
    ${m.de === 'outro' && conversaInfo(id)?.tipo === 'grupo' ? `<span class="xs" style="display:block;opacity:.75;margin-bottom:2px">${escapar(m.autor)}</span>` : ''}
    ${escapar(m.texto)}
    <span class="balao__hora">${escapar(horaCurta(m.em))}</span>
  </div>`).join('');
}

export function render({ id }) {
  const c = conversaInfo(id);
  if (!c) {
    return `<div class="tela tela--sem-nav">${vazio({ icone: 'message', titulo: 'Conversa não encontrada', texto: 'Ela pode ter saído da sua lista.', acao: '<a class="btn" href="#/chats">Voltar para conversas</a>' })}</div>`;
  }
  return `<div class="tela--conversa">
    <div class="topo">
      <a class="btn btn--icon btn--ghost" href="#/chats" aria-label="Voltar">${icone('chev-left')}</a>
      ${avatarDe(c.nome, 'avatar--sm')}
      <div style="flex:1;min-width:0">
        <h1 class="h3" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapar(c.nome)}</h1>
        <p class="xs muted">${c.tipo === 'grupo' ? `${escapar(c.pais)} · grupo` : `#${escapar(c.contato)}`}</p>
      </div>
      <button class="btn btn--icon btn--ghost" id="conversa-info" aria-label="Informações da conversa">${icone('more')}</button>
    </div>

    <div class="conversa" id="conversa-mensagens" aria-live="polite">${baloesHTML(id)}</div>
  </div>
  <form class="composer" id="form-conversa">
    <input class="campo__ctrl" id="campo-msg" placeholder="Escreva uma mensagem" aria-label="Mensagem" autocomplete="off" maxlength="600">
    <button class="composer__enviar" type="submit" aria-label="Enviar">${icone('send')}</button>
  </form>`;
}

export function montar(raiz, { id }) {
  const c = conversaInfo(id);
  if (!c) return;

  const area = $('#conversa-mensagens', raiz);
  const campo = $('#campo-msg', raiz);

  const rolar = () => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); };
  rolar();

  $('#form-conversa', raiz).addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = campo.value.trim();
    if (!texto) return;
    const r = enviarMensagem(id, texto);
    if (!r.ok) return;
    campo.value = '';
    area.innerHTML = baloesHTML(id);
    rolar();
  });

  $('#conversa-info', raiz).addEventListener('click', async () => {
    const { abrirSheet } = await import('../ui.js');
    abrirSheet({
      titulo: 'Detalhes',
      corpo: `<div class="stack">
        <p class="sm muted">${c.tipo === 'grupo' ? 'Grupo oficial por país e tempo de casa.' : 'Legionário cadastrado na comunidade.'}</p>
        <div class="lista">
          <div class="lista__item"><span class="lista__corpo"><span class="lista__titulo">${escapar(c.nome)}</span><span class="lista__sub">#${escapar(c.contato)}</span></span></div>
          <div class="lista__item"><span class="lista__corpo"><span class="lista__titulo">${escapar(c.pais)}</span><span class="lista__sub">País</span></span></div>
        </div>
      </div>`
    });
  });

  /* nova mensagem simulada chegando: atualiza os balões */
  return assinar(() => {
    if (!document.body.contains(area)) return;
    const atual = area.innerHTML;
    const novo = baloesHTML(id);
    if (atual !== novo) {
      area.innerHTML = novo;
      rolar();
    }
  });
}
