export class Recipe {

  /**
   * @type {array} un tableau contenant les recettes
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

  constructor(data) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  /**
   * Génère la carte de la recette
   *
   * @return  {String}  HTML String
   */
  recipeCardHtml() {
    return `
            <article class="recipe-card">
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
                </div>
            </article>
            `;
  }

  /**
   * Génère la liste des ingrédients de la recette
   *
   * @return  {String}  HTML String
   */
  ingredientsList() {
    let list = "";
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].unit == "grammes") this.ingredients[i].unit = "g";

      if (!this.ingredients[i].quantity) list += `<li class="ingredient">${this.ingredients[i].ingredient}</li>`;
      else if (this.ingredients[i].quantity && !this.ingredients[i].unit) list += `<li class="ingredient">${this.ingredients[i].ingredient}: <span class="quantity">${this.ingredients[i].quantity}</span></li>`;
      else list += `<li class="ingredient">${this.ingredients[i].ingredient}: <span class="quantity">${this.ingredients[i].quantity}${this.ingredients[i].unit}</span></li>`;
    }
    return list;
  }

}