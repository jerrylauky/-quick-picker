import * as React from "react";
import { printObject } from "../libs/index";
import { Lottery } from "../models/lottery/index";

export default function({ list }: { list:Lottery[] }) {
  return (
    <div>
      {list.map((lottery, index) => (
        <div key={index}>
          <p>{printObject(lottery)}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
