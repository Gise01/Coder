class Plaques {
  constructor (name, height, weight, price){
    this.name = name;
    this.height = height/100;
    this.weight = weight/100;
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
const travertino = new Plaques ("Travertino", 28, 56, 175);
const piedra = new Plaques ("Piedra", 28, 56, 175);
const pizarra = new Plaques ("Pizarra", 56, 56, 335);
const ladrillo = new Plaques ("Ladrillo", 56, 56, 335);
const alicante = new Plaques ("Alicante", 60, 60, 335);

products.push(pielNaranja, sol, solMarco, ubeda, mediterraneo, liso, travertino, piedra, pizarra, ladrillo, alicante);

let quantity = 0;

const walls = []

do {
  quantity = parseInt(prompt("Cuantas paredes necesita cubrir?"));
} while (!quantity || quantity < 1);
  
//let height = 0;
//let weight = 0;

for (let i = 1; i <= quantity; i++){  
  do {
    height = parseFloat(prompt(`Cual es el alto de su pared ${i} en mts?`));
    weight = parseFloat(prompt(`Cual es el ancho de su pared ${i} en nts?`));
    if ((!height || !weight) || (height<=0 || weight<=0)) {
      alert (`Debe ingresar una cantidad valida de mts a cubrir`);
    }
  } while ((!height || !weight) || (height<=0 || weight<=0));

  walls.push(new Walls (height, weight));
}

let model = 0

const models = () => {
  do {
    model = parseInt(prompt(`Indique el modelo de placa que necesita según las siguientes opciones: 1) 60x60 \n2) 28x56 \n3) 56x56`));
  } while (!model);

  switch (model) {
    case 1:
      model = 0.36;
      break;
    case 2:
      model = 0.1568;
      break;
    case 3:
      model = 0.3136;
      break;
    default:
      alert("Por favor debe solo indicar 1 o 2 o 3 según corresponda");
    }
  }

  do { 
    models();
  } while (!model || model < 0 || model > 3);

  let totalCover = 0;
  
  for (let i=0; i < walls.length ; i++){
    totalCover += walls[i].cover();
  }

  const product60x60 = products.filter(product => (product.height === 0.6));
  const product60x60Name = (product60x60.map(element => { return element.name})).sort();
  const product28x56 = products.filter(product => (product.height === 0.28));
  const product28x56Name = (product28x56.map(element => { return element.name})).sort();
  const product56x56 = products.filter(product => (product.height === 0.56));
  const product56x56Name = (product56x56.map(element => { return element.name})).sort();
  
  let design;
  let confirmation;

  const choose = function(model) { 
    if (model === 0.36) {      
      design = (prompt(`Indique el modelo de placa que necesita según las siguientes opciones: ${product60x60Name.join("\n")}`));
    } else if (model === 0.1568) {
      design = (prompt(`Indique el modelo de placa que necesita según las siguientes opciones: ${product28x56Name.join("\n")}`));
    } else {
      design = (prompt(`Indique el modelo de placa que necesita según las siguientes opciones: ${product56x56Name.join("\n")}`));
    }
    switch (design.toLowerCase()) {
      case "travertino":
        design = travertino;
        break;
      case "piedra":
        design = piedra;
        break;
      case "sol":
        design = sol;
        break;
      case "sol con marco":
        design = solMarco;
        break;
      case "mediterraneo":
        design = mediterraneo;
        break;
      case "ubeda":
        design = ubeda;
        break;
      case "piel naranja":
        design = pielNaranja;
        break;
      case "alicante":
        design = alicante;
        break;
      case "liso":
        design = liso;
        break;
      case "pizarra":
        design = pizarra;
        break;
      case "ladrillo":
        design = ladrillo;
        break;
      default:
        alert("Por favor indique un modelo válido");
      }
    confirmation = confirm(`El modelo elegido es el ${design.name}`);
  } 
  
  

  do { 
    choose(model);
  } while (!confirmation);
  
  let unit = Math.ceil(totalCover/design.size());
  let totalPrice = unit * design.price;

  alert (`Para cubrir la/las ${walls.length} pared/es indicadas con el modelo ${design.name}, Ud requiere de ${unit} placas y debe abonar $${totalPrice}` )


