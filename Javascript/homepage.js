/* Créé la page d'accueil */

import { Dropdown } from "./dropdown.js";

export class Homepage {

  createHomepage() {

    // Création du header
    const header = document.createElement('header');
    const a = document.createElement('a');
    a.href = "index.html";
    const logo = document.createElement('img');
    logo.src = "ressources/Logo.png";
    logo.alt = "logo";
    const heading = document.createElement('h1');
    heading.innerText = "Les petits plats";

    a.appendChild(logo);
    a.appendChild(heading);
    header.appendChild(a);
    document.body.appendChild(header);

    // Création main
    const main = document.createElement('main');
    document.body.appendChild(main);

    // Création de la barre de recherche
    const label = document.createElement('label');
    label.setAttribute('for', 'search-field');
    label.className = 'search-section';
    const input = document.createElement('input');
    input.setAttribute('type', 'search');
    input.setAttribute('id', 'searchBar');
    input.setAttribute('placeholder', 'Rechercher un ingrédient, appareil, ustensiles ou une recette');
    const icon = document.createElement('i');
    icon.className = 'search-icon fas fa-search';

    label.appendChild(input);
    label.appendChild(icon);
    main.appendChild(label);

    // Création conteneur des tags

    const tagSection = document.createElement('div');
    tagSection.setAttribute('id', 'tagSection');
    main.appendChild(tagSection);

    // Création dropdowns
    const ingredientsDropdown = new Dropdown("ingredients", "ingrédients");
    const appliancesDropdown = new Dropdown("appliances", "appareils");
    const ustensilesFullList = new Dropdown("ustensils", "ustensiles");

    const dropdownsContainer = document.createElement('div');
    dropdownsContainer.className = "dropdowns-container";
    main.appendChild(dropdownsContainer);

    dropdownsContainer.innerHTML = ingredientsDropdown.createHTML() +
      appliancesDropdown.createHTML() +
      ustensilesFullList.createHTML();

    // Création de la section recettes
    const recipesContainer = document.createElement('section');
    recipesContainer.setAttribute("id", "recipes-container");
    main.appendChild(recipesContainer);
  }

}