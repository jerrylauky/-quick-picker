export default class Int {
  private val: number;
  typeName: string = "Integer";

  constructor(num: number) {
    this.setValue(num);
  }

  static validate(inputValue: number) {
    if (Number.isNaN(inputValue)) {
      throw new TypeError(
        `Input value ${inputValue} is not of type ${this.typeName}`
      );
    }
  }

  public get value(): number {
    return this.val;
  }

  public setValue(num: number): void {
    Int.validate(num);
    this.val = num;
  }
}
