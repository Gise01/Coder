class Adds {
  constructor (name, qty, price, performance, type){
    this.name = name;
    this.qty = qty
    this.price = parseFloat(price).toFixed(2);
    this.performance = performance;
    this.type = type;
    this.image = `img/${name}.jpg`;
  }
  performanceWalls(m) {
    return Math.ceil(m/this.performance)
  }
  description(){
    return `${this.name} ideal para la colocación de placas antihumedad. Evita la formacion de hongos. Presentación: bolsa de ${this.qty}kg. Rendimiento: ${this.performance}mts2`
  }
}

export const adds = [];

const adhesivo = new Adds ("Adhesivo", 30, 1100, 15, "Adhesivo");
const adh2e1 = new Adds ("2en1", 20, 1740, 15, "Adh - Sell");
const sellajuntas = new Adds ("Sellajuntas", 20, 1115, 25, "Sellajuntas");

adds.push(adhesivo, adh2e1, sellajuntas);