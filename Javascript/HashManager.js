import { recipes } from "./data.js";
  
  export class HashManager {

  constructor() {
    this.recipes = recipes;

    this.recettes = {};
    this.allRecipes = this.getAllRecipesIds();

    this.hash_input = {}
    this.hash_ingredients = {}
    this.hash_appliances = {}
    this.hash_ustensils = {}

    this.resultsByInput = [];
    this.resultsByIngredients = [];
    this.resultsByAppliances = [];
    this.resultsByUstensils = [];

    this.results = this.allRecipes;  

    this.makehashTables();
  }

  //------ Hash Tables --------------------------------------------------------------------------------------

  makehashTables() {
    this.recipes.forEach(recipe => {
      let id = recipe.id;
      this.recettes['recette_'+ id] = recipe;
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

  //------ Dropdown List ------------------------------------------------------------------------------------

  getIngredientsList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recettes['recette_' + id];
      recipe.ingredients.forEach(ingredient => {
        if (array.indexOf(ingredient.ingredient) == -1) array.push(ingredient.ingredient);       
      });
    });
    return array
  }
  getAppliancesList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recettes['recette_' + id];
      if (array.indexOf(recipe.appliance) == -1) array.push(recipe.appliance);       
    });
    return array;
  }
  getUstensilsList() {
    let array = [];
    this.results.forEach(id => {
      let recipe = this.recettes['recette_' + id];
      recipe.ustensils.forEach(ustensil => {
        if (array.indexOf(ustensil) == -1) array.push(ustensil);       
      });
    });
    return array
  }

  //----- Manage Results -------------------------------------------------------------------------------------

  manageResults() {
    this.getResults();
    globalThis.updateLists();
    resultsContainer.displayResults(this.results);
  }
  resetResults() {
    this.results = this.allRecipes;
    globalThis.updateLists();
    resultsContainer.displayResults(this.results);
  }

  getResults() {
    let arrays = [];
    if (this.resultsByInput.length > 0) arrays.push(this.resultsByInput);
    if (this.resultsByIngredients.length > 0) arrays.push(this.resultsByIngredients);
    if (this.resultsByAppliances.length > 0) arrays.push(this.resultsByAppliances);
    if (this.resultsByUstensils.length > 0) arrays.push(this.resultsByUstensils);

    let results = this.getCrossValues(arrays);
    console.log('results :', results);
    this.results = results;
  }
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

  pushMatchingRecipes(category, string) {
    switch (category) {
      case 'input'      :  this.resultsByInput = this.hash_input[string]; break;
      case 'ingredients':  this.hash_ingredients[string].forEach(id => this.resultsByIngredients.push(id)); break;
      case 'appliances' :  this.hash_appliances[string].forEach(id => this.resultsByAppliances.push(id));   break;
      case 'ustensils'  :  this.hash_ustensils[string].forEach(id => this.resultsByUstensils.push(id));
    }
  }
  getDuplicateValues(array) {
    let result = array.filter((item, index) => array.indexOf(item) !== index)
    return result;
  }

  //------------------------------------------------------------------------------------------------------------

  getAllRecipesIds() {
    let allRecipesIds = [];
    this.recipes.forEach(recipe => {
      allRecipesIds.push(recipe.id)
    });
    return allRecipesIds;
  }

}