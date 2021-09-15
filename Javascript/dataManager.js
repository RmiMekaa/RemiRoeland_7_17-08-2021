import { recipes } from "./data.js";

export class DataManager {

  /**
   * @param   {Object}  resultsContainer  Une référence à l'objet resultsContainer
   *
   * @constructor
   */
  constructor(resultsContainer) {
    this.resultsContainer = resultsContainer;
    this.recipes = recipes; 
    
    this.filters = {
      text : "",
      appliances : [],
      ustensils: [],
      ingredients : []
    };

    this.results = this.recipes; // Stocke les résultats actuellement affichés
  }

  //----- Récupération listes dropdown ------------------------------------------------------------------------------------------

  getIngredientsList() {
    let array = [];
    this.results.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (array.indexOf(ingredient.ingredient) == -1) array.push(ingredient.ingredient);       
      });
    });
    return array
  }
  getAppliancesList() {
    let array = [];
    this.results.forEach(recipe => {
      if (array.indexOf(recipe.appliance) == -1) array.push(recipe.appliance);       
    });
    return array;
  }
  getUstensilsList() {
    let array = [];
    this.results.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        if (array.indexOf(ustensil) == -1) array.push(ustensil);       
      });
    });
    return array
  }
  
  //----- Affichage des résultats ---------------------------------------------------------------------------------------------

  displayResults() {
    console.log(this.filters);
    console.log(this.results);
    this.resultsContainer.displayResults(this.results);

    //TO DO: update dropdown list
  }

  //----- Tri -----------------------------------------------------------------------------------------------------------------

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

    this.displayResults();
  }

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
    this.sort();
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
  }

  //------ Recherche via l'input -------------------------------------------------------------------------------------------------
  
  sortByInput() {
    let arr1 = this.sortIngByText(this.recipes);
    let arr2 = this.sortByName(this.recipes);
    let arr3 = this.sortByDesciption(this.recipes);

    let recipesFilteredByText = arr1.concat(arr2, arr3)
    recipesFilteredByText = [...new Set(recipesFilteredByText)];

    return recipesFilteredByText;
  }

  //------ Recherche par catégorie -------------------------------------------------------------------------------------------

  sortIngByText(array) {
    let arr = [];
    array.forEach(recipe => {
     recipe.ingredients.forEach(ingredient => {
       if (ingredient.ingredient.toLowerCase().includes(this.filters.text) && arr.indexOf(recipe) == -1) arr.push(recipe);
     });
    })
    return arr;
 
  }
  // sortByIngredients(array) {
  //   let arr = [];
  //   array.forEach(recipe => {
  //    recipe.ingredients.forEach(ingredient => {
  //      if (this.filters.ingredients.includes(ingredient.ingredient.toLowerCase()) && arr.indexOf(recipe) == -1) arr.push(recipe);
  //    });
  //   })
  //   return arr;
  // }
  sortByAppliance(array) {
    let arr = [];
    array.forEach(recipe => {
      if (this.filters.appliances.includes(recipe.appliance.toLowerCase()) && arr.indexOf(recipe) == -1) arr.push(recipe);
    })
    return arr;
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
    let arr = [];
    array.forEach(recipe => {
      if (recipe.name.toLowerCase().includes(this.filters.text)) arr.push(recipe)
    })
    return arr;
  }
  sortByDesciption(array) {
    let arr = [];
    array.forEach(recipe => {
      if (recipe.description.toLowerCase().includes(this.filters.text)) arr.push(recipe)
    })
    return arr;
  }

  //-------------------------------------------------------------------------------------------------------------------------

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

}
