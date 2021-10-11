import { HashTables } from "./hashTables.js";
  
  export class DataManager {

  constructor() {
    this.hashTables = new HashTables();
    this.recipes = this.hashTables.recipesIndex;

    this.filters = {
      input : [],
      appliances : [],
      ustensils: [],
      ingredients : []
    }
    this.resultsBy = {
      input : [],
      ingredients : [],
      appliances : [],
      ustensils : []
    }

    this.results = Object.values(this.recipes); 
  }

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
        if (array.indexOf(ustensil.toLowerCase()) == -1 && this.filters.ustensils.indexOf(ustensil.toLowerCase()) == -1) array.push(ustensil.toLowerCase());       
      });
    });
    array = array.map(word => word[0].toUpperCase() + word.substring(1));
    array.sort();
    return array
  }
  
  /**
   * Ajoute un filtre au tableau correspondant
   *
   * @param   {String}  category  La catégorie du filtre
   * @param   {string}  string    Le nom du filtre
   * 
   * @return  {void}
   */
  addFilter(category, string) {
    let filter = string.toLowerCase();
    switch (category) {
      case 'input'       :  this.filters.input.push(filter);          break;
      case 'appliances'  :  this.filters[category] = [filter];        break;
      case 'ingredients' :  this.filters.ingredients.push(filter);    break;
      case 'ustensils'   :  this.filters.ustensils.push(filter);
    }
  }
  /**
   * Retire un filtre
   *
   * @param   {String}  category  La catégorie du filtre
   * @param   {string}  string    Le nom du filtre
   *
   * @return  {void}            [return description]
   */
  removeFilter(category, string) {
    this.filters[category].splice(this.filters[category].indexOf(string.toLowerCase()),1);
  }

  /**
   * Actions à l'ajout/suppression de filtres
   *
   * @return  {void}
   */
  updatePageContent() {
    this.getResults();
    globalThis.updateLists();
    resultsContainer.displayResults(this.results);
  }
  
  /**
   * Récupère les résultats finaux à afficher sur la page
   *
   * @return  {array} Un tableau contenant des ids
   */
  getResults() {
    let filtersAreEmpty = this.checkFiltersContent();
    if (filtersAreEmpty) {
      this.results = Object.values(this.recipes);
      return;
    }
    else {
      this.getResultsByCategory();
      let idsResults = this.crossResults();  
      this.results = this.getRecipesFromIds(idsResults);
    }
    console.log("results :", this.results);
  }
  
  /**
   * Récupère les ids des recettes pour chaque catégorie de filtres
   *
   * @return  {void}
   */
  getResultsByCategory() {
    this.resultsBy.input = this.getFromHash(this.filters.input, this.hashTables.input);
    this.resultsBy.appliances = this.getFromHash(this.filters.appliances, this.hashTables.appliances);
    this.resultsBy.ingredients = this.getFromHash(this.filters.ingredients, this.hashTables.ingredients);
    this.resultsBy.ustensils = this.getFromHash(this.filters.ustensils, this.hashTables.ustensils);
  }

  /**
   * Récupère les résultats dans les tables de hachage
   *
   * @param   {array}   filtersArray  Un tableau contenant des filtres
   * @param   {Object}  hashTable     Une table de hachage
   *
   * @return  {array}   Les résultats
   */
  getFromHash(filtersArray, hashTable) {
    let ids = [];
    let error;
    filtersArray.forEach(string => {
      if (!hashTable[string]) return error = true;
      ids.push(hashTable[string]);
    })
    if (error == true) ids = []
    else ids = this.getCrossValues(ids);

    return ids;
  }

  getRecipesFromIds(array) {
    let recipes = [];
    array.forEach(id => {
      recipes.push(this.recipes['recette_' + id])
    })
    return recipes;
  }

  /**
   * Compare les tableaux de résultats et retourne un tableau contenant les résultats communs
   *
   * @return  {array}
   */
  crossResults() {
    let arrays = [];
    if (this.resultsBy.input.length > 0) arrays.push(this.resultsBy.input);
    if (this.resultsBy.ingredients.length > 0) arrays.push(this.resultsBy.ingredients);
    if (this.resultsBy.appliances.length > 0) arrays.push(this.resultsBy.appliances);
    if (this.resultsBy.ustensils.length > 0) arrays.push(this.resultsBy.ustensils);

    let crossResults = this.getCrossValues(arrays);
    return crossResults;
  }

  /**
   * Compare plusieurs tableaux et retourne les valeurs communes
   *
   * @param   {array}  array  Un tableau comportant plusieurs tableaux
   *
   * @return  {array}  Un nouveau tableau avec les valeurs communes
   */
  getCrossValues(array) {
    let crossValues = []
    if (array.length > 0) {
      crossValues = array.shift().filter(id => {
        return array.every(arr => {
            return arr.indexOf(id) !== -1;
        })
      })  
    }
    return crossValues;
  }

  /**
   * Vérifie s'il y a des filtres actifs ou non
   *
   * @return  {boolean}
   */
  checkFiltersContent(){
    let isEmpty = true;
    Object.values(this.filters).forEach(value => {
      if (value.length > 0) return isEmpty = false;
    })
    return isEmpty;
  }

}