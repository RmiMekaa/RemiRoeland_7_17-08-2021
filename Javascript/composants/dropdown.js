export class Dropdown {

  constructor(category, domTarget) {
    this.category = category; // ingredients || appliances || ustensils
    this.domTarget = domTarget; // la cible où injecter le dropdown
    this.categorie = this.translate(category); // Le nom de la catégorie en français

    this.DOM = document.createElement('details');
    this.DOM.className = `dropdown ${this.category}-dropdown`;
    this.DOM.innerHTML = this.dropdownHTML;
    domTarget.appendChild(this.DOM);

    this.setDropdownList();
    this.addListener();
  }

  /**
   * Créé le html des dropdowns
   *
   * @return  {String}  HTML String
   */
  get dropdownHTML() {
    return `<summary>${this.categorie}<img src="./ressources/Arrow.png" alt="ouvrir la liste"></summary>
            <div class="dropdown-search-section">
              <input id="search-${this.category}" type="text" placeholder="Recherche un ${this.categorie.substring(0, this.categorie.length - 1)}">
              <img class="arrow-up" src="./ressources/Arrow.png" alt="fermer la liste">
            </div>
            <ul id="${this.category}-list" class="dropdown-list"></ul>`;
  }

  /**
   * créé et insère les éléments <li> dans les dropdowns
   * @return  {void}
   */
  setDropdownList() {
    let ul = this.DOM.querySelector('.dropdown-list');
    ul.innerHTML = '';
    let list;
    let html ='';
    switch (this.category) {
      case 'ingredients': list = globalThis.dataManager.getIngredientsList(); break;
      case 'appliances': list = globalThis.dataManager.getAppliancesList(); break;
      case 'ustensils': list = globalThis.dataManager.getUstensilsList();
    }
    list.forEach(item => {
      let listItem = '<li>' + item + '</li>';
      ul.innerHTML += listItem;
    });
  }

  /**
   * Ajoute un écouteur au clic sur un élément de liste
   *
   * @return  {void} 
   */
  addListener() {
    let list = this.DOM.querySelectorAll('.dropdown-list li');
    list.forEach(listItem => {
      listItem.addEventListener('click', () => globalThis.dropdownEventsHandler.listClickEvents(this.category, listItem.textContent))
    })
  }

  /**
   * Met à jour les listes des dropdowns
   *
   * @return  {void}  
   */
  updateList() {
    this.setDropdownList();
    this.addListener();
  }

  /**
   * Traduit le nom de la categorie en français
   * @param   {String}  category  Le nom de la catégorie en anglais
   * @return  {String}  Le nom de la catégorie en français
   */
  translate(category) {
    let translation;
    switch (category) {
      case 'ingredients': translation = 'ingrédients'; break;
      case 'appliances': translation = 'appareils'; break;
      case 'ustensils': translation = 'ustensiles'; break;
    }
    return translation;
  }

}