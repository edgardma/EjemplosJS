const multiply = (a, b) => {
  let result = 0
  const positivo = Math.abs(b) == b
  
  for (let i = 0; i < Math.abs(b); i++) {
    result = positivo ? result + a : result - a 
  }
  return result
}

console.log(multiply(5, 4))