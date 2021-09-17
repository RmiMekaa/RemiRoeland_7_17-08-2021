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

  // getIngredientsList() {
  //   let array = [];
  //   this.results.forEach(recipe => {
  //     recipe.ingredients.forEach(ingredient => {
  //       if (array.indexOf(ingredient.ingredient) == -1 && this.filters.ingredients.indexOf(ingredient.ingredient.toLowerCase()) == -1) array.push(ingredient.ingredient);       
  //     });
  //   });
  //   return array
  // }
  // getAppliancesList() {
  //   let array = [];
  //   this.results.forEach(recipe => {
  //     if (array.indexOf(recipe.appliance) == -1 && this.filters.appliances.indexOf(recipe.appliance.toLowerCase()) == -1) array.push(recipe.appliance);       
  //   });
  //   return array;
  // }
  // getUstensilsList() {
  //   let array = [];
  //   this.results.forEach(recipe => {
  //     recipe.ustensils.forEach(ustensil => {
  //       if (array.indexOf(ustensil) == -1 && this.filters.ustensils.indexOf(ustensil.toLowerCase()) == -1) array.push(ustensil);       
  //     });
  //   });
  //   return array
  // }
  
  //----- Affichage des résultats ---------------------------------------------------------------------------------------------

  displayResults() {
    console.log('filters :', this.filters);
    console.log('results :', this.results);
    globalThis.resultsContainer.displayResults(this.results);
    globalThis.updateLists();
  }

  //----- Tri -----------------------------------------------------------------------------------------------------------------

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

  //----- Ajout/Retrait filtres ----------------------------------------------------------------------------------------------------
  
  /**
   * Ajoute le filtre au tableau filters
   * @param   {String}  type   La catégorie du filtre (ingredients || appliances || ustensils)
   * @param   {String}  value  Le filtre à ajouter
   * @return  {void} 
   */
  addFilter(type, value){
    if (type == 'text') this.filters.text = value.toLowerCase();
    else this.filters[type].push(value.toLowerCase());
    console.log(this.filters);
    //this.sort();
    //this.displayResults();
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
    //this.sort();
    //this.displayResults();
  }

  getHashTables(){
    globalThis.hashManager.hash_ingredients

  }

}
