import { isUndefined, isNull } from "lodash/lang";
import { getType } from "./utils";
import Int from "../models/Int";

export default class Validator {
  static notNull (value, objectName: string = "Unknown Object"): void {
    if (isUndefined(value) || isNull(value)) {
      throw new TypeError(`Value of type ${objectName} must not be null or undefined.`);
    }
  }

  static isTimestamp (value) {
    let parsedDate = new Date(value).getTime();
    if (Number.isNaN(parsedDate) || Validator.isInt(parsedDate) || parsedDate < 0 || String(parsedDate).length < 10) {
      throw new TypeError(`Value must be of type Timestamp, but ${getType(value)} is given instead.`);
    }
  }

  static isInt (value) {
    Int.validate(value);
  }
}