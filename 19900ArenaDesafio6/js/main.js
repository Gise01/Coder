class Plaques {
  constructor (name, height, weight, price){
    this.name = name;
    this.height = parseInt(height)/100;
    this.weight = parseInt(weight)/100;
    this.price = parseFloat(price);
  }
  size() {
    return this.height*this.weight
  }
}

class Walls {
  constructor (height, weight){
    this.height = parseFloat(height);
    this.weight = parseFloat(weight);
  }
  cover(){
    return this.height*this.weight
  }
}

const products = []

const pielNaranja = new Plaques ("Piel Naranja", 60, 60, 280);
const sol = new Plaques ("Sol", 60, 60, 280);
const solMarco = new Plaques ("Sol con Marco", 60, 60, 280);
const ubeda = new Plaques ("Ubeda", 60, 60, 280);
const mediterraneo = new Plaques ("Mediterraneo", 60, 60, 280);
const liso = new Plaques ("Liso", 60, 60, 280);
const travertino = new Plaques ("Travertino", 30, 60, 175);
const piedra = new Plaques ("Piedra", 30, 60, 175);
const pizarra = new Plaques ("Pizarra", 56, 56, 335);
const ladrillo = new Plaques ("Ladrillo", 56, 56, 335);
const alicante = new Plaques ("Alicante", 60, 60, 335);

products.push(pielNaranja, sol, solMarco, ubeda, mediterraneo, liso, travertino, piedra, pizarra, ladrillo, alicante);

let quantity = 0;

const walls = []

do {
  quantity = parseInt(prompt("Cuantas paredes necesita cubrir?"));
} while (!quantity || quantity < 1);
  
if (quantity) {
  for (i = 1; i <= quantity; i++){
     do {
       height = prompt(`Cual es el alto de su pared ${i}?`);
       weight = prompt(`Cual es el ancho de su pared ${i}?`);
     } while ((!height || !weight) || (height<=0 || weight<=0));
     walls.push(new Walls (height, weight));
  }
} 

let model = 0

function models () {
  do {
    model = parseInt(prompt(`Indique el modelo de placa que necesita según las siguientes opciones: 1) 60x60 \n2) 28x56 \n3) 56x56`));
  } while (!model);

  switch (model) {
    case 1:
      model = pielNaranja;
      break;
    case 2:
      model = piedra;
      break;
    case 3:
      model = pizarra;
      break;
    default:
      alert("Por favor debe solo indicar 1 o 2 o 3 según corresponda");
    }
  }

  do { 
    models();
  } while (!model || model < 0 || model > 3);

  let totalCover = 0;
  
  for (i=0; i < walls.length ; i++){
    totalCover += walls[i].cover();
  }
  
  let unit = Math.ceil(totalCover/model.size());
  let totalPrice = unit * model.price;

  alert (`Para cubrir la/las ${walls.length} pared/es indicadas con el modelo ${model.name}, Ud requiere de ${unit} placas y debe abonar $${totalPrice}` )


