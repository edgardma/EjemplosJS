function generateSquare(n) {
  return Array(n)
  .fill('*'.repeat(n))
  .join('\n')
}

generateSquare(10);

function fibonacci(num) {
  const fib = [0, 1]
  
  for (let i = 2; i <= num; i++) {
    fib[i] = fib[i - 1] + fib[i - 2]
  }
  
  return fib[num]
}

fibonacci(10)