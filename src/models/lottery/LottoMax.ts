import Int from "../Int";
import Lottery from "./Lottery";
import LotteryOddsCalculator from "../LotteryOddsCalculator";

export default class LottoMax extends Lottery {
  constructor(calculator: LotteryOddsCalculator = LotteryOddsCalculator) {
    let numberField = new Int(49);
    let pickSize = new Int(6);
    let linesPerTicket = new Int(1); 
    let firstDrawDate = 1253854800000;
    let drawFrequency = "weekly";
    let drawDayOfWeek = "Friday"; 
    
    super(
      "Lottario", numberField, pickSize, linesPerTicket, 
      firstDrawDate, drawFrequency, drawDayOfWeek, calculator
    );
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
