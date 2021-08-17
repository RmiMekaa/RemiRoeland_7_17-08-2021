import { recipes } from "./data.js";
import { Recipe } from "./recipe.js";

export class Research {

  /**
   * @type {Array.<object>} Un tableau contenant toutes les recettes
   */
  recipes;

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
    searchBar.addEventListener('keyup', () => {
      const searchString = searchBar.value.toLowerCase();
      if (searchBar.value.length > 2) {
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
      if (searchBar.value.length < 3) { // Si la saisie fait moins de deux caractères, réafficher toutes les recettes
        this.displayResults(recipes);
      }
    });
  }

  dropdownsSearch() {
    const page = this;
    document.addEventListener('keyup', function(e) {
      const searchString = e.target.value.toLowerCase();
      let element = e.target;
      let list;
      switch (element.id) {
        case 'search-ingredients':
          list = Array.from(document.querySelectorAll('#ingredients-list li'));
          break;
        case 'search-appliances':
          list = Array.from(document.querySelectorAll('#appliances-list li'));
          break;
        case 'search-ustensils':
          list = Array.from(document.querySelectorAll('#ustensils-list li'));
          break;      
        default:
          break;
      }
      if (e.target.value.length > 2) {
        const filteredItems = list.filter(item => {
          return (item.innerHTML.toLowerCase().includes(searchString))
        })
        console.log(filteredItems);
        page.createTag(filteredItems);

        return filteredItems;
      }  
    })  
  }

  createTag(items) {
    let html ='';
    items.forEach(element => {
      html += '<li>' + element.textContent + '</li>'     
    });
    console.log(html);
    document.getElementById('tagSection').innerHTML = html;

  }


}



