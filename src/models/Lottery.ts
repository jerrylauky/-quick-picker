import Int from "./Int";

export default class Lottery {
  type: string;
  numberField: Int;
  pickSize: Int;
  calculator: any;

  constructor(type: string, numberField: Int, pickSize: Int, calculator: any) {
    this.type = type;
    this.numberField = numberField;
    this.pickSize = pickSize;
    this.calculator = calculator;
  }

  public getTotalCombinations() {}
  public getOddsWinningGrandPrize() {}
  public toDescriptorList() {}
  public toString() {}
}
