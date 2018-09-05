import * as React from "react";
import { render } from "react-dom";
// import Hello from "./Hello";
import Lottery from "./models/Lottery";
import LotteryFactory from "./models/LotteryFactory";
// import LotteryOddsCalculator from "./models/LotteryOddsCalculator";
import { printObject } from "./libs/utils.tsx";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "left"
};

const lottoMax = LotteryFactory.getInstance<Lottery>("lottoMax");
// const result = LotteryOddsCalculator.computeOddsWinningGrandPrize(lottoMax);

const App = () => (
  <div style={styles}>
    <h2>Odds of Games</h2>
    <div>{printObject(lottoMax)}</div>
  </div>
);

render(<App />, document.getElementById("root"));
