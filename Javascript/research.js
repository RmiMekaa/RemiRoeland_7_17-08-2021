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

  // addTag() {
  //   let tags = document.querySelectorAll('.dropdown li');
  //   tags.forEach(tag => tag.addEventListener('click', function() {
  //     if (this.dataManager.filters.indexOf(tag.textContent) == -1) this.dataManager.filters.push(tag.textContent);
  //     else this.dataManager.filters.splice(this.dataManager.filters.indexOf(tag.textContent), 1)
  //     console.log(this.dataManager.filters);
  //   }))
  // }
  
  // /**
  //  * @param   {Array}  items   
  //  * @param   {String}  category  [category description]
  //  *
  //  * @return  {void}   Créé le tag et l'insère dans le DOM
  //  */
  // createTag(items, category) {
  //   items.forEach(element => {
  //     let tag = document.createElement('li');
  //     tag.innerText = element.textContent;
  //     tag.className = 'tag';

  //     switch(category) {
  //       case 'ingredient': tag.classList.add('tag__ingredient'); break;
  //       case 'appliance':  tag.classList.add('tag__appliance');  break;
  //       case 'ustensil':   tag.classList.add('tag__ustensil');
  //     }
  //     document.getElementById('tagSection').appendChild(tag);   
  //   });

  // }

}



