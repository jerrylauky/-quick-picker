import Int from "../Int";
import Lottery from "./Lottery";
import LotteryOddsCalculator from "../LotteryOddsCalculator";

export default class LottoMax extends Lottery {
  constructor(calculator: LotteryOddsCalculator) {
    super("Lotto Max", new Int(49), new Int(6), new Int(1), calculator);
  }

  public getTotalCombinations(): number {
    return this.calculator.computeTotalCombinations(this);
  }
  public getOddsWinningGrandPrize(): number {
    return this.calculator.computeOddsWinningGrandPrize(this);
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
