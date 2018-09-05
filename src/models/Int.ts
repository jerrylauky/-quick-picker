export default class Int {
  num: number;
  typeName: String = "Integer";
  constructor(num: number) {
    if (Number.isNaN(num)) {
      throw new TypeError(`This is not of type ${this.typeName}`);
    }
    this.num = num;
  }
}
