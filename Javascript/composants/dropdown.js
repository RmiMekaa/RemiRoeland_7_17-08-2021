export class Dropdown {

  constructor(id, category, dataManager, domTarget) {
    this.id = id; // ingredients || appliances || ustensils
    this.category = category; // Ingrédients || Appareils || Ustensiles
    this.dataManager = dataManager;
    this.domTarget = domTarget;

    // TO DO : Filtrer les listes dans les dropdowns
    // this.ingFilters = [];
    // this.appFilters = [];
    // this.ustFilters = [];
    
    this.DOM = document.createElement('details');
    this.DOM.className = `dropdown ${this.id}-dropdown`;
    this.DOM.innerHTML = this.createHTML();
    domTarget.appendChild(this.DOM);

    this.dropdownTrigger();
  }

  /**
   * Créé le html des dropdowns
   *
   * @return  {String}  HTML String
   */
  createHTML() {
    return `<summary>${this.category}<img src="./ressources/Arrow.png"></summary>
              <div class="dropdown-search-section">
                <input id="search-${this.id}" type="text" placeholder="Recherche un ${this.category.substring(0, this.category.length - 1)}">
                <img class="arrow-up" src="./ressources/Arrow.png">
              </div>
              <ul id="${this.id}-list" class="dropdown-list">
                ${this.setList(this.id)}
              </ul>`;
  }

  /**
   * Retourne la liste voulue au format HTML
   *
   * @param   {string}  category  la catégorie souhaitée
   *
   * @return  {string}  HTML String
   */
  setList(category) {
    let html = '';
    let list = [];
    switch (category) {
      case 'ingredients': 
        list = this.dataManager.getFullList("ingredients");
        list.forEach(item => { html += '<li class="list-ingredient">' + item + '</li>' });
        break;
      case 'appliances':
        list = this.dataManager.getFullList("appliances");
        list.forEach(item => { html += '<li class="list-appliance">' + item + '</li>' });
        break;
      case 'ustensils': 
        list = this.dataManager.getFullList("ustensils");
        list.forEach(item => { html += '<li class="list-ustensil">' + item + '</li>' });
        break;
    }
    return html;
  }

  /**
   * Ferme les dropdowns qui ne sont pas la cible du clic
   * @return  {void} 
   */
  dropdownTrigger() {
    const dropdowns = document.querySelectorAll('details');
    dropdowns.forEach((targetDropdown) => {
    targetDropdown.addEventListener("click", () => {
      dropdowns.forEach((dropdown) => {
        if (dropdown !== targetDropdown) dropdown.removeAttribute("open");
        });
      });
    })
  }

}