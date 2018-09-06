import * as React from "react";
import { printObject } from "../libs/index";

export default function({ list }) {
  if (!list || !Array.isArray(list)) {
    return <div />;
  }
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
