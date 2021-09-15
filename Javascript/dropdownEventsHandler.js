export class DropdownEventsHandler {

  constructor(){
    this.outFocusClose();
    this.arrowClose();
  }

  /**
   * Évènements au clic sur un élément de la liste
   * @return  {void}
   */
  listOnClick(category, value) {
    globalThis.dataManager.addFilter(category, value);
    this.createTag(category, value);
  }

  /**
   * Créé un tag au dessus des dropdowns
   *
   * @param   {string}  category  La catégorie du tag
   * @param   {string}  string    Le texte du tag
   *
   * @return  {void}
   */
  createTag(category, string) {
    const tagContainer = document.getElementById('tags-container');
    let tag = document.createElement('li');
    tag.innerText = string;
    tag.className = 'tag';
    tag.classList.add(`tag__${category}`);
    tagContainer.appendChild(tag);
    tag.addEventListener('click', () => {
      this.tagOnClick(category, tag);
    })
  }

  /**
   * Évènements au clic sur un tag
   *
   * @param   {string}        category  La catégorie du tag
   * @param   {HTMLElement}   tag       L'élément sur lequel le clic a été effectué
   *
   * @return  {void}
   */
  tagOnClick(category, tag) {
    tag.remove();
    globalThis.dataManager.removeFilter(category, tag.textContent);  
  }

  /**
   * Affiche les éléments de la liste correspondants à la recherche
   * @return  {void}  [return description]
   */
  filterList() {
      const searchInput = this.DOM.querySelector('input');
      const listElements = this.DOM.querySelectorAll('li');
      searchInput.addEventListener('keyup', function () {
        const searchString = searchInput.value.toLowerCase();
        if (searchInput.value.length > 2) {
          listElements.forEach(el => {
            if (!el.textContent.toLowerCase().includes(searchString)) el.style.display = 'none';
          })
        }
        else listElements.forEach(el => el.style.display = 'inline');
      })
  }

  //----- Close Events -----------------------------------------------------

  /**
   * Ferme les dropdowns qui ne sont pas la cible du clic
   * @return  {void} 
   */
   outFocusClose() {
    const dropdowns = document.querySelectorAll('details');
    dropdowns.forEach((targetDropdown) => {
      targetDropdown.addEventListener("click", () => {
        dropdowns.forEach((dropdown) => {
          if (dropdown !== targetDropdown) {
            dropdown.removeAttribute("open");
            //dropdown.querySelector('summary').style.display = 'flex';
          }
        });
      });
    })
  }
  /**
   * Ferme le dropdown au clic sur la flèche
   * @return  {void} 
   */
  arrowClose() {
    let closeArrows = document.querySelectorAll('.arrow-up'); 
    closeArrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        arrow.closest('details').removeAttribute('open');
      })
    })
  }

}