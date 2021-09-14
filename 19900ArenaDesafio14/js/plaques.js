class Plaques {
  constructor (name, height, width, price, type){
    this.name = name;
    this.height = parseFloat(height).toFixed(2);
    this.width = parseFloat(width).toFixed(2);
    this.price = parseFloat(price).toFixed(2);
    this.type = type;
    this.image = `img/${name} ${type}.jpg`;
  }
  size() {
    return (this.height*this.width).toFixed(2);
  }
  description(){
    return `Placas de ${this.type} ${(this.height*100).toFixed(0)}x${(this.width*100).toFixed(0)} (aproximadamente) decorativas, económicas, de fácil y rápida colocación. Elimina malos olores del ambiente, absorve la humedad evitando la formación de hongos y manchas.`
  }
}

export const plaques = []

const pielNaranja = new Plaques ("Piel Naranja", 0.60, 0.60, 280, "revestimiento");
const sol = new Plaques ("Sol", 0.60, 0.60, 280, "revestimiento");
const solMarco = new Plaques ("Sol con Marco", 0.60, 0.60, 280, "revestimiento");
const ubeda = new Plaques ("Ubeda", 0.60, 0.60, 280, "revestimiento");
const mediterraneo = new Plaques ("Mediterraneo", 0.60, 0.60, 280, "revestimiento");
const liso = new Plaques ("Liso", 0.60, 0.60, 280, "revestimiento");
const travertino = new Plaques ("Travertino", 0.28, 0.56, 175, "revestimiento");
const piedra = new Plaques ("Piedra", 0.28, 0.56, 175, "revestimiento");
const pizarra = new Plaques ("Pizarra", 0.56, 0.56, 335, "revestimiento");
const ladrillo = new Plaques ("Ladrillo", 0.56, 0.56, 335, "revestimiento");
const alicante = new Plaques ("Alicante", 0.60, 0.60, 335, "revestimiento");
const solGrueso = new Plaques ("Sol", 0.60, 0.60, 335, "cielorraso");
const mediterraneoGrueso = new Plaques ("Mediterraneo", 0.60, 0.60, 335, "cielorraso");
const alicanteGrueso = new Plaques ("Alicante", 0.60, 0.60, 335, "cielorraso");

plaques.push(pielNaranja, sol, solMarco, ubeda, mediterraneo, liso, travertino, piedra, pizarra, ladrillo, alicante, solGrueso, mediterraneoGrueso, alicanteGrueso);
