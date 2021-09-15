import { DataManager} from "./dataManager.js";
import { Dropdown } from "./composants/dropdown.js";
import { ResultsContainer } from "./composants/resultsContainer.js";
import { DropdownEventsHandler } from "./dropdownEventsHandler.js";

const resultsContainer = new ResultsContainer();
globalThis.dataManager = new DataManager(resultsContainer);

// Création des dropdowns ↓
const dropdownsContainer = document.getElementById('dropdowns-container')
const ingDrop = new Dropdown("ingredients", dropdownsContainer);
const appDrop = new Dropdown("appliances", dropdownsContainer);
const ustDrop = new Dropdown("ustensils", dropdownsContainer);

globalThis.dropdownEventsHandler = new DropdownEventsHandler();

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

globalThis.update = function() {
  ingDrop.updateList();
  appDrop.updateList();
  ustDrop.updateList();
}










