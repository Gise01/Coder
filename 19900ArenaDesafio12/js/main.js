import {plaques} from './plaques.js'
import {roofs} from './roofs.js'
import {moldings} from './moldings.js'
import { adds } from './adds.js';

/*-----------------------------------------------------------------------------
---------------------------DECLARATION---------------------------------------
-----------------------------------------------------------------------------*/
const products = [...plaques, ...roofs, ...moldings, ...adds];

const plaquesName = plaques.map(element => { return (element.name)}).sort();
const roofsName = roofs.map(element => { return (element.name)}).sort();

let card = document.querySelector('#myCard');

let formWall = document.createElement('form');
formWall.classList.add('row', 'g-3');
formWall.id = 'formWallbtn2';

let divForm = document.querySelector('div#form');

let wallsModel = [];

/*-----------------------------------------------------------------------------
------------------------------FUNCTION----------------------------------------
-----------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  showProducts();}
  
  );

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

//Primeras selecciones de tipos de productos para la cotización
function initial() {
  $('div#form').append('<div id="divSelect" class="col-md-6"> <h5> Que desea revestir? </h5> <select id="type" class="form-select" aria-label="Default select example"> <option value="">Elija una opción</option><option value="revestimiento">Pared</option> <option value="cielorraso">Cielorraso</option> </select> </div>')
  $('#type').change(() => {
    let selectedValue = $('#type').val()
    
    if (selectedValue === "revestimiento"){
      walls();
    } else if (selectedValue === "cielorraso"){
      swal("cielorraso");
    } else if (selectedValue === ""){
      swal("Por favor ingrese un valor");
    }
  })
};
initial();

// Formulario para cotizar paredes
function walls(){
  $('form#formWalls').remove();

  $('div#form').append('<form id="formWalls" class="row g-3"> <div id="paredes" class="col-md-6"> <label for="validationDefault01" class="form-label h5"> Cantidad de paredes </label> <input id="qWall" type="number" class="form-control" id="validationDefault01" min="1" max="10" pattern="^[1-9]\d*$" required> </div> <div id="divSelectP" class="col-md-6"> <h5> Seleccione que modelo de placa le interesa cotizar </h5> <select id="selectP" class="form-select" aria-label="Default select example"> </select> </div> <div class="form-check form-switch"> <input id="frisos" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"> <label class="form-check-label" for="flexSwitchCheckDefault"> Desea agregar guardas? </label> </div> <div id="btn1" class="col-12"> <button class="btn btn-primary" type="submit"> ENVIAR </button> </div> </form>');
  
  //Se muestran los nombres de los productos para seleccionar el modelo
  plaquesName.forEach (plaque => {
    $('select#selectP').append(`<option value="${plaque}">${plaque}</option>`)
  });

  //Se agregan guardas?
  $('input#frisos').click(()=> {
    if ($('input#frisos').prop('checked')){
      $('#btn1').before('<div id="frisos" class="col-md-6"> <label for="validationDefault01" class="form-label h5"> Cantidad de mts lineales de guardas </label> <input id="qFri" type="number" class="form-control" id="validationDefault01" min="1" max="10" pattern="^[1-9]\d*$" required> </div>')
    } else {
      $('div#frisos').remove();
    }
  })

  valFormWall();
};

// Se valida el formulario y se guardan los valores
function valFormWall () {
   $('#formWalls').submit(function (e) {
      let qWall = $('input#qWall').val();
      let model = ($('select#selectP').val()).toLowerCase();
      let qFri = $('input#qFri').val();

      if (qWall < 0 || qWall > 10 || !qWall){
        alert("Por favor ingrese una cantidad válidad de paredes entre 1 y 10");
        return;
      }

      if (!qFri) {
        qFri = 0;
      }

      localStorage.setItem("qWall", qWall);
      localStorage.setItem("model", model);
      localStorage.setItem("frisos", qFri)
     
      e.preventDefault();
      
      createWalls(qWall);

  })
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


/* formWall.addEventListener('submit',(e2) => {
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
 */