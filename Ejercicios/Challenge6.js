/*
 * Reto #6
 * INVIRTIENDO CADENAS
 * Fecha publicación enunciado: 07/02/22
 * Fecha publicación resolución: 14/02/22
 * Dificultad: FÁCIL
 *
 * Enunciado: Crea un programa que invierta el orden de una cadena de texto sin usar funciones propias del lenguaje que lo hagan de forma automática.
 * - Si le pasamos "Hola mundo" nos retornaría "odnum aloH"
 *
 * Información adicional:
 * - Usa el canal de nuestro discord (https://mouredev.com/discord) "🔁reto-semanal" para preguntas, dudas o prestar ayuda a la acomunidad.
 * - Puedes hacer un Fork del repo y una Pull Request al repo original para que veamos tu solución aportada.
 * - Revisaré el ejercicio en directo desde Twitch el lunes siguiente al de su publicación.
 * - Subiré una posible solución al ejercicio el lunes siguiente al de su publicación.
 *
 */

function main() {
  console.log(reverse("Hola mundo"))
  console.log(recursiveReverse("Hola mundo"))
}

function reverse(text) {
  let textCount = text.length - 1
  let reverseText = ""
  
  for (let index = 0; index <= textCount; index++) {
    reverseText = reverseText + text[textCount - index]
  }
  
  return reverseText
}

function recursiveReverse(text, index = 0, reversedText = "") {
  let textCount = text.length - 1
  let newReversedText = reversedText
  
  newReversedText = newReversedText + text[textCount - index]
  
  if (index < textCount) {
    let newIndex = index + 1
    newReversedText = recursiveReverse(text, newIndex, newReversedText)
  }
    
  return newReversedText
}

main();