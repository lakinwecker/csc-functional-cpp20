// Function composition is creating a new function by combining two or
// more functions.

const square = (x: number) => x * x

const intoString = (a: number) => a.toString()

const compose =
  <A, B, C>(f: (x: A) => B, g: (y: B) => C) =>
  (x: A) =>
    g(f(x))

const squareToString = compose(square, intoString)

console.log(squareToString(2))
console.log(typeof squareToString(2))
