import { DataManagerV2 } from "./dataManagerV2.js";
import { DataManagerV1 } from "./dataManagerV1.js";

const settings = {
  filters: {
    input:["choco"],
    appliances: ["four"],
    ustensils: ["casserole"],
    ingredients: ["beurre"]
  },
  repetitions: 1000
}

window.onload = ()=>{
  const testBtn = document.createElement("button");
  testBtn.innerText = "lancer le test";
  testBtn.onclick = () => new Comparatif(settings);
  document.body.appendChild(testBtn);
}

class Comparatif {
  constructor(settings) {
    this.settings = settings;
    this.algoV2  = new DataManagerV2();
    this.algoV1 = new DataManagerV1();

    this.algoV1.filters = this.settings.filters;
    this.algoV2.filters = this.settings.filters;

    this.compare()
  }

  compare(){
    let tpsAlgo = 0;
    let tpsAlgoV1 = 0;
    let debut;
    for(let i=0; i< this.settings.repetitions; i++){
      debut = Date.now();
      this.algoV1.getResults();
      tpsAlgoV1 += Date.now() - debut;
      debut = Date.now();
      this.algoV2.getResults();
      tpsAlgo += Date.now() - debut;
    }
  
    document.body.appendChild(this.showResult(this.settings.repetitions, "original", tpsAlgoV1));
    document.body.appendChild(this.showResult(this.settings.repetitions, "amélioré", tpsAlgo));
  
  
  }
  
   showResult(repetitions, text, tps){
    const DOM = document.createElement("div");
    DOM.innerHTML = `<h2>algo ${text}</h2>
    <p>pour ${repetitions} itérations, il faut ${tps} milisecondes</p>
    `;
    return DOM;
  
  }
  
  addFilters(iteration, text){
    console.log("...", text)
    this.addElementFilter(iteration, "appliance", this.settings.appliances);
    this.addElementFilter(iteration, "ustensils", this.settings.ustensils);
    this.addElementFilter(iteration, "ingredients", this.settings.ingredients);
  }
  
  addElementFilter(iteration, type, list){
    list.forEach(element => {
      iteration.addFilter(type, element);
    });
  }
}