/* Ícones do sprite — uso via <svg class="i"><use href="#i-nome"></svg> */
export function icone(nome, classe = 'i') {
  return `<svg class="${classe}" aria-hidden="true"><use href="#i-${nome}"/></svg>`;
}
