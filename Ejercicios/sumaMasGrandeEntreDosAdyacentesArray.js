/*
Dado un array de números enteros devuelve la suma más grande
entre dos número adyacentes
Fuente: https://youtube.com/shorts/-s1DA9NXqNw?feature=share
*/
const array = [2, 4, 1, 5, 6, 3]

maxAdjacentSum(array) // 6 + 5 -> 11
maxAdjacentSum2(array) // 6 + 5 -> 11

function maxAdjacentSum(array) {
  let maxSum = -Infinity
  const { length } = array
  
  for (let i = 0; i < length - 1; i++) {
    const sum = array[i] + array [ i + 1]
    
    if (sum > maxSum) {
      maxSum = sum
    }
  }
  
  return maxSum
}

function maxAdjacentSum2(array) {
  let maxSum = -Infinity
  const { length } = array
  
  for (let i = 0; i < length - 1; i++) {
    const sum = array[i] + array [ i + 1]
    
    maxSum = Math.max(maxSum, sum)
  }
  
  return maxSum
}