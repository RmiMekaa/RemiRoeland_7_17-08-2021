import { Results } from "./composants/results.js";

export class Research {

  constructor(dataManager){
    this.dataManager = dataManager;
    this.recipes = dataManager.recipes;
    this.ingredientsList = dataManager.ingredients;
    this.appliancesList = dataManager.appliances;
    this.ustensilsList = dataManager.ustensils;

    this.results = this.recipes; //Par défaut, affichera toutes les recettes

    this.mainSearch();
  }
  
  /**
   * Recherche si la chaine entrée dans la barre de recherche est présente dans une des recettes et retourne un tableau
   * @return  {Array.<object>}
   */
  mainSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', () => {
      const searchString = searchBar.value.toLowerCase();
      if (searchBar.value.length > 2) {
        const filteredRecipes = this.recipes.filter(recipe => {
          return (
            //recipe.ingredients[1].includes(searchString) ||
            recipe.name.toLowerCase().includes(searchString) ||
            recipe.description.toLowerCase().includes(searchString)
          )
        });
        this.results = filteredRecipes;
      }
      else this.results = this.recipes;
      console.log('results :', this.results);
      new Results(this.results);
    });
  }

}



