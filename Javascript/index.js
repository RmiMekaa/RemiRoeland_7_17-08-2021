import { Dropdown } from "./composants/dropdown.js";
import { ResultsContainer } from "./composants/resultsContainer.js";
import { DropdownEventsHandler } from "./dropdownEventsHandler.js";
import { DataManager } from "./dataManager.js"

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
  let searchString = searchBar.value.toLowerCase();
  if (searchString.length < 3) dataManager.filters.input = []; 
  else dataManager.addFilter('input', searchString);

  dataManager.manageResults();
})

globalThis.updateLists = function() {
  ingDrop.updateList();
  appDrop.updateList();
  ustDrop.updateList();
}













