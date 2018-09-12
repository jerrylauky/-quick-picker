import Int from "../Int";
import Descriptor from "../Descriptor";
import { getDayBeforeToday, addWeeks, Validator } from "../../libs";

export default class Lottery {
  type: string;
  numberField: Int;
  pickSize: Int;
  linesPerTicket: Int;
  firstDrawDate: number;
  drawFrequency: string;
  drawDayOfWeek: string;
  calculator: any;

  constructor(
    type: string, numberField: Int, pickSize: Int, linesPerTicket: Int, 
    firstDrawDate: number, drawFrequency: string, drawDayOfWeek: string, 
    calculator: any
  ) {
    Validator.isTimestamp(firstDrawDate);

    this.type = type;
    this.numberField = numberField;
    this.pickSize = pickSize;
    this.linesPerTicket = linesPerTicket;
    this.firstDrawDate = firstDrawDate;
    this.drawFrequency = drawFrequency;
    this.drawDayOfWeek = drawDayOfWeek;
    this.calculator = calculator;
  }

  public getFirstDrawDate (): number {
    return this.firstDrawDate;
  }

  public getPrevDrawDate (drawDate: number): number {
    return addWeeks(drawDate, -1);
  }

  public getNextDrawDate (drawDate: number): number {
    return addWeeks(drawDate, 1);
  }

  public getLastDrawDate (): number | undefined {
    return getDayBeforeToday(this.drawDayOfWeek);
  }

  public getTotalCombinations(): number {
    return this.calculator.computeTotalCombinations(this);
  }
  public getOddsWinningGrandPrize(): number {
    return this.calculator.computeOddsWinningGrandPrize(this);
  }

  public toDescriptorList(): Descriptor[] {
    let descriptorList: Descriptor[] = [];
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
        "linesPerTicket",
        this.linesPerTicket.value,
        "Number of lines per ticket"
      ),
      new Descriptor(
        "totalCombinations",
        this.getTotalCombinations(),
        "Total possible combinations"
      ),
      new Descriptor(
        "oddsOfWinningGrandPrize",
        `1 in ${this.getTotalCombinations() / this.linesPerTicket.value}`,
        "Odds of winning the grand prize"
      )
    );
    return descriptorList;
  }

  public toString() {}
}
