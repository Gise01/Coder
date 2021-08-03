let number = parseInt(prompt("Elige un número del 1 al 10"));

if(number<1 || number>10){
  number = parseInt(prompt("Por favor, que sea mayor que 1 y menor que 10"));
}

let otherNumber=0; 

//suma todas las cifras hasta el numero indicado en la variable number
for (let i=1; i<=number; i++){
  otherNumber = otherNumber + i;
}

alert(`Si sumamos todas las cifras desde 1 hasta ${number} da un total de ${otherNumber}`);





