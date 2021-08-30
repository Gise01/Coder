class Moldings {
  constructor (name, height, weight, price, type){
    this.name = name;
    this.height = parseFloat(height).toFixed(2);
    this.weight = parseFloat(weight).toFixed(2);
    this.price = parseFloat(price).toFixed(2);
    this.type = type;
    this.image = `img/${name} diseño.jpg`;
  }
  size() {
    return this.height*this.weight
  }
  description(){
    return `Placas de ${(this.height*100).toFixed(0)}x${(this.weight*100).toFixed(0)} (aproximadamente) decorativas, económicas, de fácil y rápida colocación. Elimina malos olores del ambiente, absorve la humedad evitando la formación de hongos y manchas.`
  }
}

export const plaques = []