/*
 * Reto #4
 * ÁREA DE UN POLÍGONO
 * Fecha publicación enunciado: 24/01/22
 * Fecha publicación resolución: 31/01/22
 * Dificultad: FÁCIL
 *
 * Enunciado: Crea UNA ÚNICA FUNCIÓN (importante que sólo sea una) que sea capaz de calcular y retornar el área de un polígono.
 * - La función recibirá por parámetro sólo UN polígono a la vez.
 * - Los polígonos soportados serán Triángulo, Cuadrado y Rectángulo.
 * - Imprime el cálculo del área de un polígono de cada tipo.
 *
 * Información adicional:
 * - Usa el canal de nuestro discord (https://mouredev.com/discord) "🔁reto-semanal" para preguntas, dudas o prestar ayuda a la acomunidad.
 * - Puedes hacer un Fork del repo y una Pull Request al repo original para que veamos tu solución aportada.
 * - Revisaré el ejercicio en directo desde Twitch el lunes siguiente al de su publicación.
 * - Subiré una posible solución al ejercicio el lunes siguiente al de su publicación.
 *
 */

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Triangle extends Polygon {
  constructor(base, height) {
    super(base, height);
  }
  
  area() {
    return (this.height * this.width) / 2;
  }
  
  printArea() {
    console.log("El área del trinagulo es " + this.area());
  }
  
}

class Rectangle extends Polygon {
  constructor(length, width) {
    super(length, width);
  }
  
  area() {
    return this.height * this.width;
  }
  
  printArea() {
    console.log("El área del rectangulo es " + this.area());
  }
  
}
  
class Square extends Polygon {
  constructor(length) {
    super(length, length);
  }
  
  area() {
    return this.height * this.width;
  }
  
  printArea() {
    console.log("El área del cuadraro es " + this.area());
  }
  
}

function area(polygon) {
  polygon.printArea()
}

area(new Triangle(10, 5))
area(new Rectangle(5, 7))
area(new Square(4))
