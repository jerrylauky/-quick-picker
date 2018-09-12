import moment from "moment";
import Validator from "./validator";

const DAYS_OF_WEEK: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DAYS_OF_WEEK_MAP: Map<string, number> = DAYS_OF_WEEK.reduce((accumulator, currentValue, currentIndex) => {
   accumulator.set(currentValue.toLowerCase(), currentIndex);
   return accumulator;
}, new Map<string, number>());

const ADD_DAYS_MEMOIZE_TABLE = {};

export function getDayOfWeekMap (): Map<string, number> {
  return DAYS_OF_WEEK_MAP;
}

/**
* Adds days to the provided time. 
* 
* @param time [Date] the time we want to add days to. 
* @param days [Integer] the number of days we want to add or subtract from the time. 
* @return [Date] the adjusted date. 
*/
export function addDays (time: number, days: number): number {
  Validator.isTimestamp(time);
  Validator.isInt(days);
  const inputTime = moment(time);

  const searchKey = inputTime.valueOf() + "-" + days;
  let result = ADD_DAYS_MEMOIZE_TABLE[searchKey];
  if(result === undefined) {
    result = inputTime.add(days, "d").valueOf();
    ADD_DAYS_MEMOIZE_TABLE[searchKey] = result;
  }
  return result;
}

/**
* Adds weeks to the provided time. 
* 
* @param time [Date] the time we want to add days to. 
* @param weeks [Integer] the number of weeks we want to add or subtract from the time. 
* @return [Date] the adjusted date. 
*/
export function addWeeks (time: number, weeks: number): number {
  Validator.isTimestamp(time);
  Validator.isInt(weeks);
  return addDays(time, weeks * 7);
}

export function getDayBeforeToday (day: string = ""): number | undefined {
  try {
    Validator.notNull(day);

    let dayInLowerCase: string = day.toLowerCase() || "";
    if (!DAYS_OF_WEEK_MAP.has(dayInLowerCase)) {
      throw new ReferenceError("Invalid argument 'day'.");
    };

    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    let dayOfWeekIndex: number = DAYS_OF_WEEK_MAP.get(dayInLowerCase) || -1;
    let dayOfCurrentWeekIndex: number = today.getDay() || -1;
    let dayOfWeekIndexNotFound: boolean = Number.isNaN(dayOfWeekIndex) || dayOfWeekIndex < 0;
    let dayOfCurrentWeekIndexNotFound: boolean = Number.isNaN(dayOfCurrentWeekIndex) || dayOfCurrentWeekIndex < 0;
    if (dayOfWeekIndexNotFound || dayOfCurrentWeekIndexNotFound) {
      throw new Error("Invalid dayOfWeekIndex or dayOfCurrentWeekIndex.");
    }

    // if (dayOfWeekIndex === dayOfCurrentWeekIndex) {
    //   return today.getTime();
    // } else if (dayOfWeekIndex > dayOfCurrentWeekIndex) {
    //   return addDays(getLastSundayOfWeek(today.getTime()), dayIndexDifference);
    if (dayOfWeekIndex >= dayOfCurrentWeekIndex) {
      let dayIndexDifference: number = dayOfWeekIndex - dayOfCurrentWeekIndex;
      return addDays(today.getTime(), -7 + dayIndexDifference);
    } else {
      // if dayOfWeekIndex < dayOfCurrentWeekIndex
      let dayIndexDifference: number = dayOfWeekIndex - dayOfCurrentWeekIndex;
      return addDays(today.getTime(), dayIndexDifference);
    }
  } catch (e) {
    return undefined;
  }
}

/**
 * Gets the sunday of the week and returns that day. This assumes the week starts on Sunday.
 * @param time [Date] the time we want to get the sunday for.
 * @return [Date] the sunday of that week.
 */
export function getSundayOfWeek (time: number): number {
  Validator.isTimestamp(time);
  return moment(time).startOf("week").valueOf();
}

/**
 * Gets the next sunday of the week and returns that day. This assumes the week starts on Sunday.
 * @param time [Date] the time we want to get the next sunday for.
 * @return [Date] the next sunday of that week.
 */
export function getNextSundayOfWeek (time: number): number {
  Validator.isTimestamp(time);
  return addWeeks(getSundayOfWeek(time), 1);
}

/**
 * Gets the last sunday of the week and returns that day. This assumes the week starts on Sunday.
 * @param time [Date] the time we want to get the last sunday for.
 * @return [Date] the last sunday of that week.
 */
export function getLastSundayOfWeek (time: number): number {
  Validator.isTimestamp(time);
  return addWeeks(getSundayOfWeek(time), -1);
}

/**
 * Gets the saturday of the week and returns that day. This assumes the week ends on Saturday.
 * @param time [Date] the time we want to get the saturday for.
 * @return [Date] the saturday of that week.
 */
export function getSaturdayOfWeek (time: number): number {
  Validator.isTimestamp(time);
  return addDays(getSundayOfWeek(time), 6);
}