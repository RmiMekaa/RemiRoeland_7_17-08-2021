export class SearchInput {

  constructor(dataHandler, domTarget) {
    this.DOM = this.createDom();
    domTarget.appendChild(this.DOM);
  }

  createDom() {
    const label = document.createElement('label');
    label.setAttribute('for', 'search-field');
    label.className = 'search-section';
    const input = document.createElement('input');
    input.setAttribute('type', 'search');
    input.setAttribute('id', 'searchBar');
    input.setAttribute('placeholder', 'Rechercher un ingrédient, appareil, ustensiles ou une recette');
    const icon = document.createElement('i');
    icon.className = 'search-icon fas fa-search';

    label.appendChild(input);
    label.appendChild(icon);

    return label;
  }
}