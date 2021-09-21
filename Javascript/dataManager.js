import { recipes } from "./data.js";

export class DataManager {

  /**
   * @constructor
   */
  constructor() {
    this.recipes = recipes; 
    
    this.filters = {
      text : "",
      appliances : [],
      ustensils: [],
      ingredients : []
    };

    this.results = this.recipes; // Stocke les résultats
  }

  //----- Récupération listes dropdown ------------------------------------------------------------------------------------------

  getIngredientsList() {
    let array = [];
    this.results.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (array.indexOf(ingredient.ingredient) == -1 && this.filters.ingredients.indexOf(ingredient.ingredient.toLowerCase()) == -1) array.push(ingredient.ingredient);       
      });
    });
    array.sort();
    return array
  }
  getAppliancesList() {
    let array = [];
    this.results.forEach(recipe => {
      if (array.indexOf(recipe.appliance) == -1 && this.filters.appliances.indexOf(recipe.appliance.toLowerCase()) == -1) array.push(recipe.appliance);       
    });
    array.sort();
    return array;
  }
  getUstensilsList() {
    let array = [];
    this.results.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        if (array.indexOf(ustensil) == -1 && this.filters.ustensils.indexOf(ustensil.toLowerCase()) == -1) array.push(ustensil);       
      });
    });
    array.sort();
    return array
  }

  /**
   * Ajoute le filtre au tableau filters
   * @param   {String}  type   La catégorie du filtre (ingredients || appliances || ustensils)
   * @param   {String}  value  Le filtre à ajouter
   * @return  {void} 
   */
  addFilter(type, value){
    if (type == 'text') this.filters.text = value.toLowerCase();
    else this.filters[type].push(value.toLowerCase());
    this.sort();
    this.displayResults();
  }
  /**
   * retire le filtre au tableau filters
   * @param   {String}  type   La catégorie du filtre (ingredients || appliances || ustensils)
   * @param   {String}  value  Le filtre à supprimer
   * @return  {void}
   */
  removeFilter(type, value){ 
    if (type =='text') this.filters.text = "";
    else this.filters[type].splice(this.filters[type].indexOf(value.toLowerCase()),1);
    this.sort();
    this.displayResults();
  }

  /**
   * Affiche les résultats et met à jour les listes des dropdowns
   *
   * @return  {void}
   */
  displayResults() {
    globalThis.resultsContainer.displayResults(this.results);
    globalThis.updateLists();
  }

  /**
   * Trie les recettes en fonction des filtres et stocke les résultats obtenus dans le tableau results
   *
   * @return  {void}
   */
  sort() {
    let arr1 = this.sortByInput();                    // Les recettes triées par texte
    let arr2 = this.sortByIngredients(this.recipes);  // Les recettes triées par ingrédients
    let arr3 = this.sortByAppliance(this.recipes);    // Les recettes triées par appareil
    let arr4 = this.sortByUstensils(this.recipes);    // Les recettes triées par ustensiles

    let arrays = [];
    if (arr1.length > 0) arrays.push(arr1);
    if (arr2.length > 0) arrays.push(arr2);
    if (arr3.length > 0) arrays.push(arr3);
    if (arr4.length > 0) arrays.push(arr4);

    let matchingValues = this.getMatchingValues(arrays);

    if (matchingValues.length == 0) this.results = [];
    else this.results = matchingValues;
  }

  /**
   * Compare plusieurs tableaux et retourne un tableau contenant les valeurs similaires
   *
   * @param   {Array}  array  Un tableau contenant plusieurs tableaux
   *
   * @return  {Array}  Le tableau contenant les valeurs similaires trouvées
   */
  getMatchingValues(array) {
    let matchingValues = []
    if (array.length > 0) {
      matchingValues = array.shift().filter(function(v) {
        return array.every(function(recipes) {
            return recipes.indexOf(v) !== -1;
        })
      })  
    }
    return matchingValues;
  }
  
  /**
   * Retourne les recettes correspondantes à la recherche via input
   *
   * @return  {array} un tableau de recettes
   */
  sortByInput() {
    let arr1 = this.sortIngByText(this.recipes);
    let arr2 = this.sortByName(this.recipes);
    let arr3 = this.sortByDesciption(this.recipes);

    let results = arr1.concat(arr2, arr3)
    results = [...new Set(results)];

    return results;
  }

  //------ Recherche par catégorie -------------------------------------------------------------------------------------------

  sortIngByText(array) {
    let results = [];
    array.forEach(recipe => {
     recipe.ingredients.forEach(ingredient => {
       if (ingredient.ingredient.toLowerCase().includes(this.filters.text) && results.indexOf(recipe) == -1) results.push(recipe);
     });
    })
    return results;
 
  }
  sortByIngredients(array) {
    let arrays = [];
    for (let i=0; i < this.filters.ingredients.length; i++) {
      let arr = [];
      array.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          if (ingredient.ingredient.toLowerCase().includes(this.filters.ingredients[i]) && arr.indexOf(recipe) == -1) arr.push(recipe);
        });
      })
      arrays.push(arr);
    }
    let results = this.getMatchingValues(arrays);
    return results;
  }
  sortByAppliance(array) {
    let results = [];
    array.forEach(recipe => {
      if (this.filters.appliances.includes(recipe.appliance.toLowerCase()) && results.indexOf(recipe) == -1) results.push(recipe);
    })
    return results;
  }
  sortByUstensils(array) {
    let arrays = [];
    for (let i=0; i < this.filters.ustensils.length; i++) {
      let arr = [];
      array.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
          if (ustensil.includes(this.filters.ustensils[i]) && arr.indexOf(recipe) == -1) arr.push(recipe);
        });
      })
      arrays.push(arr);
    }
    let results = this.getMatchingValues(arrays);
    return results;
  }
  sortByName(array) {
    let results = [];
    array.forEach(recipe => {
      if (recipe.name.toLowerCase().includes(this.filters.text)) results.push(recipe)
    })
    return results;
  }
  sortByDesciption(array) {
    let results = [];
    array.forEach(recipe => {
      if (recipe.description.toLowerCase().includes(this.filters.text)) results.push(recipe)
    })
    return results;
  }

}
