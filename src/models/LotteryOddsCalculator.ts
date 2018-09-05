import { binomialCoefficients } from "../libs/utils.tsx";
import Lottery from "./Lottery";

export default class LotteryOddsCalculator {
  static computeTotalCombinations(lottery: Lottery): number {
    return binomialCoefficients(lottery.numberField, lottery.pickSize);
  }

  static computeOddsWinningGrandPrize(lottery: Lottery): number {
    const combinations = binomialCoefficients(
      lottery.numberField,
      lottery.pickSize
    );
    const numberOfWaysWinning = 1;
    const numberOfWaysLosing = combinations - 1;
    return numberOfWaysWinning / numberOfWaysLosing;
  }
}
