/* ============================================================
   TELA — Entrada (número + nascimento + senha)
   ============================================================ */

import { escapar, $, $$, toast } from '../ui.js';
import { icone } from '../icons.js';
import { CONFIG } from '../config.js';
import {
  entrar, estadoDoNumero, legionario, esperaRestante, normalizarNumero,
  mascararData, codigoDeRecuperacao, redefinirSenha, validarSenhaNova
} from '../estado.js';
import { ir } from '../router.js';

const DEMO = { numero: '505058', nascimento: '12/03/1996' };

export const titulo = 'Entrar';
export const publica = true;
export const somenteVisitante = true;
export const semAba = true;

export function render() {
  return `<section class="entrada">
    <div class="entrada__marca revelar">
      <p class="entrada__logo">${icone('flag')}Legionários</p>
      <h1 class="entrada__titulo">Entre para a<br>sua comunidade.</h1>
      <p class="entrada__sub">Seu número de legionário e a data de nascimento. É só isso.</p>
    </div>

    <form class="entrada__form" id="form-entrada" novalidate>
      <label class="campo">
        <span class="campo__rot">Número de legionário</span>
        <input class="campo__ctrl" id="f-numero" name="numero" inputmode="numeric" autocomplete="username"
               maxlength="6" placeholder="000000" aria-describedby="d-numero">
        <span class="campo__dica" id="d-numero">Seis dígitos, como no seu cadastro.</span>
      </label>

      <label class="campo">
        <span class="campo__rot">Data de nascimento</span>
        <input class="campo__ctrl" id="f-nascimento" name="nascimento" inputmode="numeric"
               autocomplete="bday" maxlength="10" placeholder="dd/mm/aaaa">
      </label>

      <div id="bloco-senha" hidden>
        <label class="campo">
          <span class="campo__rot" id="rot-senha">Sua senha</span>
          <input class="campo__ctrl" id="f-senha" name="senha" type="password"
                 autocomplete="current-password" placeholder="mínimo 6 caracteres"
                 aria-describedby="d-senha">
          <span class="campo__dica" id="d-senha" hidden>Use ao menos uma letra e um número.</span>
        </label>
        <label class="campo" id="bloco-confirma" hidden>
          <span class="campo__rot">Repita a senha</span>
          <input class="campo__ctrl" id="f-confirma" type="password" autocomplete="new-password"
                 placeholder="a mesma senha">
        </label>
      </div>

      <p class="campo__erro" id="erro-entrada" role="alert" hidden></p>

      <button class="btn btn--primary btn--block" id="f-enviar" type="submit">
        <span>Continuar</span>${icone('chev-right')}
      </button>
    </form>

    <div class="entrada__pe">
      <button type="button" id="f-esqueci">Esqueci minha senha</button>
      <span aria-hidden="true">·</span>
      <button type="button" id="f-demo">Ver demonstração</button>
    </div>
  </section>`;
}

export function montar(raiz) {
  const form = $('#form-entrada', raiz);
  const numero = $('#f-numero', raiz);
  const nascimento = $('#f-nascimento', raiz);
  const senha = $('#f-senha', raiz);
  const confirma = $('#f-confirma', raiz);
  const blocoSenha = $('#bloco-senha', raiz);
  const blocoConfirma = $('#bloco-confirma', raiz);
  const erro = $('#erro-entrada', raiz);
  const botao = $('#f-enviar', raiz);
  const rotSenha = $('#rot-senha', raiz);
  let etapa = 'identificacao';
  let numeroValido = '';

  numero.addEventListener('input', () => {
    numero.value = normalizarNumero(numero.value);
    limparErro();
  });
  nascimento.addEventListener('input', () => {
    nascimento.value = mascararData(nascimento.value);
    limparErro();
  });

  function mostrarErro(texto) {
    erro.textContent = texto;
    erro.hidden = false;
    erro.closest('form')?.querySelector('.campo__ctrl')?.setAttribute('aria-invalid', 'true');
  }
  function limparErro() {
    erro.hidden = true;
    $$('.campo__ctrl', raiz).forEach((c) => c.removeAttribute('aria-invalid'));
  }

  function travar(segundos) {
    const fim = Date.now() + segundos;
    botao.disabled = true;
    const rotulo = botao.querySelector('span');
    const original = rotulo.textContent;
    const passo = () => {
      const resta = Math.ceil((fim - Date.now()) / 1000);
      if (resta <= 0) {
        botao.disabled = false;
        rotulo.textContent = original;
        return;
      }
      rotulo.textContent = `Aguarde ${resta}s`;
      setTimeout(passo, 1000);
    };
    passo();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    limparErro();

    /* ---- passo 1: identificar ---- */
    if (etapa === 'identificacao') {
      const n = normalizarNumero(numero.value);
      const d = nascimento.value;
      if (n.length !== 6) return mostrarErro('O número tem seis dígitos.');
      if (d.length !== 10) return mostrarErro('Informe a data completa, com dia, mês e ano.');

      const l = legionario(n);
      if (!l) return mostrarErro('Não encontramos esse número. Confira no seu cadastro.');
      if (l.nascimento !== d) return mostrarErro('A data de nascimento não confere com esse número.');

      const espera = esperaRestante(n);
      if (espera > 0) {
        mostrarErro(`Muitas tentativas. Tente de novo em ${Math.ceil(espera / 60000)} min.`);
        return travar(espera);
      }

      numeroValido = n;
      const novo = estadoDoNumero(n) === 'novo';
      blocoSenha.hidden = false;
      blocoConfirma.hidden = !novo;
      rotSenha.textContent = novo ? 'Crie sua senha' : 'Sua senha';
      $('#d-senha', raiz).hidden = !novo;
      senha.autocomplete = novo ? 'new-password' : 'current-password';
      senha.value = '';
      confirma.value = '';
      etapa = 'senha';
      botao.querySelector('span').textContent = novo ? 'Criar senha e entrar' : 'Entrar';
      numero.closest('.campo').hidden = true;
      nascimento.closest('.campo').hidden = true;
      voltarAoNumero.hidden = false;
      senha.focus();
      return;
    }

    /* ---- passo 2: senha ---- */
    const novo = estadoDoNumero(numeroValido) === 'novo';
    if (novo) {
      const motivo = validarSenhaNova(senha.value);
      if (motivo === 'senha-curta') return mostrarErro('A senha precisa de pelo menos 6 caracteres.');
      if (motivo === 'senha-fraca') return mostrarErro('Misture letras e números na senha.');
      if (senha.value !== confirma.value) return mostrarErro('As duas senhas não são iguais.');
    }
    if (!senha.value) return mostrarErro('Digite sua senha.');

    botao.classList.add('btn--carregando');
    botao.disabled = true;
    const r = await entrar({ numero: numeroValido, nascimento: nascimento.value, senha: senha.value });
    botao.classList.remove('btn--carregando');
    botao.disabled = false;

    if (r.ok) {
      toast(r.primeiroAcesso ? 'Senha criada. Bem-vindo.' : 'Bem-vindo de volta.', 'ok');
      ir('/inicio', { substituir: true });
      return;
    }
    if (r.motivo === 'bloqueado') {
      mostrarErro(`Muitas tentativas. Tente de novo em ${Math.ceil(r.espera / 60000)} min.`);
      return travar(r.espera);
    }
    if (r.motivo === 'senha') {
      const restantes = CONFIG.tentativasMax - (r.falhas ?? 0);
      mostrarErro(restantes > 0
        ? `Senha incorreta. ${restantes} tentativa${restantes > 1 ? 's' : ''} antes do bloqueio.`
        : 'Senha incorreta. Acesso bloqueado por alguns minutos.');
      if (r.espera) travar(r.espera);
      return;
    }
    mostrarErro('Não foi possível entrar. Tente de novo.');
  });

  /* ---- voltar ao passo 1 ---- */
  const voltarAoNumero = document.createElement('button');
  voltarAoNumero.type = 'button';
  voltarAoNumero.className = 'btn btn--ghost btn--block btn--sm';
  voltarAoNumero.textContent = 'Usar outro número';
  voltarAoNumero.hidden = true;
  form.insertBefore(voltarAoNumero, erro);
  voltarAoNumero.addEventListener('click', () => {
    etapa = 'identificacao';
    blocoSenha.hidden = true;
    numero.closest('.campo').hidden = false;
    nascimento.closest('.campo').hidden = false;
    voltarAoNumero.hidden = true;
    botao.querySelector('span').textContent = 'Continuar';
    senha.value = '';
    confirma.value = '';
    limparErro();
    numero.focus();
  });

  /* ---- recuperação ---- */
  $('#f-esqueci', raiz).addEventListener('click', async () => {
    const { abrirSheet } = await import('../ui.js');
    const corpo = `<div class="stack">
      <p class="soft">Informe o número. No modo demonstração mostramos o código na tela — num app com servidor ele chegaria por mensagem.</p>
      <label class="campo">
        <span class="campo__rot">Número de legionário</span>
        <input class="campo__ctrl" id="r-numero" inputmode="numeric" maxlength="6" placeholder="000000">
      </label>
      <p class="sm muted" id="r-codigo" hidden></p>
      <label class="campo">
        <span class="campo__rot">Código de 6 dígitos</span>
        <input class="campo__ctrl" id="r-cod" inputmode="numeric" maxlength="6" placeholder="000000">
      </label>
      <label class="campo">
        <span class="campo__rot">Nova senha</span>
        <input class="campo__ctrl" id="r-senha" type="password" placeholder="mínimo 6 caracteres">
      </label>
      <p class="campo__erro" id="r-erro" hidden></p>
    </div>`;
    const sheet = abrirSheet({
      titulo: 'Recuperar acesso',
      corpo,
      pe: `<button class="btn btn--primary btn--block" id="r-enviar">Redefinir senha</button>`
    });

    $('#r-numero', sheet).addEventListener('input', (e) => {
      e.target.value = normalizarNumero(e.target.value);
      const aviso = $('#r-codigo', sheet);
      if (e.target.value.length === 6 && legionario(e.target.value)) {
        aviso.hidden = false;
        aviso.innerHTML = `Código desta demonstração: <b>${escapar(codigoDeRecuperacao(e.target.value))}</b>`;
      } else aviso.hidden = true;
    });

    $('#r-enviar', sheet).addEventListener('click', async () => {
      const err = $('#r-erro', sheet);
      err.hidden = true;
      const r = await redefinirSenha({
        numero: $('#r-numero', sheet).value,
        codigo: $('#r-cod', sheet).value,
        senha: $('#r-senha', sheet).value
      });
      if (r.ok) {
        sheet.remove();
        document.querySelectorAll('.sheet-overlay').forEach((n) => n.remove());
        toast('Senha redefinida. Você já está dentro.', 'ok');
        ir('/inicio', { substituir: true });
        return;
      }
      const textos = {
        numero: 'Não encontramos esse número.',
        codigo: 'Código incorreto.',
        'senha-curta': 'A senha precisa de pelo menos 6 caracteres.',
        'senha-fraca': 'Misture letras e números na senha.'
      };
      err.textContent = textos[r.motivo] ?? 'Não foi possível redefinir.';
      err.hidden = false;
    });
  });

  /* ---- demonstração ---- */
  $('#f-demo', raiz).addEventListener('click', () => {
    numero.value = DEMO.numero;
    nascimento.value = DEMO.nascimento;
    limparErro();
    numero.focus();
    toast('Preenchido com o número de demonstração.', 'ok');
  });
}
