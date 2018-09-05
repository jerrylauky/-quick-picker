import Lottery from "./Lottery";

export default class LottoMax extends Lottery {
  constructor() {
    super();
    this.numberField = 49;
    this.pickSize = 6;
  }
}
