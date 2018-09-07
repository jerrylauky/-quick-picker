export default class Int {
  typeName: string = "Integer";
  private val: number;

  static validate(inputValue: number) {
    if (Number.isNaN(inputValue)) {
      throw new TypeError(
        `Input value ${inputValue} is not of type Integer.`
      );
    }
  }

  constructor(num: number) {
    this.setValue(num);
  }

  public get value(): number {
    return this.val;
  }

  public setValue(num: number): void {
    Int.validate(num);
    this.val = num;
  }
}
