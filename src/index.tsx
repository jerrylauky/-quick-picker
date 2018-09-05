import * as React from "react";
import { render } from "react-dom";
// import Hello from "./Hello";
import Lottery from "./models/Lottery";
import LotteryFactory from "./models/LotteryFactory";
import LotteryOddsCalculator from "./models/LotteryOddsCalculator";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const lottoMax = LotteryFactory.getInstance<Lottery>("lottoMax");
const oddsCalculator = new LotteryOddsCalculator(lottoMax);
oddsCalculator.run();

const App = () => (
  <div style={styles}>
    <h2>Odds of Games</h2>
  </div>
);

render(<App />, document.getElementById("root"));
