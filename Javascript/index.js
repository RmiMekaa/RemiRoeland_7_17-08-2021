import { Research } from "./research.js";
import { DataManager} from "./dataManager.js";
import { Dropdown } from "./composants/dropdown.js";
import { SearchInput } from "./composants/searchInput.js";
import { Results } from "./composants/results.js";

const dataManager = new DataManager();

// Création du DOM - Section recherche
let searchSection = document.querySelector('section');
new SearchInput(dataManager, searchSection);
let tagContainer = document.createElement('div');
tagContainer.setAttribute('id', 'tags-container')
searchSection.appendChild(tagContainer);
let dropdownsContainer = document.createElement('div');
dropdownsContainer.setAttribute('id', 'dropdowns-container');
searchSection.appendChild(dropdownsContainer);
new Dropdown("ingredients", dataManager.ingredients, dropdownsContainer);
new Dropdown("appliances", dataManager.appliances, dropdownsContainer);
new Dropdown("ustensils", dataManager.ustensils, dropdownsContainer);

// Création du DOM - Section résultats
let main = document.getElementsByTagName('main')[0];
let resultsContainer = document.createElement('section');
resultsContainer.setAttribute('id', 'recipes-container');
main.appendChild(resultsContainer);
new Results(dataManager.recipes);

// Fonctionnalités de recherche
new Research(dataManager);











