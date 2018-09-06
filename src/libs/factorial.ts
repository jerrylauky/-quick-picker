import Int from "../models/Int";

function recursiveFactorial(n: Int, accumulator: number): number {
  let val = n.value;
  if (val <= 0) return accumulator;

  return recursiveFactorial(new Int(val - 1), val * accumulator);
}
export default function factorial(n: Int): number {
  return recursiveFactorial(n, 1);
}
