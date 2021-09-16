import { DataManager} from "./dataManager.js";
import { Dropdown } from "./composants/dropdown.js";
import { ResultsContainer } from "./composants/resultsContainer.js";
import { DropdownEventsHandler } from "./dropdownEventsHandler.js";

globalThis.dataManager = new DataManager();
globalThis.resultsContainer = new ResultsContainer();

// Création des dropdowns ↓
const dropdownsContainer = document.getElementById('dropdowns-container')
const ingDrop = new Dropdown("ingredients", dropdownsContainer);
const appDrop = new Dropdown("appliances", dropdownsContainer);
const ustDrop = new Dropdown("ustensils", dropdownsContainer);

globalThis.dropdownEventsHandler = new DropdownEventsHandler();

// Main Search input
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', () => {
  if (searchBar.value.length < 3) {
    dataManager.removeFilter('text', null);
    globalThis.resultsContainer.displayResults(dataManager.recipes);
  }
  else {
    let searchString = searchBar.value.toLowerCase();
    dataManager.addFilter('text',searchString);
  }
  dataManager.sort();
})

globalThis.updateLists = function() {
  ingDrop.updateList();
  appDrop.updateList();
  ustDrop.updateList();
}












