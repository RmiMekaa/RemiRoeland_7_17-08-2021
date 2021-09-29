import { HashTables } from "../Javascript/hashTables.js";
  
  export class DataManagerV2 {

  constructor() {
    this.hashTables = new HashTables();
    this.recipes = this.hashTables.recipesIndex;

    this.allRecipes = this.getAllRecipesIds();

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

    this.results = this.allRecipes; 
  }

  /**
   * Retourne la liste d'ingrédients disponibles
   *
   * @return  {array}
   */
  getIngredientsList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recipes['recette_' + id];
      recipe.ingredients.forEach(ingredient => {
        if ((array.indexOf(ingredient.ingredient) == -1) && this.filters.ingredients.indexOf(ingredient.ingredient.toLowerCase()) == -1) array.push(ingredient.ingredient);       
      });
    });
    return array
  }
  /**
   * Retourne la liste d'appareils disponibles
   *
   * @return  {array}
   */
  getAppliancesList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recipes['recette_' + id];
      if ((array.indexOf(recipe.appliance) == -1) && this.filters.appliances.indexOf(recipe.appliance.toLowerCase()) == -1) array.push(recipe.appliance);       
    });
    return array;
  }
  /**
   * Retourne la liste d'ustensiles disponibles
   *
   * @return  {array}
   */
  getUstensilsList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recipes['recette_' + id];
      recipe.ustensils.forEach(ustensil => {
        ustensil = ustensil[0].toUpperCase() + ustensil.substring(1);
        if ((array.indexOf(ustensil) == -1) && this.filters.ustensils.indexOf(ustensil.toLowerCase()) == -1) array.push(ustensil);       
      });
    });
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
      case 'input'       :  this.filters.input = [filter];            break;
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
   * Récupère les ids des recettes pour chaque catégorie de filtres
   *
   * @return  {void}
   */
  getResultsByCategory() {
    if (!this.hashTables.input[this.filters.input]) this.resultsBy.input = [];
    else this.resultsBy.input = this.getFromHash(this.filters.input, this.hashTables.input);

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
    let results = [];
    if (filtersArray.length == 1) results = hashTable[filtersArray];
    else {
      filtersArray.forEach(string => results.push(hashTable[string]));
      results = this.getCrossValues(results);
    }
    return results;
  }

  /**
   * Récupère les résultats finaux à afficher sur la page
   *
   * @return  {array} Un tableau contenant des ids
   */
  getResults() {
    let filtersAreEmpty = this.checkFiltersContent();
    if (filtersAreEmpty) return this.allRecipes;
    this.getResultsByCategory();
    this.results = this.getCrossResults();  
    console.log('V2', this.results);
  }

  /**
   * Compare les tableaux de résultats et retourne un tableau contenant les résultats communs
   *
   * @return  {array}
   */
  getCrossResults() {
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
   * Récupère les ids de toutes les recettes
   *
   * @return  {array}
   */
  getAllRecipesIds() {
    let array = [];
    Object.values(this.recipes).forEach(recipe => array.push(recipe.id));
    return array;  
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