import { recipes } from "./data.js";


export class Dropdown {

  constructor(id, category) {
    this.id = id // ingredients || appliances || ustensils
    this.category = category // Ingrédients || Appareils || Ustensiles
    this.list = this.setList(id);
    this.createHTML();
  }

  /**
   * Créé le html des dropdowns
   *
   * @return  {string}  HTML String
   */
  createHTML() {
    return `<details class="dropdown ${this.id}-dropdown">
              <summary>${this.category}<img src="./ressources/Arrow.png"></summary>
              <div class="dropdown-search-section">
                <input id="search-${this.id}" type="text" placeholder="Recherche un ${this.category.substring(0, this.category.length - 1)}">
                <img class="arrow-up" src="./ressources/Arrow.png">
              </div>
              <ul id="${this.id}-list" class="dropdown-list">
                ${this.list}
              </ul>
            </details>`;
  }

  /**
   * Créé le html pour la liste des dropdowns
   *
   * @param   {string}  category  la catégorie souhaitée (ingredients || appliances || ustensils)
   *
   * @return  {string}  HTML String
   */
  setList(category) {
    let html = '';
    let list = [];
    switch (category) {
      case 'ingredients': 
        list = this.getFullList("ingredients");
        break;
      case 'appliances':
        list = this.getFullList("appliances");
        break;
      case 'ustensils': 
        list = this.getFullList("ustensils");
        break;
    }
    for (let i = 0; i < list.length; i++) {
      html += '<li>' + list[i] + '</li>'
    }
    return html;
  }

  /**
   * Récupère la liste complète d'ingrédients, d'appareils ou d'ustensiles
   *
   * @param   {String}  category  La catégorie souhaitée
   *
   * @return  {array}  Array 
   */
  getFullList(category) {
    let fullList = [];
    for (let i = 0; i < recipes.length; i++) {              // Pour chaque recette:

      if (category == "ingredients") {                      // Si l'argument est "ingredients":
        let ingredientsArray = recipes[i].ingredients;        // → on récupère le tableau d'ingrédients
        for (let i=0; i < ingredientsArray.length; i++) {     // → pour chaque ingrédient dans le tableau
          fullList.push(ingredientsArray[i].ingredient);      // → on ajoute l'ingrédient à la liste
        }
      }  
      else if (category == "appliances") {                  // Si l'argument est "appliances":
          fullList.push(recipes[i].appliance);                // → on ajoute l'appareil à la liste.
      } 
      else if (category == "ustensils") {                   // Si l'argument est "ustensils":
        let ustensilsArray = recipes[i].ustensils;            // → on récupère le tableau ustensils
        for (let i=0; i < ustensilsArray.length; i++) {       // → pour chaque ustensile dans le tableau
          fullList.push(ustensilsArray[i]);                   // → on ajoute l'ustensile à la liste
        }
      }
    }
    // On supprime les entrées en double
    let mySet = new Set(fullList);
    fullList = [...mySet];
    // on retourne la liste sous forme de tableau
    return fullList;  
  }

}