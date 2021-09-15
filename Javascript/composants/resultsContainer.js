import { Recipe } from "./recipe.js";

export class ResultsContainer {

  constructor() {
    this.DOM = document.createElement('section');
    this.DOM.setAttribute('id', 'results-container')
    document.querySelector('main').appendChild(this.DOM);
  }

  /**
   * Affiche les recettes
   *
   * @param   {array}  recipes  Un tableau contenant des recettes
   *
   * @return  {void}
   */
  displayResults(recipes) {
    if (this.DOM.childNodes.length > 0) this.DOM.innerHTML = '';
    if (recipes.length == 0) this.displayMessage();
    for (let i = 0; i < recipes.length; i++) {
      new Recipe(recipes[i], this.DOM);
    }
  }

  displayMessage() {
    let message = document.createElement('p');
    message.innerText = 'Aucune recette ne correspond à votre recherche'
    this.DOM.appendChild(message);
  }
  
}