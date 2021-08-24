import { recipes } from "./data.js";

export class DataManager {

  constructor() {
    this.recipes = recipes;
    this.ingredients = this.getFullList('ingredients');
    this.appliances = this.getFullList('appliances');
    this.ustensils = this.getFullList('ustensils');

    this.filters = [];
  }

  /**
  * Récupère la liste complète d'ingrédients, d'appareils ou d'ustensiles
  *
  * @param   {String}  category  La catégorie souhaitée
  *
  * @return  {Array.<String>}  Une tableau contenant la liste sous forme de chaine 
  */
  getFullList(category) {
    let fullList = [];
    // Pour chaque recette:
    for (let i = 0; i < recipes.length; i++) {
      switch (category) {
        case 'ingredients' :                     
          let ingredientsArray = recipes[i].ingredients;        // → on récupère le tableau d'ingrédients
          for (let i = 0; i < ingredientsArray.length; i++) {   // → pour chaque ingrédient dans le tableau
            fullList.push(ingredientsArray[i].ingredient);      // → on ajoute l'ingrédient à la liste
          }
          break;
        case 'appliances' :
          fullList.push(recipes[i].appliance);                  // → on ajoute l'appareil à la liste.
          break;
        case 'ustensils' :
          let ustensilsArray = recipes[i].ustensils;            // → on récupère le tableau ustensils
          for (let i = 0; i < ustensilsArray.length; i++) {     // → pour chaque ustensile dans le tableau
            fullList.push(ustensilsArray[i][0].toUpperCase()    // → on ajoute l'ustensile à la liste (et on met la première lettre en majuscule)
              + ustensilsArray[i].substring(1));
          }
      }
    }
    let mySet = new Set(fullList);     // On supprime les entrées en double et on retourne le tableau
    fullList = [...mySet];    
    return fullList;
  }

  getFilteredList(category) {
    let list;
    if (this.filters.length == 0) {
      list = this[category];
    }
    else {
      list = this[category].filter(item => {
      return this.filters.includes(item)});
    }
    return list;
  }

}