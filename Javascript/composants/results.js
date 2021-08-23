import { Recipe } from "./recipe.js";

export class Results {

  constructor(data) {
    this.DOM = document.getElementById('recipes-container')
    this.DOM.innerHTML = '';
    this.DOM.innerHTML = this.displayResults(data);
  }

  /**
   * Affiche les recettes à partir du tableau donné en argument
   *
   * @param   {array}  array  Un tableau contenant des recettes
   *
   * @return  {String}  Le html à afficher
   */
   displayResults(array) {
    let recipe;
    let html = "";
    for (let i = 0; i < array.length; i++) {
      recipe = new Recipe(array[i]);
      html += recipe.recipeCardHtml();
    }
    return html;
  }
  
}