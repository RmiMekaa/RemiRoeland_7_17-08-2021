import { recipes } from "./data.js";

export class HashTables {

  constructor() {
    this.recipes = recipes;

    this.recipesIndex = {};

    this.input = {}
    this.ingredients = {}
    this.appliances = {}
    this.ustensils = {}

    this.init();
  }

  /**
   * Initialise la création des tables de hachage
   * @return  {void} 
   */
  init() {
    this.recipes.forEach(recipe => {
      let id = recipe.id;
      this.recipesIndex['recette_'+ id] = recipe;
      this.hashRecipe(recipe, id);
    })
  }
  
  /**
   * Complète les tables de hachage
   *
   * @param   {Object}  recipe  Un objet recette
   * @param   {Number}  id      l'id de la recette
   *
   * @return  {void}
   */
  hashRecipe(recipe, id){
    this.hashRecipeName(recipe, id);
    this.hashRecipeDescription(recipe, id);
    this.hashRecipeIngredients(recipe, id);  
    this.hashRecipeUstensils(recipe, id);
    this.hashRecipeAppliance(recipe, id)
  }

  // Traitement des différentes propriétés
  hashRecipeName(recipe, id){
    let substrings = this.sliceString(recipe.name.toLowerCase());
    substrings.forEach(substring => this.addToHash(substring, id, this.input));
  }
  hashRecipeDescription(recipe, id){
    let substrings = this.sliceString(recipe.description.toLowerCase());
    substrings.forEach(substring => this.addToHash(substring, id, this.input));
  }
  hashRecipeIngredients(recipe, id){
    recipe.ingredients.forEach(ingredient => {
      this.addToHash(ingredient.ingredient.toLowerCase(), id, this.ingredients);
      let substrings = this.sliceString(ingredient.ingredient.toLowerCase());
      substrings.forEach(substring => this.addToHash(substring, id, this.input));
    });
  }
  hashRecipeAppliance(recipe, id){
    this.addToHash(recipe.appliance.toLowerCase(), id, this.appliances)
  }
  hashRecipeUstensils(recipe, id){
    recipe.ustensils.forEach(ustensil => {
      this.addToHash(ustensil.toLowerCase(), id, this.ustensils);
    });
  }

  /**
   * Ajoute une clé et/ou valeur à une table de hachage
   *
   * @param   {string}  key          La propriété cible
   * @param   {number}  id           L'id de la recette
   * @param   {Object}  destination  La table de hachage visée
   *
   * @return  {void}
   */
  addToHash(key, id, destination) {
    if(!destination[key]) destination[key] = [];
    if(destination[key].indexOf(id) == -1) destination[key].push(id);
  }

  /**
   * Découpe une chaîne en sous chaînes
   *
   * @param   {string}  string  La chaîne à découper
   * 
   * @return  {array}      [return description]
   */
  sliceString(string){
    let arrayOfSubstrings = [];
    let cleanString = this.cleanString(string);
    const words = cleanString.split(" ");
    words.forEach(word => {
      for (let i = 0; i < word.length; i++) {
          for (let j = i + 1; j < word.length + 1; j++) {
            let substring = word.slice(i, j);
            if (substring.length > 2) arrayOfSubstrings.push(substring);
          }
      }
    })
    return arrayOfSubstrings;
  }
  /**
   * Supprime la ponctuation et les nombres d'une chaine de caractères
   *
   * @return  {string}
   */
  cleanString(string) {
    const regex = /[!"#$%&'()*°+,-./:;<=>?@[\]^_`{|}~0123456789]/g;
    const result = string.replace(regex, ' ');

    return result;
  }

}