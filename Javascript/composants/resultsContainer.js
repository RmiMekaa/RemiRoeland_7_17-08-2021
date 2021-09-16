import { Recipe } from "./recipe.js";

export class ResultsContainer {

  constructor() {
    this.DOM = document.createElement('section');
    this.DOM.setAttribute('id', 'results-container')
    document.querySelector('main').appendChild(this.DOM);

    this.displayResults(globalThis.dataManager.recipes)
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

  /**
   * Créé un message et l'insère dans le DOM
   *
   * @return  {void} 
   */
  displayMessage() {
    let message = document.createElement('p');
    message.className = "noResultsMsg";
    message.innerHTML = 'Désolé, nous n\'avons pas trouvé de recette correspondant à vos critères. </br> Vous pouvez chercher \"tarte aux pommes\", \"poisson\", etc.';
    this.DOM.appendChild(message);
  }
  
}