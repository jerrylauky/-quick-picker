import Int from "./Int";
import Lottery from "./Lottery";
import LotteryOddsCalculator from "./LotteryOddsCalculator";
import Descriptor from "./Descriptor";

export default class LottoMax extends Lottery {
  constructor(calculator: any = LotteryOddsCalculator) {
    super("Lotto Max", new Int(49), new Int(6), calculator);
  }

  public getTotalCombinations(): number {
    return this.calculator.computeTotalCombinations(this);
  }
  public getOddsWinningGrandPrize(): number {
    return this.calculator.computeOddsWinningGrandPrize(this);
  }

  public toDescriptorList(): Array {
    let descriptorList = [];
    descriptorList.push(
      new Descriptor(
        "title",
        `${this.type} (${this.pickSize.value}/${this.numberField.value})`,
        "Title"
      ),
      new Descriptor(
        "numberField",
        this.numberField.value,
        "Total number of balls"
      ),
      new Descriptor(
        "pickSize",
        this.pickSize.value,
        "Number of balls to pick"
      ),
      new Descriptor(
        "totalCombinations",
        this.getTotalCombinations(),
        "Total possible combinations"
      ),
      new Descriptor(
        "oddsOfWinningGrandPrize",
        `1 in ${this.getTotalCombinations()}`,
        "Odds of winning the grand prize"
      )
    );
    return descriptorList;
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
