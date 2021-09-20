import { recipes } from "./data.js";
  
  export class DataManager {

  constructor() {
    this.recipes = recipes;

    this.recipesIndex = {};
    this.allRecipes = this.getAllRecipesIds();

    this.hash_input = {}
    this.hash_ingredients = {}
    this.hash_appliances = {}
    this.hash_ustensils = {}

    this.resultsBy = {
      input : [],
      ingredients : [],
      appliances : [],
      ustensils : []
    }

    this.filters = {
      input : [],
      ingredients : [],
      appliances : [],
      ustensils : []
    }

    this.results = this.allRecipes;  

    this.makehashTables();
  }

  //------ Hash Tables --------------------------------------------------------------------------------------

  makehashTables() {
    this.recipes.forEach(recipe => {
      let id = recipe.id;
      this.recipesIndex['recette_'+ id] = recipe;
      this.hashRecipeStrings(recipe, id)
      this.hashRecipeUstensils(recipe, id);
      this.hashRecipeIngredients(recipe, id)    
      this.hashRecipeAppliance(recipe, id)
    })
  }
  
  hashRecipeStrings(recipe, id){
    this.hashFromString(recipe.name.toLowerCase(), id);
    this.hashFromString(recipe.description.toLowerCase(), id);
    recipe.ingredients.forEach(ingredient => {
      this.hashFromString(ingredient.ingredient.toLowerCase(), id);
    });
  }
  hashRecipeUstensils(recipe, id){
    recipe.ustensils.forEach(ustensil => {
      this.addToHash(ustensil.toLowerCase(), id, this.hash_ustensils);
    });
  }
  hashRecipeIngredients(recipe, id){
    recipe.ingredients.forEach(ingredient => {
      this.addToHash(ingredient.ingredient.toLowerCase(), id, this.hash_ingredients)
    });
  }
  hashRecipeAppliance(recipe, id){
    this.addToHash(recipe.appliance.toLowerCase(), id, this.hash_appliances)
  }

  addToHash(key, id, destination) {
    if(!destination[key]) destination[key] = [];
    if(destination[key].indexOf(id) == -1) destination[key].push(id);
  }
  hashFromString(string, id){
    let cleanString = this.removePunctuation(string);
    const words = cleanString.split(" ");
    words.forEach(word => {
      let i, j;  
      for (i = 0; i < word.length; i++) {
          for (j = i + 1; j < word.length + 1; j++) {
            let substring = word.slice(i, j);
            if (substring.length > 2) this.addToHash(substring, id, this.hash_input);
          }
      }
    });
  }
  removePunctuation(string) {
    const regex = /[!"#$%&'()*°+,-./:;<=>?@[\]^_`{|}~0123456789]/g;
    const result = string.replace(regex, ' ');

    return result;
  }

  //------ Dropdown List ---------------------------------------------------------------------------------------------

  getIngredientsList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recipesIndex['recette_' + id];
      recipe.ingredients.forEach(ingredient => {
        if ((array.indexOf(ingredient.ingredient) == -1) && this.filters.ingredients.indexOf(ingredient.ingredient.toLowerCase()) == -1) array.push(ingredient.ingredient);       
      });
    });
    return array
  }
  getAppliancesList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recipesIndex['recette_' + id];
      if ((array.indexOf(recipe.appliance) == -1) && this.filters.appliances.indexOf(recipe.appliance.toLowerCase()) == -1) array.push(recipe.appliance);       
    });
    return array;
  }
  getUstensilsList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recipesIndex['recette_' + id];
      recipe.ustensils.forEach(ustensil => {
        if ((array.indexOf(ustensil) == -1) && this.filters.ustensils.indexOf(ustensil.toLowerCase()) == -1) array.push(ustensil);       
      });
    });
    return array
  }

  //----- Manage Results ---------------------------------------------------------------------------------------------

  manageResults() {
    this.getResults();
    console.log('results :', this.results);
    globalThis.updateLists();
    resultsContainer.displayResults(this.results);
  }

  //------ Ajout/retrait filtres -------------------------------------------------------------------------------------

  addFilter(category, string) {
    let filter = string.toLowerCase();
    switch (category) {
      case 'input'       :  this.filters.input = [filter];            break;
      case 'appliances'  :  this.filters[category] = [filter];        break;
      case 'ingredients' :  this.filters.ingredients.push(filter);    break;
      case 'ustensils'   :  this.filters.ustensils.push(filter);
    }
    console.log(this.filters);
  }
  removeFilter(category, string) {
    this.filters[category].splice(this.filters[category].indexOf(string.toLowerCase()),1);
    console.log(this.filters);
  }

  //----- Tri Recettes -----------------------------------------------------------------------------------------------


  getRecipesIds() {
    if (!this.hash_input[this.filters.input]) this.resultsBy.input = [];
    else this.resultsBy.input = this.getFromHash(this.filters.input, this.hash_input);


    this.resultsBy.appliances = this.getFromHash(this.filters.appliances, this.hash_appliances);
    this.resultsBy.ingredients = this.getFromHash(this.filters.ingredients, this.hash_ingredients);
    this.resultsBy.ustensils = this.getFromHash(this.filters.ustensils, this.hash_ustensils);
  }
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
  getResults() {
    if  (this.filters.input.length == 0 && this.filters.ingredients.length == 0 && this.filters.appliances.length == 0 && this.filters.ustensils.length == 0) {
      return this.results = this.allRecipes;
    }

    this.getRecipesIds();

    let arrays = [];
    if (this.resultsBy.input.length > 0) arrays.push(this.resultsBy.input);
    if (this.resultsBy.ingredients.length > 0) arrays.push(this.resultsBy.ingredients);
    if (this.resultsBy.appliances.length > 0) arrays.push(this.resultsBy.appliances);
    if (this.resultsBy.ustensils.length > 0) arrays.push(this.resultsBy.ustensils);

    this.results = this.getCrossValues(arrays);
  }
  getAllRecipesIds() {
    let allRecipesIds = [];
    this.recipes.forEach(recipe => {
      allRecipesIds.push(recipe.id)
    });
    return allRecipesIds;
  }


  




}