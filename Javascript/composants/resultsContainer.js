import { Recipe } from "./recipe.js";

export class ResultsContainer {

  constructor() {
    this.DOM = document.createElement('section');
    this.DOM.setAttribute('id', 'results-container')
    document.querySelector('main').appendChild(this.DOM);

    this.displayResults(dataManager.allRecipes);
  }

  /**
   * Affiche les recettes
   *
   * @param   {array}  array  Un tableau contenant des ids
   *
   * @return  {void}
   */
  displayResults(array) {
    if (this.DOM.childNodes.length > 0) this.DOM.innerHTML = '';
    if (array.length == 0) this.displayMessage();
    array.forEach(id => {
      let recipe = dataManager.recipesIndex['recette_' + id];
      new Recipe(recipe, this.DOM);
    });
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