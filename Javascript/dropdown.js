import { recipes } from "./data.js";


export class Dropdown {

  constructor(id, category) {
    this.id = id // ingredients || appliances || ustensils
    this.category = category // Ingrédients || Appareils || Ustensiles
    this.filters = []
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

  // createDOM() {
  //   let details = document.createElement('details');
  //   details.className = 'dropdown';
  //   details.classList.add(this.id + '-dropdown');

  //   let summary = document.createElement('summary');
  //   summary.innerHTML = this.category + '<img src="./ressources/Arrow.png"></img>';

  //   let input = document.createElement('input');
  //   input.setAttribute('id', 'search-'+ this.id);
  //   input.setAttribute('type', 'text');
  //   input.setAttribute('placeholder', 'Recherche un ' + this.category.substring(0, this.category.length - 1));

  //   let arrow = document.createElement('img');
  //   arrow.className = 'arrow-up';
  //   arrow.setAttribute('src', './ressources/Arrow.png');

  //   let searchSection = document.createElement('div');
  //   searchSection.className = 'dropdown-search-section';
  //   searchSection.appendChild(input);
  //   searchSection.appendChild(arrow);

  //   let list = document.createElement('ul');
  //   list.className = 'dropdown-list';
  //   list.setAttribute('id', this.id + '-list');
  //   list.innerHTML = this.list;

  //   details.appendChild(summary);
  //   details.appendChild(searchSection);
  //   details.appendChild(list);

  //   console.log(details);

  // }

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
        if (this.filters.length == 0) list = this.getFullList("ingredients");
        break;
      case 'appliances':
        if (this.filters.length == 0) list = this.getFullList("appliances");
        break;
      case 'ustensils': 
        if (this.filters.length == 0) list = this.getFullList("ustensils");
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
          fullList.push(ustensilsArray[i][0].toUpperCase()    // → on ajoute l'ustensile à la liste (et on met la première lettre en majuscule)
          + ustensilsArray[i].substring(1));                  
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