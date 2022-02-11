// Video: https://www.youtube.com/watch?v=S9ojNaeC1RI&t=3s
// ---------------------------------------------
// No es necesario que se use ";" pero en mi caso lo he usado como costumbre
// ---------------------------------------------
// Tipos: number, string, boolean, undefined
// ---------------------------------------------
let dato;
dato = 5;
typeof(dato);
console.log(dato);
let miString = 'Hola mundo';
typeof(miString);
let miBooleano = false;
typeof(miBooleano);
let indefinido;
typeof(indefinido);

// ---------------------------------------------
// Operadores
// ---------------------------------------------
let suma = 5 + 5;
suma;
let resta = 3 - 2;
resta;
let division = 3/3;
division;
let infinito = 3/0;
infinito;
let multiplicacion = 5 * 10;
multiplicacion;
let potencia = 3 ** 3;
potencia;

let frase = "hola" + " mundo " + "!"
frase;

let x = 1;
x
let y = ++x; // Preincremento
y; //2
x; //2
let z = x++; // Posincremento
z; //2
x; //3
let a = x--;
a; //3
x; //2
let b = --x;
b; //1
x; //1

!true
!false
!!true
!!false
true === true
true === false
true !== false
false !== false
3 == "3" //true
3 === "3" //false
5 > 3
5 < 3
3 >= 3
2 <= 1
"a" < "b" //true
"e" < "d" //false

// ---------------------------------------------
// Operadores lógicos
// ---------------------------------------------
// AND &&
true && true
// OR ||
false || false || true
0 && true //0
0 == false //true
1 == true //true
1 && "hello" //'hello'
const port = process.env.PORT || 3000
port //3000


// ---------------------------------------------
// Condicionales
// ---------------------------------------------
// sentencia IF
let operacion = 5 - 3;
if(operacion >= 7) {
  console.log('Es mayor a 7');
} else if (operacion < 7 && operacion > 2) {
  console.log('Está entre 7 y 2');
} else {
  console.log('Es menor o igual a 2')
}
// sentencia SWITCH
let operacion2 = 5 + 1;
switch (operacion2) {
  case 0:
    console.log("El resultado es 0");
    break;
  case 7:
    console.log("El resultado es 7");
    break;
  default:
    console.log("El resultado no es ni 0 ni 7");
}

// ---------------------------------------------
// Funciones
// ---------------------------------------------
function saludar(nombre = "") {
  return `¡Hola ${nombre}!`;
}

saludar()
saludar("Carlos")
saludar("Maria")

// Una funcion que se comporta como unaa clase
// Antes es como se usaba la clases en JS
function Inventario(nombre) {
  this.nombre = nombre;
  this.articulos = [];
}
Inventario.prototype.getNombre = function() {
  return this.nombre;
}
Inventario.prototype.add = function(articulo, cantidad) {
  this.articulos[articulo] = cantidad;
}
Inventario.prototype.cantidad = function(articulo) {
  return this.articulos[articulo];
}

let libros = new Inventario('libros');
libros.getNombre();
libros.add("Aprendiendo JavaScript", 5);
libros.cantidad('Aprendiendo JavaScript');

// Ahora ya se pueden usar clases
class Inventario2 {
  constructor(nombre) {
    this.nombre = nombre;
    this.articulos = [];
  }
  getNombre() {
    return this.nombre;
  }
  add(articulo, cantidad) {
    this.articulos[articulo] = cantidad;
  }
  cantidad(articulo) {
    return this.articulos[articulo];
  }
}

let libros2 = new Inventario2('libros');
libros.getNombre();
libros.add("Aprendiendo JavaScript", 5);
libros.cantidad('Aprendiendo JavaScript');

// ---------------------------------------------
// Bucles
// ---------------------------------------------
// While
function bucleWhile(num) {
  let i = 0;
  while(i < num) {
    console.log(i);
    i++;
  }
}
bucleWhile(0); // No imprime nada

// Do while
function bucleDoWhile(num) {
  let i = 0;
  do {
    console.log(i);
    i++;
  } while(i < num);
}
bucleDoWhile(0); // Si imprime algo

// For
function bucleFor(num) {
  for(let i = 0; i < num; i++) {
    console.log(i);
  }
}
bucleFor(11);

// Array
const array = [];
array[0] = 1;
array[1] = 2;
array[0];

// Llenar una array
const obj = {
  unArray: new Array(10000)
};

function badPerformance() {
  console.time("bad");
  for(let i = 0; i < obj.unArray.length; i++) {
    obj.unArray[i] = 'Hola';
  }
  console.timeEnd('bad');
}
function goodPerformance() {
  console.time("good");
  const unArray = obj.unArray;
  for(let i = 0, longitud = unArray.length; i < longitud; i++) {
    unArray[i] = 'Hola';
  }
  console.timeEnd('good');
}

badPerformance();
goodPerformance();

// Recorrer un arreglo con JS antiguo
const miArray = [1, 2, 3, 4];
miArray.forEach(function(item, index) {
  console.log("El valor de la posicion " + index + " es: " + item);
});
// Recorrer un arreglo con ECMAScript 6
const miArray2 = [1, 2, 3, 4];
miArray2.forEach((item, index) => {
  console.log(`El valor de la posicion ${index} es: ${item}`);
});

// Recorrer las propiedades de una objeto
const libro = {
  titulo: "Aprendiendo JS",
  autor: "Carlos Azaustre",
  numPaginas: 100,
  editorial: "carlosazaustre.es",
  precio: "24.90"
}
// Una forma
const props = Object.getOwnPropertyNames(libro);
props.forEach(name => {
  let valor = Object.getOwnPropertyDescriptor(libro, name).value;
  console.log(`La prop ${name} contiene valor: ${valor}`);
});
console.log("-------------------------");
// Otra forma
for (let prop in libro) {
  console.log(`La prop ${prop} contiene valor: ${libro[prop]}`);
}

// ---------------------------------------------
// Clases CORE
// ---------------------------------------------
const libro2 = {
  titulo: "Aprendiendo JS",
  autor: "Carlos Azaustre",
  numPaginas: 100,
  editorial: "carlosazaustre.es",
  precio: "24.90",
  leer : function() {
    console.log("He leido el libro")
  }
}

// Formas de acceder a las propiedades de un objeto
libro2.titulo;
libro2["numPaginas"]
libro2.titulo = "Desarrollo Web con React"
libro2.titulo
let pages = "numPaginas";
libro2[pages]
libro2.leer();

// Formas de declarar un objeto
let libro3 = {}
libro3.titulo = "Titulo 3"

let libro4 = new Object({titulo: "Titulo 4"});
libro4.titulo;

let libro5 = {
  titulo: "Aprendiendo JS",
  autor: {
    nombre: 'Carlos Azaustre',
    edad: 36,
    redes : {
      twitch: "twitch.tv/carlosazaustre",
      tiktok: "tiktok.com/@carlosazaustre"
    }
  }
}
libro5.autor.nombre
libro5['autor']['redes']['twitch']

const coche1 = {marca: "Tesla", modelo: "X"}
const coche2 = {marca: "Tesla", modelo: "X"}
coche1 === coche2 // false
coche1.marca === coche2.marca // true
const coche3 = coche1
coche3 === coche1 // true

class Coches {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }
}

let coche4 = new Coches("Tesla", "X")
let coche5 = new Coches("Tesla", "X")
coche4 === coche5 // false

// Clase number:
25.5
0x1F //31
0xF // 15
0x10 //16
5.4e2 //540
1/0 //Infinity
1e1000 //Infinity
"a"/15 //NaN -> Not a number

let numero = 5;
let numero2 = new Number(5); // Es lo mis que la anterior declaracion

parseInt("15")
parseInt("1111", 2) // binario -> 15
parseInt("1111", 16) // hexadecimal -> 4369

parseFloat("5e3") //5000
let n = 2.5678;
n.toFixed(2); // Devuelve una cadena de un numero de dos decimales redondeados -> '2.57'
parseInt(n.toFixed(2)); // Devuelve un numero pero entero -> 2
parseFloat(n.toFixed(2)); // Devuelve un numero pero numero con dos decimales -> 2.57
n.toExponential(2); // 2.57e+0

(1111).toString(); // convertir el numero a cadena
(15).toString(2); // convierte el numero a cadena pero en binario -> '1111'
(4369).toString(16); // convierte el numero a cadena pero en base hexadecimal -> '1111'

// clase Math
Math.PI // 3.141592653589793
Math.E // 2.718281828459045
Math.random() // Número aleatorio, que es distinto cada vez que se invoca -> 0.3226225382501957
Math.random() // 0.30844638326386553
Math.pow(2, 6) // 64
2 ** 6 // 64
Math.min(2, 4, 6) //2
Math.max(4, 6, 2) //6

// Array
let miArrayNumeros = [1, 2, 3]
let miArrayCadenas = ["cadena 1", "cadena 2", "cadena 3"];
let miArrayObjetos = [
  { propiedad: "valor" }, 
  { propiedad: "valor" }];
let miArrayArreglos = [
  [2, 4],
  [3, 6]
];
miArrayArreglos[0][0] //2
miArrayArreglos[1][1] //6

let miArrayVariado = [
  1,
  true,
  [3, 2],
  "hola",
  {clave: "valor"}
];
miArrayVariado.length //5

let mmiArray2 = [3, 6, 1, 4];
miArray2.sort() //[ 1, 2, 3, 4 ]
miArray2.pop() //4
miArray2 //[ 1, 2, 3 ]
miArray2.push(2); //4
miArray2 // [ 1, 2, 3, 2 ]
miArray2.sort() //[ 1, 2, 2, 3 ]
miArray2.reverse() //[ 3, 2, 2, 1 ]