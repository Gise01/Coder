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

  function models () {
    do {
      model = parseInt(prompt(`Indique el modelo de placa que necesita según las siguientes opciones: 1) 0.36 \n2) 0.1568 \n3) 0.3136`));
    } while (!model);

    switch (model) {
      case 1:
        model = 0.36;
        break;
      case 2:
        model = 0.1568;
        break;
      case 3:
        model = 0.3136
        break;
      default:
        alert("Por favor debe solo indicar 1 o 2 o 3 según corresponda");
      }
  }

  do { 
    models();
  } while (!model || model < 0 || model > 3);

  confirmation = confirm(`Ud indico que la superficie a cubrir con placas de ${model}m2 tiene un alto de ${height}mts, un ancho de ${weight}mts, esto es correcto?`);
}

do{
  start();
} while (!confirmation);

let total = (Math.ceil(height*weight/model)*300);
alert(`El total a gastar es $${total}`);
