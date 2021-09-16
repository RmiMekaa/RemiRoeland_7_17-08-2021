import { recipes } from "./data.js";
  
  export class HashManager {

  constructor() {
    this.recipes = recipes;
    this.recettes = {};
    this.hash_input = {}
    this.hash_ingredients = {}
    this.hash_appliances = {}
    this.hash_ustensils = {}
    this.results_tags = [];
    this.results = [];  

    this.recipes.forEach(recipe => {
      this.makeHashsTables(recipe)
      })

    console.log(this.hash_input);
    console.log(this.hash_ustensils);
    console.log(this.hash_ingredients);
    console.log(this.hash_appliances);
  }

  makeHashsTables(recipe){
    let id = recipe.id;
    this.recettes["recette_"+id] = recipe;
    // Hash name
    this.hashFromString(recipe.name, id, this.hash_input);
    // Hash Description
    this.hashFromString(recipe.description, id, this.hash_input);
    // Hash Ustensils
    recipe.ustensils.forEach(ustensil => {
      this.addToHash(ustensil.toLowerCase(), id, this.hash_ustensils);
    });
    // Hash ingredients
    recipe.ingredients.forEach(ingredient => {
      this.addToHash(ingredient.ingredient.toLowerCase(), id, this.hash_ingredients)
    });
    // Hash Appliance
    this.addToHash(recipe.appliance.toLowerCase(), id, this.hash_appliances)
  }


  hashFromString(string, id, destination){
    let cleanString = this.removePunctuation(string);
    const words = cleanString.split(" ");
    words.forEach(word => {
      if (word.length > 3) {
        for(let i = 3; i < word.length; i++){
          this.addToHash(word.slice(i), id, destination);
        }  
      }
    });
  }
   

  addToHash(key, id, destination) {
    if(!destination[key]) destination[key] = [];
    destination[key].push(id);
  }

  removePunctuation(string) {
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const result = string.replace(regex, '');

    return result;
  }

//to do suppression doublons avec new set
}