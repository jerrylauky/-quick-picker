import Int from "../models/Int";

export function binomialCoefficients(n: Int, r: Int): number {
  const diff = new Int(n.value - r.value);
  const nominator = factorial(n);
  const denominator = factorial(r) * factorial(diff);
  return Math.round(nominator / denominator);
}

function recursiveFactorial(n: Int, accumulator: number): number {
  let val = n.value;
  if (val <= 0) return accumulator;

  return recursiveFactorial(new Int(val - 1), val * accumulator);
}
export function factorial(n: Int): number {
  return recursiveFactorial(n, 1);
}
