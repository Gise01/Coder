let height=0;
let weight=0;
let model=0;
let confirmation;

function start () {
  do{
    height = parseFloat(prompt("Por favor ingrese un número valido en mts para el alto de su pared"));
  } while (!height || height<0);
 
  do{
    weight = parseFloat(prompt("Por favor ingrese un número valido en mts para el ancho de su pared"));
  } while (!weight || weight<0);

  do {
    model = parseFloat(prompt("Indique el modelo de placa que necesita segín las siguientes opciones: 0.36, 0.1568, 0.3136"));
    console.log(model);
  } while (!model)
  
  confirmation = confirm(`Ud indico que la superficie a cubrir con placas de ${model}m2 tiene un alto de ${height}mts, un ancho de ${weight}mts, esto es correcto?`);
}

do{
  start();
} while (!confirmation);

let total = (Math.ceil(height*weight/model)*300);
alert(`El total a gastar es $${total}`);
