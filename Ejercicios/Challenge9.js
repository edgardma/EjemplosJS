/*
 * Reto #9
 * CÓDIGO MORSE
 * Fecha publicación enunciado: 02/03/22
 * Fecha publicación resolución: 07/03/22
 * Dificultad: MEDIA
 *
 * Enunciado: Crea un programa que sea capaz de transformar texto natural a código morse y viceversa.
 * - Debe detectar automáticamente de qué tipo se trata y realizar la conversión.
 * - En morse se soporta raya "—", punto ".", un espacio " " entre letras o símbolos y dos espacios entre palabras "  ".
 * - El alfabeto morse soportado será el mostrado en https://es.wikipedia.org/wiki/Código_morse.
 *
 * Información adicional:
 * - Usa el canal de nuestro discord (https://mouredev.com/discord) "🔁reto-semanal" para preguntas, dudas o prestar ayuda a la acomunidad.
 * - Puedes hacer un Fork del repo y una Pull Request al repo original para que veamos tu solución aportada.
 * - Revisaré el ejercicio en directo desde Twitch el lunes siguiente al de su publicación.
 * - Subiré una posible solución al ejercicio el lunes siguiente al de su publicación.
 *
 */

const naturalDict = [["A" ,".—"], ["N" ,"—."], ["0" ,"—————"], ["B" ,"—..."], 
                   ["Ñ" ,"——.——"], ["1" ,".————"], ["C" ,"—.—."], ["O" ,"———"], 
                   ["2" ,"..———"], ["CH","————"], ["P" ,".——."], ["3" ,"...——"],
                   ["D" ,"—.."], ["Q" ,"——.—"], ["4" ,"....—"], ["E" ,"."], 
                   ["R" ,".—."], ["5" ,"....."], ["F" ,"..—."], ["S" ,"..."], 
                   ["6" ,"—...."], ["G" ,"——."], ["T" ,"—"], ["7" ,"——..."],
                   ["H" ,"...."], ["U" ,"..—"], ["8" ,"———.."], ["I" ,".."], 
                   ["V" ,"...—"], ["9" ,"————."], ["J" ,".———"], ["W" ,".——"], 
                   ["." ,".—.—.—"], ["K" ,"—.—"], ["X" ,"—..—"], ["," ,"——..——"],
                   ["L" ,".—.."], ["Y" ,"—.——"], ["?" ,"..——.."], ["M" ,"——"], 
                   ["Z" ,"——.."], ["\"" ,".—..—."], ["/" ,"—..—."]]

function main() {
  let naturalText = "Chocapic. Es una marca de cereales?"
  let morseText = decoder(naturalText)
  console.log(naturalText)
  console.log(morseText)
  console.log(decoder(morseText))
}

function decoder(input) {
  let decodedInput = ""
  let morseDict = []
  const regex = new RegExp("[a-zA-Z0-9]");
  
  for(let i = 0; i < naturalDict.length; i++) {
    let symbol = naturalDict[i]
    morseDict.push([symbol[1], symbol[0]])
  }
  
  //console.log(regex.test(input))
  if (regex.test(input)) {
    let index = 0
    let ch = false
    
    for(let i = 0; i < input.length; i++) {
      let character = input[i].toUpperCase()
      if (!ch && character != " ") {
        let nextIndex = index + 1
        if (character == "C" && nextIndex < input.length && input[nextIndex].toUpperCase() == "H") {
          decodedInput += findSymbols(naturalDict, "CH", 0)[1]
          ch = true
        } else {
          decodedInput += findSymbols(naturalDict, character, 0)[1]
        }
        
        decodedInput += " "
      } else {
        if (!ch) {
          decodedInput += " "
        }
        ch = false
      }
      
      index++
    }
    
  } else if (input.includes(".") || input.includes("-")) {
    let words = input.split(" ")
    
    for(let i = 0; i < words.length; i++) {
      let symbols = words[i].split(" ")
      
      for(let j = 0; j < symbols.length; j++) {
        if (symbols[j] != "") {
          decodedInput += findSymbols(morseDict, symbols[j], 0)[1]
        }
        else
          decodedInput += " "
      }
    }
  } 
  
  return decodedInput
}
  
function findSymbols(symbols, findSymbol, posicion) {
  for(let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i]
    if (symbol[posicion] == findSymbol) {
      return symbols[i]
    }
  }
  return []
}

main()