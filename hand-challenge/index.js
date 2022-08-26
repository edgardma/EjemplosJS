/**
 * 👉 : moves the memory pointer to the next cell
 * 👈 : moves the memory pointer to the previous cell
 * 👆 : increment the memory cell at the current position
 * 👇 : decreases the memory cell at the current position.
 * 🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
 * 🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
 * 👊 : Display the current character represented by the ASCII code defined by the current position.
 */

const MIN_CELL = 0
const MAX_CELL = 255

const clamp = value => {
  if (value > MAX_CELL) return MIN_CELL
  if (value < MIN_CELL) return MAX_CELL
  return value
}

function translate (string) {
  const memory = [0]

  let pointer = 0
  let index = 0
  let output = ''

  const arrayOfInstructions = Array.from(string)

  const actions = {
    '👉': () => {
      pointer++
      memory[pointer] ??= 0 // Solo le asigna 0 solo si la posición es indefinido
    },
    '👈': () => {
      pointer--
      memory[pointer] ??= 0
    },
    '👆': () => {
      memory[pointer] = clamp(memory[pointer] + 1)
    },
    '👇': () => {
      memory[pointer] = clamp(memory[pointer] - 1)
    },
    '🤜': () => {
      return arrayOfInstructions.indexOf('🤛', index)
    },
    '🤛': () => {
      return arrayOfInstructions.indexOf('🤜', index)
    },
    '👊': () => {
      //console.log({ output })
      output += String.fromCharCode(memory[pointer])
    }
  }

  while (index < arrayOfInstructions.length) {
    const action = arrayOfInstructions[index]
    actions[action]()
    console.log({ action, index, output })
    index++
  }

  return output
}

console.log(translate('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊'))

module.exports = translate
