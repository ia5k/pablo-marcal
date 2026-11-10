/* ============================================================
   TELA — Perfil
   ============================================================ */

import { escapar, $, $$, toast, vazio, arte } from '../ui.js';
import { icone } from '../icons.js';
import {
  sessao, sair, atualizarPerfil, resumoDoMembro, favoritos, presencas,
  preferencias, definirPreferencia, normalizarNumero, mascararData
} from '../estado.js';
import { PRODUTOS, EVENTOS } from '../dados.js';
import { avatarDe, cartaoProduto, cartaoEvento, dinheiro } from '../componentes/pedacos.js';
import { ir, recarregar } from '../router.js';
import { abrirSheet, fecharSheet } from '../ui.js';

export const titulo = 'Perfil';
export const aba = 'perfil';

export function render() {
  const eu = sessao();
  const r = resumoDoMembro(eu.numero);
  const prefs = preferencias();

  return `
  <header class="perfil__topo revelar">
    ${avatarDe(eu.nome, 'avatar--xl avatar--ring')}
    <h1 class="perfil__nome">${escapar(eu.nome)}</h1>
    <p class="perfil__numero">MEMBRO #${escapar(eu.numero)}</p>
    <p class="xs muted">${escapar(eu.cidade)}, ${escapar(eu.uf)} · desde ${escapar(r.desde)}</p>
  </header>

  <div class="perfil__numeros revelar">
    <div class="perfil__stat"><b>${r.anos}</b><span>${r.anos > 1 ? 'anos' : 'ano'} de casa</span></div>
    <div class="perfil__stat"><b>${r.eventos}</b><span>encontros</span></div>
    <div class="perfil__stat"><b>${r.favoritos}</b><span>favoritos</span></div>
  </div>

  <section class="secao revelar">
    <div class="wrap stack">
      <div class="card stack">
        <p class="kicker">Meus dados</p>
        <div class="lista__meta" style="margin-top:0">
          <span>${icone('user')}${escapar(eu.nome)}</span>
          <span>${icone('pin')}${escapar(eu.cidade)} — ${escapar(eu.uf)}</span>
          <span>${icone('shield')}${escapar(eu.igreja)}</span>
        </div>
        <p class="xs muted">${escapar(eu.area)} · nascimento ${escapar(eu.nascimento)}</p>
        <button class="btn btn--sm" id="btn-editar">${icone('plus')}Editar meus dados</button>
      </div>
    </div>
  </section>

  <section class="secao revelar">
    <div class="wrap">
      <div class="lista">
        <button class="lista__item" id="btn-favoritos">
          <span class="atalho__i" style="width:36px;height:36px">${icone('heart')}</span>
          <span class="lista__corpo"><span class="lista__titulo">Favoritos</span><span class="lista__sub">${r.favoritos} ${r.favoritos === 1 ? 'item salvo' : 'itens salvos'}</span></span>
          ${icone('chev-right', 'lista__chev')}
        </button>
        <button class="lista__item" id="btn-encontros">
          <span class="atalho__i" style="width:36px;height:36px">${icone('calendar')}</span>
          <span class="lista__corpo"><span class="lista__titulo">Meus encontros</span><span class="lista__sub">${r.eventos} confirmados</span></span>
          ${icone('chev-right', 'lista__chev')}
        </button>
        <a class="lista__item" href="#/sobre">
          <span class="atalho__i" style="width:36px;height:36px">${icone('flag')}</span>
          <span class="lista__corpo"><span class="lista__titulo">Sobre a comunidade</span><span class="lista__sub">Manifesto e perguntas frequentes</span></span>
          ${icone('chev-right', 'lista__chev')}
        </a>
        <button class="lista__item" id="btn-tema">
          <span class="atalho__i" style="width:36px;height:36px">${icone('sparkle')}</span>
          <span class="lista__corpo"><span class="lista__titulo">Aparência</span><span class="lista__sub">${prefs.tema === 'escuro' ? 'Tema escuro' : 'Tema claro'}</span></span>
          ${icone('chev-right', 'lista__chev')}
        </button>
      </div>
    </div>
  </section>

  <section class="secao revelar">
    <div class="wrap stack">
      <button class="btn btn--danger btn--block" id="btn-sair">${icone('logout')}Sair da conta</button>
      <p class="xs muted" style="text-align:center">Pablo Marçal · versão 1.0</p>
    </div>
  </section>`;
}

export function montar(raiz) {
  const eu = sessao();

  $('#btn-editar', raiz).addEventListener('click', () => {
    const sheet = abrirSheet({
      titulo: 'Meus dados',
      corpo: `<div class="stack">
        <label class="campo"><span class="campo__rot">Nome</span>
          <input class="campo__ctrl" id="e-nome" value="${escapar(eu.nome)}" maxlength="80"></label>
        <label class="campo"><span class="campo__rot">Telefone</span>
          <input class="campo__ctrl" id="e-tel" inputmode="tel" value="${escapar(eu.telefone)}" maxlength="16"></label>
        <label class="campo"><span class="campo__rot">Cidade</span>
          <input class="campo__ctrl" id="e-cidade" value="${escapar(eu.cidade)}" maxlength="60"></label>
        <label class="campo"><span class="campo__rot">Igreja</span>
          <input class="campo__ctrl" id="e-igreja" value="${escapar(eu.igreja)}" maxlength="60"></label>
        <label class="campo"><span class="campo__rot">Área de atuação</span>
          <input class="campo__ctrl" id="e-area" value="${escapar(eu.area)}" maxlength="60"></label>
        <p class="campo__erro" id="e-erro" hidden></p>
      </div>`,
      pe: `<button class="btn btn--primary btn--block" id="e-salvar">Salvar</button>`
    });

    $('#e-salvar', sheet).addEventListener('click', () => {
      const nome = $('#e-nome', sheet).value.trim();
      if (nome.length < 3) {
        const err = $('#e-erro', sheet);
        err.textContent = 'O nome precisa de pelo menos 3 letras.';
        err.hidden = false;
        return;
      }
      atualizarPerfil({
        nome,
        telefone: normalizarNumero($('#e-tel', sheet).value),
        cidade: $('#e-cidade', sheet).value,
        igreja: $('#e-igreja', sheet).value,
        area: $('#e-area', sheet).value
      });
      fecharSheet();
      toast('Dados atualizados.', 'ok');
      recarregar();
    });
  });

  $('#btn-favoritos', raiz).addEventListener('click', () => {
    const ids = favoritos();
    const itens = PRODUTOS.filter((p) => ids.includes(p.id));
    abrirSheet({
      titulo: 'Favoritos',
      corpo: itens.length
        ? `<div class="grade-produtos">${itens.map((p) => cartaoProduto(p, { fav: true })).join('')}</div>`
        : vazio({ icone: 'heart', titulo: 'Nada salvo ainda', texto: 'Toque no coração de um produto para guardar aqui.' })
    });
  });

  $('#btn-encontros', raiz).addEventListener('click', () => {
    const ids = presencas();
    const itens = EVENTOS.filter((e) => ids.includes(e.id));
    abrirSheet({
      titulo: 'Meus encontros',
      corpo: itens.length
        ? `<div class="stack">${itens.map((e) => cartaoEvento(e, { vai: true })).join('')}</div>`
        : vazio({ icone: 'calendar', titulo: 'Nenhuma presença confirmada', texto: 'Abra um encontro e toque em "Vou participar".' })
    });
  });

  $('#btn-tema', raiz).addEventListener('click', () => {
    const atual = preferencias().tema;
    const novo = atual === 'escuro' ? 'claro' : 'escuro';
    definirPreferencia('tema', novo);
    document.documentElement.dataset.theme = novo;
    toast(novo === 'escuro' ? 'Tema escuro ativado.' : 'Tema claro ativado.', 'ok');
    recarregar();
  });

  $('#btn-sair', raiz).addEventListener('click', () => {
    const sheet = abrirSheet({
      titulo: 'Sair da conta',
      corpo: `<p class="soft">Você continua cadastrado. Ao entrar de novo, basta seu número e sua senha.</p>`,
      pe: `<div class="stack">
        <button class="btn btn--danger btn--block" id="sair-mesmo">Sair agora</button>
        <button class="btn btn--ghost btn--block" data-fechar-sheet>Ficar</button>
      </div>`
    });
    $('#sair-mesmo', sheet).addEventListener('click', () => {
      fecharSheet();
      sair();
      ir('/entrada', { substituir: true });
    });
    $('[data-fechar-sheet]', sheet).addEventListener('click', fecharSheet);
  });
}
