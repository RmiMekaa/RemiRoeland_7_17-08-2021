import { DataManager} from "./dataManager.js";
import { Dropdown } from "./composants/dropdown.js";
import { ResultsContainer } from "./composants/resultsContainer.js";
import { DropdownEventsHandler } from "./dropdownEventsHandler.js";
import { HashManager } from "./HashManager.js"

globalThis.hashManager = new HashManager();
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
  if (searchString.length < 3) return hashManager.resetResults(); 
  hashManager.pushMatchingRecipes('input', searchString);
  hashManager.manageResults();
})

globalThis.updateLists = function() {
  ingDrop.updateList();
  appDrop.updateList();
  ustDrop.updateList();
}













