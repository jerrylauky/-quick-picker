import * as React from "react";
import { render } from "react-dom";
import Descriptor from "../models/Descriptor";

export default function printObject(object: any) {
  if (
    !object.toDescriptorList ||
    typeof object.toDescriptorList !== "function"
  ) {
    throw new Error("Given object is not printable.");
  }

  let descriptorList = object.toDescriptorList();
  return (
    <table>
      <tbody>
        {descriptorList.map((descriptor: Descriptor) => (
          <tr>
            <td>{descriptor.description}: </td>
            <td> {descriptor.value} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
