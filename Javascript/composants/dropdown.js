export class Dropdown {

  constructor(category, list, domTarget, results, dataManager) {
    this.category = category; // ingredients || appliances || ustensils
    this.list = list; // la liste correspondant à la catégorie
    this.domTarget = domTarget; // la cible où injecter le dropdown
    this.results = results; // Une référence à l'instance results
    this.dataManager = dataManager; // Une référence à l'instance dataManager

    this.categorie = this.translate(category); // Le nom de la catégorie en français

    this.DOM = document.createElement('details');
    this.DOM.className = `dropdown ${this.category}-dropdown`;
    this.DOM.innerHTML = this.createHTML();
    domTarget.appendChild(this.DOM);

    this.dropdownTrigger();
    this.filterList();
    this.listOnClick();
    this.closeDropdown();
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
      case 'appliances' : translation = 'appareils';   break;
      case 'ustensils'  : translation = 'ustensiles';  break;
    }
    return translation;
  }

  /**
   * Créé le html des dropdowns
   *
   * @return  {String}  HTML String
   */
  createHTML() {
    return `<summary>${this.categorie}<img src="./ressources/Arrow.png"></summary>
              <div class="dropdown-search-section">
                <input id="search-${this.category}" type="text" placeholder="Recherche un ${this.categorie.substring(0, this.categorie.length - 1)}">
                <img class="arrow-up" src="./ressources/Arrow.png">
              </div>
              <ul id="${this.category}-list" class="dropdown-list">
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
   * Affiche les éléments de la liste correspondants à la recherche
   * @return  {void}  [return description]
   */
  filterList() {
    const searchInput = this.DOM.querySelector('input');
    const listElements = this.DOM.querySelectorAll('li');
    searchInput.addEventListener('keyup', function() {
      const searchString = searchInput.value.toLowerCase();
      if (searchInput.value.length > 2) {
        listElements.forEach(el => {
          if (!el.textContent.toLowerCase().includes(searchString)) el.style.display = 'none';
        })
      }
      else listElements.forEach(el => el.style.display = 'inline');
    })  
  }

  /**
   * Au clic, ajoute le filtre et créé le tag correspondant
   * @return  {void}
   */
  listOnClick() {
    const dropdown = this;
    let listElements = this.DOM.querySelectorAll('li');
    listElements.forEach(el => el.addEventListener('click', function(){
      el.style.display = 'none';
      dropdown.dataManager.addFilter(dropdown.category, el.textContent);
      dropdown.createTag(el.textContent);
    }));
  }

  /**
   * Créé un élément li dans le conteneur de tags
   *
   * @return  {void} 
   */
  createTag(string) {
    const tagContainer = document.getElementById('tags-container');
    let tag = document.createElement('li');
    tag.innerText = string;
    tag.className = 'tag';
    tag.classList.add(`tag__${this.category}`);
    tagContainer.appendChild(tag);
    tag.addEventListener('click', () =>{
      this.tagOnClick(tag);
    })
  }
  /**
   * Supprime le tag de la section et le réaffiche dans la liste du dropdown
   * @param   {HTMLElement}  tag  le tag à supprimer
   * @return  {void}
   */
  tagOnClick(tag) {
    tag.remove();
    this.dataManager.removeFilter(this.category, tag.textContent);
    let dropdownList = this.DOM.querySelectorAll('li');
    dropdownList.forEach(li => {
      if (li.textContent == tag.textContent) li.style.display = 'inline'; return;
    })
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
          if (dropdown !== targetDropdown) {
            dropdown.removeAttribute("open");
            dropdown.querySelector('summary').style.display = 'flex';
          }
        });
      });
    })
  }
  closeDropdown() {
    let dropdown = this.DOM;
    let closeArrow = this.DOM.querySelector('.arrow-up');
    let summary = this.DOM.querySelector('summary')
    closeArrow.addEventListener('click', function() {
      dropdown.removeAttribute('open');
      summary.style.display = 'flex';
    })
  }

}