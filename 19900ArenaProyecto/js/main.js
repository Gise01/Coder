let height;
let weight;
let model;
let confirmation;

function start () {
  height = parseFloat(prompt("Ingrese en mts el alto de su pared"));
  weight = parseFloat(prompt("Ingrese en mts el ancho de su pared"));
  model  = parseFloat(prompt("Indique que modelo de placa es la que necesita: 0.36, 0.1568, 0.3136"));
  confirmation = confirm(`Ud indico que la superficie a cubrir con placas de ${model}m2 tiene un alto de ${height}mts, un ancho de ${weight}mts, esto es correcto?`);
}

do{
  start();
} while (!confirmation);

let total = (Math.ceil(height*weight/model)*300);
alert(`El total a gastar es $${total}`);
