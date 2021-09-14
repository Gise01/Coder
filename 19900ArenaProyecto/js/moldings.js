class Moldings {
  constructor (name, height, width, price, type){
    this.name = name;
    this.height = parseFloat(height).toFixed(2);
    this.width = parseFloat(width).toFixed(2);
    this.price = price;
    this.type = type;
    this.image = `img/${name} diseño.jpg`;
  }
  totalPrice(x) {
    return this.price*x;
  }
  description(){
    return `${this.type} de 1mts de largo decorativo, económicos, de fácil y rápida colocación. Otorga terminacion a tu cierlorraso o pared de manera sofisticada.`
  }
}

export const moldings = []

const moldura9 = new Moldings ("Moldura 9", 0.04, 0.05, 195, "Moldura");
const moldura13 = new Moldings ("Moldura 13", 0.04, 0.05, 195, "Moldura");
const friso1 = new Moldings ("Friso 1", 0.04, 0.01, 135, "Friso");
const friso2 = new Moldings ("Friso 2", 0.04, 0.01, 135, "Friso");

moldings.push(moldura9, moldura13, friso1, friso2);