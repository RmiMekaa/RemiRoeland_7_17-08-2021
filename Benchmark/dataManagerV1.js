import { recipes } from "../Javascript/data.js";

export class DataManagerV1 {

  /**
   * @constructor
   */
  constructor() {
    this.recipes = recipes; 
    
    this.filters = {
      input : [],
      ingredients : [],
      appliances : [],
      ustensils: []
    };

    this.resultsBy = {
      input : [],
      ingredients : [],
      appliances : [],
      ustensils: []
    }

    this.results = this.recipes;
  }

  //----- Récupération listes dropdown -----//

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
    array = array.map(word => word[0].toUpperCase() + word.substring(1));
    array.sort();
    return array
  }

  //----- Ajout/Retrait filtres -----//

  /**
   * Ajoute le filtre au tableau filters
   * @param   {String}  type   La catégorie du filtre (ingredients || appliances || ustensils)
   * @param   {String}  value  Le filtre à ajouter
   * @return  {void} 
   */
  addFilter(type, value){
    if (type == 'input') this.filters.input = [value.toLowerCase()];
    else this.filters[type].push(value.toLowerCase());
  }
  /**
   * retire le filtre au tableau filters
   * @param   {String}  type   La catégorie du filtre (ingredients || appliances || ustensils)
   * @param   {String}  value  Le filtre à supprimer
   * @return  {void}
   */
  removeFilter(type, value){ 
    if (type =='input') this.filters.input = [];
    else this.filters[type].splice(this.filters[type].indexOf(value.toLowerCase()),1);
  }

  //----- Update Page Content -----//

  /**
   * Affiche les résultats et met à jour les listes des dropdowns
   *
   * @return  {void}
   */
  updatePageContent() {
    this.getResults();
    globalThis.resultsContainer.displayResults(this.results);
    globalThis.updateLists();
  }

  //----- Récupération des résultats-----//

  /**
   * Trie les recettes en fonction des filtres et stocke les résultats obtenus dans le tableau results
   *
   * @return  {void}
   */
  getResults() {
    this.loopThroughRecipes();

    if (this.filters.input.length > 0 && this.resultsBy.input.length == 0) this.results = [];
    else this.results = this.crossResults();
  }
  /**
   * Compare plusieurs tableaux et retourne un tableau contenant les valeurs similaires
   *
   * @return  {Array}  Le tableau contenant les valeurs similaires trouvées
   */
  crossResults() {
    let arrays = [];
    if (this.resultsBy.input.length > 0) arrays.push(this.resultsBy.input);
    if (this.resultsBy.ingredients.length > 0) arrays.push(this.resultsBy.ingredients);
    if (this.resultsBy.appliances.length > 0) arrays.push(this.resultsBy.appliances);
    if (this.resultsBy.ustensils.length > 0) arrays.push(this.resultsBy.ustensils);

    let crossResults = []
    if (arrays.length > 0) {
      crossResults = arrays.shift().filter(function(object) {
        return arrays.every(function(recipes) {
            return recipes.indexOf(object) !== -1;
        })
      })  
    }
    return crossResults;
  }
  
  //------ Recherche parmi les recettes -------------------------------------------------------------------------------------------

  loopThroughRecipes() {
    this.resultsBy.input = [];
    this.resultsBy.ingredients = [];
    this.resultsBy.appliances = [];
    this.resultsBy.ustensils = [];

    this.recipes.forEach(recipe => {
      if (this.filters.input.length > 0) this.checkInputMatch(recipe);
      this.checkAppliance(recipe);
      this.checkUstensils(recipe);
      this.checkIngredients(recipe);
    });
  }

  checkInputMatch(recipe) {
    if (recipe.name.toLowerCase().includes(this.filters.input) && this.resultsBy.input.indexOf(recipe) == -1) this.resultsBy.input.push(recipe);
    else if (recipe.description.toLowerCase().includes(this.filters.input) && this.resultsBy.input.indexOf(recipe) == -1) this.resultsBy.input.push(recipe);
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.ingredient.toLowerCase().includes(this.filters.input) && this.resultsBy.input.indexOf(recipe) == -1) this.resultsBy.input.push(recipe);
    });
  }
  checkAppliance(recipe) {
    if (this.filters.appliances == recipe.appliance.toLowerCase()) this.resultsBy.appliances.push(recipe);
  }
  checkUstensils(recipe) {
    if (this.filters.ustensils.every(i => recipe.ustensils.includes(i))) this.resultsBy.ustensils.push(recipe);
  }
  checkIngredients(recipe) {
    let recipeIngredients = [];
    recipe.ingredients.forEach(ingredient => recipeIngredients.push(ingredient.ingredient.toLowerCase()));
    if (this.filters.ingredients.every(i => recipeIngredients.includes(i))) this.resultsBy.ingredients.push(recipe);
  }

}
