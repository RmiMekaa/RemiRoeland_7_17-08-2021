import { recipes } from "./data.js";
import { Recipe } from "./recipe.js";

export class Research {

  /**
   * Affiche les recettes à partir du tableau donné en argument
   *
   * @param   {array}  array  Un tableau contenant des recettes
   *
   * @return  {String}  Le html à afficher
   */
  displayResults(array) {
    const recipesContainer = document.getElementById('recipes-container');
    let recipe;
    let html = "";
    for (let i = 0; i < array.length; i++) {
      recipe = new Recipe(array[i]);
      html += recipe.recipeCardHtml();
    }
    recipesContainer.innerHTML = html;
  }
  
  /**
   * Recherche si la chaine entrée dans la barre de recerche est présente dans une des recettes
   * @return  {void}  Affiche les résultats filtrés
   */
  mainSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase();
      if (e.target.value.length > 2) {
        const filteredRecipes = recipes.filter(recipe => {
          return (
            //recipe.ingredients[1].includes(searchString) ||
            recipe.name.toLowerCase().includes(searchString) ||
            recipe.description.toLowerCase().includes(searchString)
          )
        });
        console.log(filteredRecipes);
        this.displayResults(filteredRecipes);
      }
      if (e.target.value.length < 3) { // Si la saisie fait moins de deux caractères, réafficher toutes les recettes
        this.displayResults(recipes);
      }
    });
  }

}

//searchInDropdown() {
//  const applianceSearch = document.getElementById('search-appliance');
//  applianceSearch.addEventListener('keyup', (e) => {
//    let newList = "";
//    const searchString = e.target.value.toLowerCase();
//    const filteredList = appliancesArray.filter(appliance => {
//        return appliance.toLowerCase().includes(searchString) 
//    });
//    for (let i=0; i < filteredList.length; i++) {
//      newList += '<li>' + filteredList[i] + '</li>'
//    }
//    applianceListContainer.innerHTML = newList;
//    console.log(filteredList);
//  });
//}

// Appliance search
//const applianceSearch = document.getElementById('search-appliance');
//applianceSearch.addEventListener('keyup', (e) => {
//  let newList = "";
//  const searchString = e.target.value.toLowerCase();
//  const filteredList = appliancesArray.filter(appliance => {
//      return appliance.toLowerCase().includes(searchString) 
//  });
//  for (let i=0; i < filteredList.length; i++) {
//    newList += '<li>' + filteredList[i] + '</li>'
//  }
//  applianceListContainer.innerHTML = newList;
//  console.log(filteredList);
//});
