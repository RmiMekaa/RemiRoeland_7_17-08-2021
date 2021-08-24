export class Dropdown {

  constructor(id, category, list, domTarget) {
    this.id = id; // ingredients || appliances || ustensils
    this.category = category; // ingrédients || appareils || ustensiles
    this.domTarget = domTarget;
    this.list = list;
    
    this.DOM = document.createElement('details');
    this.DOM.className = `dropdown ${this.id}-dropdown`;
    this.DOM.innerHTML = this.createHTML();
    domTarget.appendChild(this.DOM);

    this.dropdownTrigger();
    this.filterDropdownList();
    this.createTag();
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
                ${this.setList()}
              </ul>`;
  }

  /**
   * Convertit la liste en HTML
   * @return  {String}  HTML String
   */
  setList() {
    let html = '';
    this.list.forEach(item => { html += '<li>' + item + '</li>' });
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

  /**
   * Affiche les éléments de la liste correspondants à la recherche
   * @return  {void}  [return description]
   */
  filterDropdownList() {
    let listElements = this.DOM.querySelectorAll('li');
    document.addEventListener('keyup', function(e) {
      const searchString = e.target.value.toLowerCase();
      if (e.target.value.length > 2) {
        listElements.forEach(el => {
          if (!el.textContent.toLowerCase().includes(searchString)) el.style.display = 'none';
        })
      }
      else listElements.forEach(el => el.style.display = 'inline');
    })  
  }

  /**
   * Déplace l'élément de la liste dans la section tags au clic
   * @return  {void}
   */
  createTag() {
    const dropdown = this;
    const tagContainer = document.getElementById('tags-container');
    let listElements = this.DOM.querySelectorAll('li');
    listElements.forEach(el => el.addEventListener('click', function(){
      tagContainer.appendChild(el);
      el.className = 'tag';
      el.classList.add(`tag__${dropdown.id}`)
    }))
  }

}