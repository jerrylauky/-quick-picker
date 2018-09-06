import factorial from "./factorial";
import Int from "../models/Int";

export default function binomialCoefficients(n: Int, r: Int): number {
  const diff = new Int(n.value - r.value);
  const nominator = factorial(n);
  const denominator = factorial(r) * factorial(diff);
  return Math.round(nominator / denominator);
}
