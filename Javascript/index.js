import { DataManager} from "./dataManager.js";
import { Dropdown } from "./composants/dropdown.js";
import { ResultsContainer } from "./composants/resultsContainer.js";

const resultsContainer = new ResultsContainer();
const dataManager = new DataManager(resultsContainer);

// Création des dropdowns ↓
const dropdownsContainer = document.getElementById('dropdowns-container')
const ingDrop = new Dropdown("ingredients", dropdownsContainer, dataManager);
const appDrop = new Dropdown("appliances", dropdownsContainer, dataManager);
const ustDrop = new Dropdown("ustensils", dropdownsContainer, dataManager);

// Par defaut afficher toutes les recettes ↓
resultsContainer.displayResults(dataManager.results);

// Main Search input
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', () => {
  if (searchBar.value.length < 3) {
    dataManager.removeFilter('text', null);
    resultsContainer.displayResults(dataManager.recipes);
  }
  else {
    let searchString = searchBar.value.toLowerCase();
    dataManager.addFilter('text',searchString);
  }
  dataManager.sort();
})










