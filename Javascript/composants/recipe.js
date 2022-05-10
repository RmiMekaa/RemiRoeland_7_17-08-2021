export class Recipe {

  /**
   * @type {Object} un objet recette
   */
  data;

  /**
   * l'id de la recette
   * @type {number}
   */
  id;
  /**
   * Le nom du plat
   * @type {string}
   */
  name;
  /**
   * Le nombre de personnes
   * @type {number}
   */
  servings;
  /**
   * Les ingrédients de la recette
   * @type {Array}
   */
  ingredients;
  /**
   * La durée de la recette
   * @type {number}
   */
  time;
  /**
   * Les instructions pour la recette
   * @type {string}
   */
  description;
  /**
   * L'appareil requis pour la recette
   * @type {string}
   */
  appliance;
  /**
   * Les ustensiles requis pour la recette
   * @type {array}
   */
  ustensils;

  constructor(data, domTarget) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }

    this.DOM = document.createElement('article');
    this.DOM.className = 'recipe-card';
    this.DOM.innerHTML = this.recipeCardHtml;
    domTarget.appendChild(this.DOM);
  }

  /**
   * Génère la carte de la recette
   *
   * @return  {String}  HTML String
   */
  get recipeCardHtml() {
    return `
      <div class="recipe-image"></div>
      <div class="recipe-content">
          <div class="recipe-content__heading">
              <h2>${this.name}</h2>
              <span class="duration">${this.time} min</span>
          </div>
          <ul class="recipe-content__ingredients">
            ${this.ingredientsList()}
          </ul>
          <p class="recipe-content__instructions">${this.description}</p>
      </div>`;
  }

  /**
   * Génère la liste des ingrédients de la recette
   *
   * @return  {String}  HTML String
   */
  ingredientsList() {
    let list = "";
    for (let ingredient of this.ingredients) {
      if (ingredient.unit == "grammes") ingredient.unit = "g";

      if (!ingredient.quantity) list += `<li class="ingredient">${ingredient.ingredient}</li>`;
      else if (ingredient.quantity && !ingredient.unit) list += `<li class="ingredient">${ingredient.ingredient}: <span class="quantity">${ingredient.quantity}</span></li>`;
      else list += `<li class="ingredient">${ingredient.ingredient}: <span class="quantity">${ingredient.quantity}${ingredient.unit}</span></li>`;
    }
    return list;
  }

}