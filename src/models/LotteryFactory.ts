import Lottery from "./Lottery";
import LottoMax from "./LottoMax";

export default class LotteryFactory {
  static getInstance<T>(lotteryClassName: string, ...args: any[]): T {
    let instance;
    if (lotteryClassName === "lottoMax") {
      instance = Object.create(LottoMax.prototype);
    } else {
      instance = Object.create(Lottery.prototype);
    }
    instance.constructor.apply(instance, args);
    return instance;
  }
}
