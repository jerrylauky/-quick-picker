import Int from "../Int";
import Lottery from "./Lottery";
import LotteryOddsCalculator from "../LotteryOddsCalculator";

export default class Lottario extends Lottery {
  constructor(calculator: LotteryOddsCalculator = LotteryOddsCalculator) {
    let numberField = new Int(45);
    let pickSize = new Int(6);
    let linesPerTicket = new Int(2); 
    let firstDrawDate = 280209600000;
    let drawFrequency = "weekly";
    let drawDayOfWeek = "Saturday"; 
    
    super(
      "Lottario", numberField, pickSize, linesPerTicket, 
      firstDrawDate, drawFrequency, drawDayOfWeek, calculator
    );
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
