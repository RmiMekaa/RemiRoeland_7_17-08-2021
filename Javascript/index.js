import { recipes } from "./data.js";
import { Homepage } from "./homepage.js";
import { Research } from "./research.js";

/* @type {Array} */
recipes;
console.log(recipes);

// Création du DOM
const homepage = new Homepage();
homepage.createHomepage();

// Fonctionnalités de recherche
const research = new Research();
research.displayResults(recipes); //Par défaut, afficher toutes les recettes
research.mainSearch();

// Ferme les dropdown qui ne sont pas la cible du clic
const dropdowns = document.querySelectorAll('details');
dropdowns.forEach((targetDropdown) => {
  targetDropdown.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => {
      if (dropdown !== targetDropdown) dropdown.removeAttribute("open");
    });
  });
})










