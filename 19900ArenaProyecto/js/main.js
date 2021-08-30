import {plaques} from './plaques.js'
/*-----------------------------------------------------------------------------
---------------------------DECLARATION---------------------------------------
-----------------------------------------------------------------------------*/

const plaquesName = plaques.map(element => { return (element.name)}).sort();

let select = document.querySelector('#select');

let card = document.querySelector('#myCard');

let myForm = document.querySelector('#formWalls');

let qWall = document.querySelector('#qWall');

let model = document.querySelector('.form-select');

let formWall = document.createElement('form');
formWall.classList.add('row', 'g-3');
formWall.id = 'formWallbtn2';

let divForm = document.querySelector('#form');

let btn1 = document.querySelector('#btn1');

let wallsModel = [];

/*-----------------------------------------------------------------------------
------------------------------FUNCTION----------------------------------------
-----------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  showPlaques();}
  
  );

//Se muestran los productos en pantalla
function showPlaques () {
  plaques.forEach (plaque => {
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
    img.src = `${plaque.image}`;
    let p = document.createElement('p');
    p.classList.add('card-text');
    p.textContent = `${plaque.description()}`;

    div3.appendChild(p);
    div2.appendChild(img);
    div2.appendChild(div3);
    div1.appendChild(div2);
    card.appendChild(div1);
    }
  )  
}

//Se muestran los nombres de los productos para seleccionar el modelo
for (let i=0; i<plaquesName.length; i +=1) {
  let option = document.createElement('option');
  option.textContent = `${plaquesName[i]}`;
  option.setAttribute("value", `"${plaquesName[i]}"`);
  select.appendChild(option);
}

myForm.addEventListener("submit", valForm);

// Se valida el formulario y se guardan los valores
function valForm (e) {
  e.preventDefault();
  
  qWall = qWall.value

  if (qWall < 0 || qWall > 10 || !qWall){
    alert("Por favor ingrese una cantidad válidad de paredes entre 1 y 10");
    return;
  }
  localStorage.setItem("qWall", qWall);
  localStorage.setItem("model", (model.value).toLowerCase());
  
  createWalls(qWall);
}

// Se crea un formulario para la medida de las paredes
function createWalls (qWall) {
  btn1.remove();

  for (let i=0; i<qWall; i +=1) {

    let divWallH = document.createElement('div');
    divWallH.setAttribute("class", "col-md-6");
    let divWallW = document.createElement('div');
    divWallW.setAttribute("class", "col-md-6");
    let labelHeigth = document.createElement('label');
    labelHeigth.setAttribute("class", "form-label h6");
    labelHeigth.textContent = `"Indique en cm alto de la pared ${i+1} a cubrir"`;
    let inputHeigth = document.createElement('input');
    inputHeigth.setAttribute("type", "number");
    inputHeigth.setAttribute("class", "form-control");
    inputHeigth.setAttribute("min", "1");
    inputHeigth.setAttribute("pattern", "^[1-9]\d*$");
    inputHeigth.id = `paredH${[i+1]}`
    let labelWeigth = document.createElement('label');
    labelWeigth.setAttribute("class", "form-label h6");
    labelWeigth.textContent = `"Indique en cm ancho de la pared ${i+1} a cubrir"`;
    let inputWeigth = document.createElement('input');
    inputWeigth.setAttribute("type", "number");
    inputWeigth.setAttribute("class", "form-control");
    inputWeigth.setAttribute("min", "1");
    inputWeigth.setAttribute("pattern", "^[1-9]\d*$");
    inputWeigth.id = `paredW${[i+1]}`
    
    divWallH.appendChild(labelHeigth);
    divWallH.appendChild(inputHeigth);
    divWallW.appendChild(labelWeigth);
    divWallW.appendChild(inputWeigth);

    formWall.appendChild(divWallH)
    formWall.appendChild(divWallW)
      
  }
    
  let btn2 = document.createElement('button');
  btn2.classList.add('btn', 'btn-primary');
  btn2.setAttribute("type", "submit");
  btn2.id = 'btn2'
  btn2.textContent = 'ENVIAR';
  
  let divBtn = document.createElement('div');
  divBtn.classList.add('col-12')
  divBtn.appendChild(btn2);

  formWall.appendChild(divBtn);

  divForm.appendChild(formWall);
  };


formWall.addEventListener('submit',(e2) => {
  e2.preventDefault();

  for (let i = 0; i<qWall; i+=1) {
    const wall = new Walls((document.querySelector(`#paredH${[i+1]}`).value)/100, (document.querySelector(`#paredW${[i+1]}`).value)/100);
    wallsModel.push(wall);
  }
  localStorage.setItem("walls", JSON.stringify(wallsModel));

  showQuotation();
})

function showQuotation(){
  alert (`Ud eligio el model ${localStorage.getItem("model")}`)
}
