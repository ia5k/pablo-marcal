/* ============================================================
   TELA — Encontro (evento)
   ============================================================ */

import { escapar, $, arte, dataCurta, toast, vazio } from '../ui.js';
import { icone } from '../icons.js';
import { EVENTOS } from '../dados.js';
import { vaiParticipar, alternarPresenca, sessao } from '../estado.js';
import { contagemHTML, ligarContagens, topoVoltar } from '../componentes/pedacos.js';

export const titulo = 'Encontro';
export const semAba = true;

function icsDe(e) {
  const inicio = e.data.replace(/-/g, '') + 'T' + e.hora.replace(':', '') + '00';
  const [h, m] = e.hora.split(':').map(Number);
  const fimH = String((h + 2) % 24).padStart(2, '0');
  const fim = e.data.replace(/-/g, '') + 'T' + fimH + String(m).padStart(2, '0') + '00';
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Pablo Marcal//PT-BR', 'BEGIN:VEVENT',
    `UID:${e.id}@legionarios`, `DTSTART:${inicio}`, `DTEND:${fim}`,
    `SUMMARY:${e.titulo}`, `LOCATION:${e.local}`, `DESCRIPTION:${e.descricao.replace(/\n/g, ' ')}`,
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}

export function render({ id }) {
  const e = EVENTOS.find((x) => x.id === id);
  if (!e) {
    return `${topoVoltar('Encontro', { voltar: '#/inicio' })}
      ${vazio({ icone: 'calendar', titulo: 'Encontro não encontrado', texto: 'Ele pode ter sido encerrado. Veja os próximos na tela inicial.', acao: '<a class="btn" href="#/inicio">Voltar ao início</a>' })}`;
  }
  const vai = vaiParticipar(e.id);
  const encerrado = e.status === 'Encerrado';

  return `
  ${topoVoltar(e.titulo, { voltar: '#/inicio' })}

  <section class="wrap revelar" style="margin-bottom:var(--sp-4)">
    <div class="detalhe__capa" style="margin-inline:0">
      <img src="${arte(e.id)}" alt="" width="720" height="540" decoding="async">
      <span class="badge ${encerrado ? 'badge--warn' : 'badge--acento'} evento__selo">${escapar(e.status)}</span>
    </div>
  </section>

  <section class="wrap revelar">
    <p class="kicker">${escapar(e.kicker)}</p>
    <h1 class="detalhe__titulo" style="margin-top:var(--sp-1)">${escapar(e.titulo)}</h1>
    <div class="evento__meta">
      <span>${icone('calendar')}${escapar(dataCurta(e.data))} às ${escapar(e.hora)}</span>
      <span>${icone('pin')}${escapar(e.local)}</span>
    </div>
    <p class="detalhe__txt">${escapar(e.descricao)}</p>
  </section>

  ${!encerrado ? `<section class="wrap revelar" style="margin-top:var(--sp-5)">
    <p class="sm muted">Falta pouco para começar</p>
    ${contagemHTML(e.data)}
  </section>` : ''}

  <section class="secao revelar">
    <div class="wrap stack">
      ${encerrado
        ? `<div class="card"><p class="sm soft">Este encontro já aconteceu. Fique de olho nos próximos — eles aparecem primeiro na tela inicial.</p></div>`
        : `<button class="btn btn--primary btn--block" id="btn-presenca" aria-pressed="${vai}">
             ${vai ? `${icone('check')}Você vai — toque para cancelar` : `${icone('calendar')}Vou participar`}
           </button>`}
      <button class="btn btn--block" id="btn-agenda">${icone('clock')}Adicionar à minha agenda</button>
    </div>
  </section>

  <section class="secao revelar">
    <div class="wrap">
      <div class="card stack">
        <p class="kicker">Como funciona</p>
        <p class="sm soft">Confirme presença, chegue com seu número e apresente-se à equipe. Quem confirma recebe o lembrete do encontro na tela inicial.</p>
      </div>
    </div>
  </section>`;
}

export function montar(raiz, { id }) {
  const e = EVENTOS.find((x) => x.id === id);
  if (!e) return undefined;
  const parar = ligarContagens(raiz);

  $('#btn-presenca', raiz)?.addEventListener('click', (ev) => {
    const b = ev.currentTarget;
    const vai = alternarPresenca(e.id);
    b.setAttribute('aria-pressed', String(vai));
    b.innerHTML = vai
      ? `${icone('check')}Você vai — toque para cancelar`
      : `${icone('calendar')}Vou participar`;
    toast(vai ? 'Presença confirmada. Até lá.' : 'Presença cancelada.', vai ? 'ok' : 'aviso');
  });

  $('#btn-agenda', raiz).addEventListener('click', () => {
    const blob = new Blob([icsDe(e)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${e.titulo.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('Convite baixado. Abra o arquivo para salvar na agenda.', 'ok');
  });

  return parar;
}
