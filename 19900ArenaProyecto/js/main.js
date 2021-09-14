import { plaques } from './plaques.js'
import { moldings } from './moldings.js'
import { adds } from './adds.js';

/*-----------------------------------------------------------------------------
---------------------------DECLARATION---------------------------------------
-----------------------------------------------------------------------------*/
const products = [...plaques, ...moldings, ...adds];

const plaquesNameW = plaques.filter(element => element.type === "revestimiento").map(element => { return (element.name)}).sort();

const plaquesNameR = plaques.filter(element => element.type === "cielorraso").map(element => { return (element.name)}).sort();

const productsJson = () => {
  fetch('data/products.json')
  .then((resp) => resp.json() )
  .then((allproducts) => showSelection(allproducts))
  .catch((e) => console.log(e));
}
 
let card = document.querySelector('#myCard');

let formWall = document.createElement('form');
formWall.classList.add('row', 'g-3');
formWall.id = 'formWallbtn2';

let formRoof = document.createElement('form');
formRoof.classList.add('row', 'g-3');
formRoof.id = 'formRoofbtn2';

let divForm = document.querySelector('div#form');

const roofsModel = []

const wallsModel = []


/*-----------------------------------------------------------------------------
------------------------------FUNCTION----------------------------------------
-----------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  showProducts();
  initial();}
  
  );

//Se muestran los productos en pantalla
function showProducts () {
  products.forEach (product => {
    let div1 = document.createElement('div');
    div1.classList.add('col');
    div1.style = 'width: auto; margin: auto auto;';
    let div2 = document.createElement('div');
    div2.classList.add("card", "text-white", "bg-secondary", "mb-3", "h-100");
    div2.style = 'width: 18rem;';
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
  $('div#form').append(`<div id="divSelect" class="col-md-6"> 
                          <h4> Que desea revestir? </h4> 
                          <select id="type" class="form-select" aria-label="Default select example"> 
                            <option value="">Elija una opción</option>
                            <option value="revestimiento">Pared</option> 
                            <option value="cielorraso">Cielorraso</option> 
                          </select> 
                        </div>`)
  $('#type').change(() => {
    let selectedValue = $('#type').val()
    
    if (selectedValue === "revestimiento"){
      walls();
    } else if (selectedValue === "cielorraso"){
      fRoofs();
    } else if (selectedValue === ""){
      swal("Por favor ingrese un valor");
    }
  })
};

// Formulario para cotizar paredes
function walls(){
  $('form#formWalls').remove();
  $('form#formRoofs').remove();

  $('div#form').append(`<form id="formWalls" class="row g-3"> 
                          <div id="paredes" class="col-md-6"> 
                            <label for="validationDefault01" class="form-label"> Cantidad de paredes </label> 
                            <input id="qWall" type="number" class="form-control" id="validationDefault01" min="1" max="10" pattern="^[1-9]\d*$" required> 
                          </div> 
                          <div id="divSelectP" class="col-md-6"> 
                            <h4> Seleccione que modelo de placa le interesa cotizar </h4> 
                            <select id="selectP" class="form-select" aria-label="Default select example"> </select> 
                          </div> 
                          <div class="form-check form-switch"> 
                            <input id="frisos" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                            <label class="form-check-label" for="flexSwitchCheckDefault"> Desea agregar guardas? </label> 
                          </div> 
                          <div id="btn1" class="col-12"> 
                            <button class="btn btn-primary" type="submit"> ENVIAR </button> 
                          </div> 
                        </form>`);
  
  //Se muestran los nombres de los productos para seleccionar el modelo
  plaquesNameW.forEach (plaque => {
    $('select#selectP').append(`<option value="${plaque}">${plaque}</option>`)
  });

  //Se agregan guardas?
  $('input#frisos').click(()=> {
    if ($('input#frisos').prop('checked')){
      $('#btn1').before(`<div id="frisos" class="col-md-6"> 
                          <label for="validationDefault01" class="form-label h4"> Cantidad de mts lineales de guardas </label> 
                          <input id="qFri" type="number" class="form-control" id="validationDefault01" min="1" pattern="^[1-9]\d*$" required> 
                        </div>`)
    } else {
      $('div#frisos').remove();
    }
  })

  valFormWall();
};

// Formulario para cotizar paredes
function fRoofs(){
  $('form#formRoofs').remove();
  $('form#formWalls').remove();

  $('div#form').append(`<form id="formRoofs" class="row g-3"> 
                          <div id="techos" class="col-md-6"> 
                            <label for="validationDefault01" class="form-label"> Cantidad de techos </label> 
                            <input id="qRoof" type="number" class="form-control" id="validationDefault01" min="1" max="10" pattern="^[1-9]\d*$" required> 
                          </div> 
                          <div id="divSelectT" class="col-md-6"> 
                            <h4> Seleccione que modelo de placa le interesa cotizar </h4> 
                            <select id="selectT" class="form-select" aria-label="Default select example"> </select> 
                          </div> 
                          <div id="molduras" class="col-md-6"> 
                            <label for="validationDefault01" class="form-label h4"> Cantidad de mts lineales de molduras </label> 
                            <input id="qMol" type="number" class="form-control" id="validationDefault01" min="1" pattern="^[1-9]\d*$" required> 
                          </div> 
                          <div id="btn1" class="col-12"> 
                            <button class="btn btn-primary" type="submit"> ENVIAR </button> 
                          </div> 
                        </form>`);
  
  //Se muestran los nombres de los productos para seleccionar el modelo
  plaquesNameR.forEach (roof => {
    $('select#selectT').append(`<option value="${roof}">${roof}</option>`)
  });

  valFormRoof();
};

// Se valida el formulario de paredes y se guardan los valores
function valFormWall () {
   $('#formWalls').submit(function (e) {
      let qWall = $('input#qWall').val();
      let modelW = $('select#selectP').val();
      let qFri = $('input#qFri').val();

      if (qWall < 0 || qWall > 10 || !qWall){
        alert("Por favor ingrese una cantidad válidad de paredes entre 1 y 10");
        return;
      }

      if (!qFri) {
        qFri = 0;
      }

      localStorage.setItem("qWall", qWall);
      localStorage.setItem("modelW", modelW);
      localStorage.setItem("frisos", qFri)
     
      e.preventDefault();
      
      productsJson();
      createWalls(qWall);

  })
}

// Se valida el formulario de techos y se guardan los valores
function valFormRoof () {
  $('#formRoofs').submit(function (e) {
     let qRoof = $('input#qRoof').val();
     let modelR = $('select#selectT').val();
     let qMol = $('input#qMol').val();

     if (qRoof < 0 || qRoof > 10 || !qRoof){
       alert("Por favor ingrese una cantidad válidad de techos entre 1 y 10");
       return;
     }

     if (!qMol) {
       qMol = 0;
     }

     localStorage.setItem("qRoof", qRoof);
     localStorage.setItem("modelR", modelR);
     localStorage.setItem("molduras", qMol)
    
     e.preventDefault();
     
     createRoofs(qRoof);

 })
}

//Crea una tarjeta con la información seleccionada 
function showSelection(allproducts) {
  let modelW = localStorage.getItem("modelW");
  let qFri = localStorage.getItem("frisos");
  let qWall = localStorage.getItem("qWall");
  const plaque = allproducts.find( element => element.name === modelW);
      
  $('img#imgWallSelected').attr('src', plaque.image);
  $('p#pWallSelected').text(`Ud ha indicado que necesita cotizar ${qWall} pared/paredes, con el modelo: ${plaque.name} y ${qFri} frisos. Para continuar por favor detalle las medidas de cada pared`)
};
  
// Se crea un formulario para la medida de las paredes
function createWalls (qWall) {
  formWalls.remove();
  divSelect.remove();
  myCard.remove();
    
  $('#wallSelected').slideDown().delay(500).fadeOut("slow").fadeIn();

  for (let i=0; i<qWall; i +=1) {

    let divWall = document.createElement('div')
    divWall.id = 'divWall';
    divWall.classList.add('row', 'g-3');
    let labelWall = document.createElement('label');
    labelWall.classList.add('form-label', 'h4');
    labelWall.textContent = `"Indique las medidas de la pared ${i+1} a cubrir"`;
    let divWallH = document.createElement('div');
    divWallH.classList.add('col-md-6');
    let divWallW = document.createElement('div');
    divWallW.classList.add('col-md-6');
    let labelHeigth = document.createElement('label');
    labelHeigth.classList.add('form-label', 'h6');
    labelHeigth.textContent = `"Alto en cm"`;
    let inputHeigth = document.createElement('input');
    inputHeigth.type = 'number';
    inputHeigth.classList.add('form-control');
    inputHeigth.min = 1;
    inputHeigth.pattern = '^[1-9]\d*$';
    inputHeigth.id = `paredH${[i+1]}`;
    inputHeigth.setAttribute('required', true);
    let labelWidth = document.createElement('label');
    labelWidth.classList.add('form-label', 'h6');
    labelWidth.textContent = `"Ancho en cm"`;
    let inputWidth = document.createElement('input');
    inputWidth.type = 'number';
    inputWidth.classList.add('form-control');
    inputWidth.min = 1;
    inputWidth.pattern = '^[1-9]\d*$';
    inputWidth.id = `paredW${[i+1]}`;
    inputWidth.setAttribute('required', true);
    
    divWallH.appendChild(labelHeigth);
    divWallH.appendChild(inputHeigth);
    divWallW.appendChild(labelWidth);
    divWallW.appendChild(inputWidth);

    divWall.appendChild(labelWall);
    divWall.appendChild(divWallH);
    divWall.appendChild(divWallW);

    formWall.appendChild(divWall);
      
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

// Se crea un formulario para la medida de las techos
function createRoofs (qRoof) {
  formRoofs.remove();
  divSelect.remove();
  myCard.remove();

  let modelR = localStorage.getItem("modelR");
  let qMol = localStorage.getItem("molduras");
     
  const roof = plaques.find( element => element.name === modelR);
  
  $('img#imgRoofSelected').attr('src', roof.image);
  $('p#pRoofSelected').text(`Ud ha indicado que necesita cotizar ${qRoof} techo/techos, con el modelo: ${roof.name} y ${qMol} frisos. Para continuar por favor detalle las medidas de cada techo`)
  
  $('#roofSelected').slideDown().delay(500).fadeOut("slow").fadeIn();

  for (let i=0; i<qRoof; i +=1) {

    let divRoof = document.createElement('div')
    divRoof.id = 'divRoof';
    divRoof.classList.add('row', 'g-3');
    let labelRoof = document.createElement('label');
    labelRoof.classList.add('form-label', 'h4');
    labelRoof.textContent = `"Indique las medidas del techo ${i+1} a cubrir"`;
    let divRoofL = document.createElement('div');
    divRoofL.classList.add('col-md-6');
    let divRoofW = document.createElement('div');
    divRoofW.classList.add('col-md-6');
    let labelLong = document.createElement('label');
    labelLong.classList.add('form-label', 'h6');
    labelLong.textContent = `"Largo en cm"`;
    let inputLong = document.createElement('input');
    inputLong.type = 'number';
    inputLong.classList.add('form-control');
    inputLong.min = 1;
    inputLong.pattern = '^[1-9]\d*$';
    inputLong.id = `techoL${[i+1]}`
    inputLong.setAttribute('required', true);
    let labelWidth = document.createElement('label');
    labelWidth.classList.add('form-label', 'h6');
    labelWidth.textContent = `"Ancho en cm"`;
    let inputWidth = document.createElement('input');
    inputWidth.type = 'number';
    inputWidth.classList.add('form-control');
    inputWidth.min = 1;
    inputWidth.pattern = '^[1-9]\d*$';
    inputWidth.id = `techoW${[i+1]}`
    inputWidth.setAttribute('required', true);
    
    divRoofL.appendChild(labelLong);
    divRoofL.appendChild(inputLong);
    divRoofW.appendChild(labelWidth);
    divRoofW.appendChild(inputWidth);

    divRoof.appendChild(labelRoof);
    divRoof.appendChild(divRoofL);
    divRoof.appendChild(divRoofW);

    formRoof.appendChild(divRoof);
      
  }
    
  let btn2 = document.createElement('button');
  btn2.classList.add('btn', 'btn-primary');
  btn2.type = 'submit';
  btn2.id = 'btn2'
  btn2.textContent = 'ENVIAR';
  
  let divBtn = document.createElement('div');
  divBtn.classList.add('col-12')
  divBtn.appendChild(btn2);

  formRoof.appendChild(divBtn);

  divForm.appendChild(formRoof);
};

//Se toman los valores de las paredes, y se guardan en un array para calcular la cotización
formWall.addEventListener('submit',(e2) => {
  e2.preventDefault();

  let qWall = localStorage.getItem("qWall")
  
  for (let i = 0; i<qWall; i+=1) {
    if ((document.querySelector(`#paredH${[i+1]}`).value) === 0 || (document.querySelector(`#paredW${[i+1]}`).value) === 0 ) {
      swal("Por favor ingrese una medida valida");
    } else {
      const wall = new Walls((document.querySelector(`#paredH${[i+1]}`).value)/100, (document.querySelector(`#paredW${[i+1]}`).value)/100);
      wallsModel.push(wall);
    }
  }
  localStorage.setItem("walls", JSON.stringify(wallsModel));

  showQuotationWall();
})

//Se toman los valores de los techos, y se guardan en un array para calcular la cotización
formRoof.addEventListener('submit',(e2) => {
  e2.preventDefault();

  let qRoof = localStorage.getItem("qRoof")

  for (let i = 0; i<qRoof; i+=1) {
    const roof = new Roofs((document.querySelector(`#techoL${[i+1]}`).value)/100, (document.querySelector(`#techoW${[i+1]}`).value)/100);
    roofsModel.push(roof);
  }
  localStorage.setItem("roofs", JSON.stringify(roofsModel));

  showQuotationRoof();
})

//Muestra cotización de paredes según información recolectada
function showQuotationWall(){
  form.remove();
  roofSelected.remove();
  h1.remove();
  wallSelected.remove();

  let totalSizeW = 0;
  let walls = JSON.parse(localStorage.getItem("walls"))
  let model = localStorage.getItem("modelW");
  const wallT = plaques.find( element => element.name === model && element.type === "revestimiento");
  const sellajunta = adds.find( element => element.name === "Sellajuntas");
  const adhesivo = adds.find( element => element.name === "Adhesivo");
  const adh2e1 = adds.find( element => element.name === "2en1");

  walls.forEach(wall => {
    totalSizeW += wall.height*wall.width;
    return totalSizeW
  })
  let adhQ = adhesivo.performanceWalls(totalSizeW)
  let sellQ = sellajunta.performanceWalls(totalSizeW)
  let a2en1Q = adh2e1.performanceWalls(totalSizeW)
  let qPlaWall = Math.ceil(totalSizeW/wallT.size())
  let tPlaWall = Math.ceil(totalSizeW/wallT.size())*wallT.price;  
  let frisTot = localStorage.getItem("frisos")*135;
  let sellTot = sellQ*sellajunta.price;
  let adhTot = adhQ*adhesivo.price;
  let adh2en1Tot = a2en1Q*adh2e1.price;

  let totalQuotation1 = tPlaWall + frisTot + sellTot + adhTot;
  let totalQuotation2 = tPlaWall + frisTot + adh2en1Tot;

  $('#quotation').append(`<div class="row g-0">
                            <div class="col-sm-6 col-md-3">
                              <img src="img/Logo.jpeg" class="rounded mx-auto d-block" alt="..." width="200" height="170" style="padding: 15px;">
                            </div>
                            <div class="col-sm-6 col-md-9">
                              <h2 id="presupuesto">PRESUPUESTO </h2>
                            </div>
                          </div>
                          <div class="card text-center">
                            <h5 class="card-header"> Ud ha cotizado </h5>
                            <div class="card mb-3">
                              <div class="row g-0" >
                                <div class="col-md-4" style="max-width: 540px;">
                                  <img src="img/${wallT.name} revestimiento.jpg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                  <div class="card-body">
                                    <h5 class="card-title"> Placas de revestimiento modelo <strong>${wallT.name}</strong> </h5>
                                    <p class="card-text">${wallT.description()}</p>
                                    <a id="init" href="index.html" class="btn btn-primary">Nueva Cotización</a>
                                    <a id="print" href="#" class="btn btn-primary">Descargar</a>
                                  </div>
                                </div>
                              </div>
                              <div class="card-body">
                                <br>
                                <h5 class="card-text">Esta cotizacion incluye en la opcion A:</h5>
                              </div>
                              <div class="table-responsive">
                                <table class="table align-middle">
                                  <thead>
                                    <tr>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Descripcion</th>
                                      <th scope="col">$ Unitario</th>
                                      <th scope="col">$ Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>${qPlaWall}</td>
                                      <td>${wallT.name}, tamaño ${(wallT.height*100).toFixed(0)}x${(wallT.width*100).toFixed(0)}</td>
                                      <td>$${wallT.price}</td>
                                      <td>$${tPlaWall}</td>
                                    </tr>
                                    <tr>
                                      <td>${localStorage.getItem("frisos")}</td>
                                      <td>Frisos</td>
                                      <td>$135</td>
                                      <td>$${frisTot}</td>
                                    </tr>
                                    <tr>
                                      <td>${adhQ}</td>
                                      <td>${adhesivo.name} x ${adhesivo.qty}kg. Rendimiento ${adhesivo.performance}mts2</td>
                                      <td>$${adhesivo.price}</td>
                                      <td>$${adhTot}</td>
                                    </tr>
                                    <tr>
                                    <td>${sellQ}</td>
                                    <td>${sellajunta.name} x ${sellajunta.qty}kg. Rendimiento ${sellajunta.performance}mts2</td>
                                    <td>$${sellajunta.price}</td>
                                    <td>$${sellTot}</td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <th colspan="3">TOTAL</th>
                                      <th>$${totalQuotation1}</th>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                              <div class="card-body">
                                <br>
                                <h5 class="card-text">Esta cotizacion incluye en la opcion B:</h5>
                              </div>
                              <div class="table-responsive">
                                <table class="table align-middle">
                                  <thead>
                                    <tr>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Descripcion</th>
                                      <th scope="col">$ Unitario</th>
                                      <th scope="col">$ Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>${qPlaWall}</td>
                                      <td>${wallT.name}, tamaño ${(wallT.height*100).toFixed(0)}x${(wallT.width*100).toFixed(0)}</td>
                                      <td>$${wallT.price}</td>
                                      <td>$${tPlaWall}</td>
                                    </tr>
                                    <tr>
                                      <td>${localStorage.getItem("frisos")}</td>
                                      <td>Frisos</td>
                                      <td>$135</td>
                                      <td>$${frisTot}</td>
                                    </tr>
                                    <tr>
                                      <td>${a2en1Q}</td>
                                      <td>${adh2e1.name} x ${adh2e1.qty}kg. Rendimiento ${adh2e1.performance}mts2</td>
                                      <td>$${adh2e1.price}</td>
                                      <td>$${adh2en1Tot}</td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <th colspan="3">TOTAL</th>
                                      <th>$${totalQuotation2}</th>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>`)
  $('#quotation').slideDown().delay(500);
}

//Muestra cotización de techos según información recolectada
function showQuotationRoof(){
  form.remove();
  roofSelected.remove();
  h1.remove();
  wallSelected.remove();

  let totalSizeR = 0;
  let roofs = JSON.parse(localStorage.getItem("roofs"))
  let model = localStorage.getItem("modelR");
  const roofT = plaques.find( element => element.name === model && element.type === "cielorraso");
  const sellajunta = adds.find( element => element.name === "Sellajuntas");

  roofs.forEach(roof => {
    totalSizeR += roof.height*roof.width;
    return totalSizeR
  })
  let qPlaRoof = Math.ceil((totalSizeR/roofT.size()).toFixed(2))
  let tPlaRoof = qPlaRoof*roofT.price;  
  let molTot = localStorage.getItem("molduras")*195;
  let qSell = sellajunta.performanceWalls(totalSizeR)
  let sellTot = qSell*sellajunta.price;

  let totalQuotation = tPlaRoof + molTot + sellTot;

  $('#quotation').append(`<div class="row g-0">
                            <div class="col-sm-6 col-md-3">
                              <img src="img/Logo.jpeg" class="rounded mx-auto d-block" alt="..." width="200" height="170" style="padding: 15px;">
                            </div>
                            <div class="col-sm-6 col-md-9">
                              <h2 id="presupuesto">PRESUPUESTO </h2>
                            </div>
                          </div>
                          <div class="card text-center">
                            <h5 class="card-header"> Ud ha cotizado </h5>
                            <div class="card mb-3">
                              <div class="row g-0" >
                                <div class="col-md-4" style="max-width: 540px;">
                                  <img src="img/${roofT.name} cielorraso.jpg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                  <div class="card-body">
                                    <h5 class="card-title"> Placas de cielorraso modelo <strong>${roofT.name}</strong> </h5>
                                    <p class="card-text">${roofT.description()}</p>
                                    <a id="init" href="index.html" class="btn btn-primary">Nueva Cotización</a>
                                    <a id="print" href="#" class="btn btn-primary">Descargar</a>
                                  </div>
                                </div>
                              </div>
                              <div class="card-body">
                                <br>
                                <h5 class="card-text">Esta cotizacion incluye:</h5>
                              </div>
                              <div class="table-responsive">
                                <table class="table align-middle">
                                  <thead>
                                    <tr>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Descripcion</th>
                                      <th scope="col">$ Unitario</th>
                                      <th scope="col">$ Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>${qPlaRoof}</td>
                                      <td>${roofT.name}, tamaño ${(roofT.height*100).toFixed(0)}x${(roofT.width*100).toFixed(0)}</td>
                                      <td>$${roofT.price}</td>
                                      <td>$${tPlaRoof}</td>
                                    </tr>
                                    <tr>
                                      <td>${localStorage.getItem("molduras")}</td>
                                      <td>Molduras</td>
                                      <td>$195</td>
                                      <td>$${molTot}</td>
                                    </tr>
                                    <tr>
                                      <td>${qSell}</td>
                                      <td>${sellajunta.name} x ${sellajunta.qty}kg. Rendimiento ${sellajunta.performance}mts2</td>
                                      <td>$${sellajunta.price}</td>
                                      <td>$${sellTot}</td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <th colspan="3">TOTAL</th>
                                      <th>$${totalQuotation}</th>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>`)
  $('#quotation').slideDown().delay(500);
}

$('#init').on(click, ()=> {
  showProducts();
  initial();})
