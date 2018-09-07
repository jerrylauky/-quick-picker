import Int from "../Int";
import Lottery from "./Lottery";
import LotteryOddsCalculator from "../LotteryOddsCalculator";

export default class Lottario extends Lottery {
  constructor(calculator: LotteryOddsCalculator) {
    super("Lottario", new Int(45), new Int(6), new Int(2), calculator);
  }

  public toString(): string {
    return `
      lottery type: ${this.type},
      total number of balls: ${this.numberField.value},
      number of balls to pick: ${this.pickSize.value},
      total possible combinations: ${this.getTotalCombinations()},
      odds of winning the grand prize: 1 in ${this.getTotalCombinations()}
    `;
  }
}
