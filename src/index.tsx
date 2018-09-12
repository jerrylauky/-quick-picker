import * as React from "react";
import { render } from "react-dom";
import { Lottery, LotteryFactory } from "./models/lottery";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "left"
};

const getLotteryInstance = (lotteryType: string) =>
  LotteryFactory.getInstance<Lottery>(lotteryType);
const getLotteryList = (lotteriesToAnalyze: string[]) =>
  lotteriesToAnalyze.map(getLotteryInstance);
const lotteryList = getLotteryList(["lottoMax", "lottario"]);

const App = () => (
  <div style={styles}>
  </div>
);

render(<App />, document.getElementById("root"));
