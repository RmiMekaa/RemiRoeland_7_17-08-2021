export class DropdownEventsHandler {

  constructor(){
    this.dropdowns = document.querySelectorAll('details');
    this.outFocusClose();
    this.arrowClose();
    this.searchInList();
  }

  /**
   * Évènements au clic sur un élément de la liste
   * @return  {void}
   */
  listClickEvents(category, value, dropdown) {
    dataManager.addFilter(category, value);
    dataManager.manageResults();
    this.createTag(category, value);
    dropdown.removeAttribute('open');
  }
  /**
   * Évènements au clic sur un tag
   *
   * @param   {string}        category  La catégorie du tag
   * @param   {HTMLElement}   el        L'élément sur lequel le clic a été effectué
   *
   * @return  {void}
   */
  tagClickEvents(category, el) {
    el.remove();
    dataManager.removeFilter(category, el.textContent);  
    dataManager.manageResults();
  }
  
  /**
   * Créé un tag et l'insère dans le DOM
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
      this.tagClickEvents(category, tag);
    })
  }

  /**
   * Affiche les éléments de la liste correspondants à la recherche
   * @return  {void}  [return description]
   */
  searchInList() {
    const searchInput = document.querySelectorAll('.dropdown input');
    searchInput.forEach(input => {
      input.addEventListener('keyup', function () {
        const searchString = input.value.toLowerCase();
        let list = input.closest('details').querySelectorAll('ul li');
        if (input.value.length > 0) {
          list.forEach(el => {
            if (!el.textContent.toLowerCase().includes(searchString)) el.style.display = 'none';
          })
          return;
        }
        list.forEach(el => el.style.display = 'inline');
      })
    })
  }

  /**
   * Ferme les dropdowns si un clic en dehors est détecté
   * @return  {void} 
   */
  outFocusClose() {
    const dropdowns = document.querySelectorAll('details');
    window.addEventListener('click', function(e) {
      dropdowns.forEach(dropdown => {
        if (dropdown.hasAttribute('open') && !dropdown.contains(e.target)) {
          dropdown.removeAttribute('open')
        }
      })
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