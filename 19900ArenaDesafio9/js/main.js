/*-----------------------------------------------------------------------------
---------------------------DECLARACIONES---------------------------------------
-----------------------------------------------------------------------------*/

class Plaques {
  constructor (name, height, weight, price){
    this.name = name;
    this.height = parseFloat(height).toFixed(2);
    this.weight = parseFloat(weight).toFixed(2);
    this.price = parseFloat(price).toFixed(2);
    this.image = `img/${name} diseño.jpg`;
  }
  size() {
    return this.height*this.weight
  }
  description(){
    return `Placas de ${(this.height*100).toFixed(0)}x${(this.weight*100).toFixed(0)} (aproximadamente) decorativas, económicas, de fácil y rápida colocación. Elimina malos olores del ambiente, absorve la humedad evitando la formación de hongos y manchas.`
  }
}

const products = []

const pielNaranja = new Plaques ("Piel Naranja", 0.60, 0.60, 280);
const sol = new Plaques ("Sol", 0.60, 0.60, 280);
const solMarco = new Plaques ("Sol con Marco", 0.60, 0.60, 280);
const ubeda = new Plaques ("Ubeda", 0.60, 0.60, 280);
const mediterraneo = new Plaques ("Mediterraneo", 0.60, 0.60, 280);
const liso = new Plaques ("Liso", 0.60, 0.60, 280);
const travertino = new Plaques ("Travertino", 0.28, 0.56, 175);
const piedra = new Plaques ("Piedra", 0.28, 0.56, 175);
const pizarra = new Plaques ("Pizarra", 0.56, 0.56, 335);
const ladrillo = new Plaques ("Ladrillo", 0.56, 0.56, 335);
const alicante = new Plaques ("Alicante", 0.60, 0.60, 335);

products.push(pielNaranja, sol, solMarco, ubeda, mediterraneo, liso, travertino, piedra, pizarra, ladrillo, alicante);

class Walls {
  constructor (height, weight){
    this.height = parseFloat(height);
    this.weight = parseFloat(weight);
  }
  cover(){
    return this.height*this.weight
  }
}

const walls = []

const productsName = products.map(element => { return (element.name)}).sort();

let select = document.querySelector('select');

let card = document.getElementById('myCard');

let myForm = document.getElementById('formWall');

let qWall = 0;

let model;

/*-----------------------------------------------------------------------------
------------------------------FUNCIONES----------------------------------------
-----------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {showProducts();});

//Se muestran los productos en pantalla
function showProducts () {
  products.forEach (product => {
    let div1 = document.createElement('div');
    div1.classList.add('col');
    div1.setAttribute("style", "width: auto; margin: auto auto;");
    let div2 = document.createElement('div');
    div2.classList.add("card", "text-white", "bg-secondary", "mb-3", "h-100");
    div2.setAttribute("style", "width: 18rem;");
    let div3 = document.createElement('div');
    div3.classList.add('card-body');
    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = `${product.image}`;
    let p = document.createElement('p');
    p.classList.add('card-text');
    p.textContent = `${product.description()}`;

    div3.appendChild(p);
    div2.appendChild(img);
    div2.appendChild(div3);
    div1.appendChild(div2);
    card.appendChild(div1);
    }
  )  
}

//Se muestran los nombres de los productos para seleccionar el modelo
for (let i=0; i<productsName.length; i +=1) {
  let option = document.createElement('option');
  option.textContent = `${productsName[i]}`;
  option.setAttribute("value", `"${productsName[i]}"`);
  select.appendChild(option);
}

// Se valida el formulario y se guardan los valores
const valForm = (e) => {
  e.preventDefault();
  
  qWall = e.target.children[0].children[1].value;
  if (qWall < 0 || qWall > 10 || !qWall){
    alert("Por favor ingrese una cantidad válidad de paredes entre 1 y 10");
  }
  
  model = (e.target.children[0].children[2].children[1].value).toLowerCase();
 
  for (let i=0; i<qWall; i +=1) {
      let divWall = document.createElement('div');
      divWall.setAttribute("class", "col-12");
      let labelHeigth = document.createElement('label');
      labelHeigth.setAttribute("class", "form-label h6");
      labelHeigth.textContent = `"Indique en cm alto de la pared ${i+1} a cubrir"`;
      let inputHeigth = document.createElement('input');
      inputHeigth.setAttribute("type", "number");
      inputHeigth.setAttribute("class", "form-control");
      inputHeigth.setAttribute("min", "1");
      inputHeigth.setAttribute("pattern", "^[1-9]\d*$");
      let labelWeigth = document.createElement('label');
      labelWeigth.setAttribute("class", "form-label h6");
      labelWeigth.textContent = `"Indique en cm ancho de la pared ${i+1} a cubrir"`;
      let inputWeigth = document.createElement('input');
      inputWeigth.setAttribute("type", "number");
      inputWeigth.setAttribute("class", "form-control");
      inputWeigth.setAttribute("min", "1");
      inputWeigth.setAttribute("pattern", "^[1-9]\d*$");
    
      divWall.appendChild(labelHeigth);
      divWall.appendChild(inputHeigth);
      divWall.appendChild(labelWeigth);
      divWall.appendChild(inputWeigth);
    
      myForm.insertBefore(divWall, btn1);
    }
}
  
myForm.addEventListener("submit", valForm);
  
  





/*do {
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

  alert (`Para cubrir la/las ${walls.length} pared/es indicadas con el modelo ${design.name}, Ud requiere de ${unit} placas y debe abonar $${tota*/

