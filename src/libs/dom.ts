export function getNumberFromElementText ($) {
  return function (elem) {
    if (!elem) return "";
    let text = $(elem).text();
    let num = parseFloat(text.replace(/\D/g, ""));
    if (Number.isNaN(num)) return "";
    return num;
  }
}

export function getNumberFromCurrencyText ($) {
  return function (elem) {
    if (!elem) return "";
    let currencyText = $(elem).text().trim();
    let text = currencyText.replace(/[$,]/g, "");
    let num = parseFloat(text);
    if (Number.isNaN(num)) return text;
    return num;
  }
}

export function getNumbersFromListOfElements ($, elemList) {
  if (!elemList || !elemList.length) return [];
  return Array.from(elemList).map(getNumberFromElementText($));
}

export function sortNumbersAsc (numList) {
  if (!numList || !numList.length) return numList;
  let sortFunc = (a,b) => a-b;
  return numList.sort(sortFunc);
}

export function sortDrawsByDateAsc (lotteryList) {
  if (!lotteryList || !lotteryList.length) return lotteryList;
  let sortFunc = (fst, snd) => (new Date(fst.date) - new Date(snd.date));
  return lotteryList.sort(sortFunc);
}



export function getLotteryTable ($) {
  let lotteryTables = $("table.results-table");
  if (!lotteryTables || !lotteryTables.length) {
      return null;
  }
  return lotteryTables[0];
}

export function getLotteryMainDrawRow ($, table) {
  // if (!table) return null;
  // return table.querySelector("tbody");
  if (!table) return null;
  let mainDrawRows = $(table).find("tbody");
  if (!mainDrawRows || !mainDrawRows.length) return null;
  return mainDrawRows[0];
}

export function getLotteryEarlyBirdRow ($, table) {
  // if (!table) return null;
  // return table.querySelector("tfoot > tr:first-child > td");
  if (!table) return null;
  let earlyBirdRows = $(table).find("tfoot > tr:first-child > td");
  if (!earlyBirdRows || !earlyBirdRows.length) return null;
  return earlyBirdRows[0];
}

function getLotteryEncoreRow ($, table) {
  // if (!table) return null;
  // return table.querySelector("tfoot > tr:nth-child(2) > td");
  if (!table) return null;
  let encoreRows = $(table).find("tfoot > tr:nth-child(2) > td");
  if (!encoreRows || !encoreRows.length) return null;
  return encoreRows[0];
}

export function getLotteryMainDrawNumbers ($, table) {
  let row = getLotteryMainDrawRow($, table);
  if (!row) return null;
  let mainDrawNumberElements = $(row).find("td.lotcan-number");
  let mainDrawNumbers = getNumbersFromListOfElements($, mainDrawNumberElements);
  return sortNumbersAsc(mainDrawNumbers);
}

export function getLotteryBonusNumber ($, table) {
  // if (!row) return null;
  // var bonusNumberElement = row.querySelector("td.lotcan-bonus");
  // return getNumberFromElementText(bonusNumberElement);
  let row = getLotteryMainDrawRow($, table);
  if (!row) return null;
  let bonusNumberElement = $(row).find("td.lotcan-bonus");
  if (!bonusNumberElement || !bonusNumberElement.length) return null;
  return getNumberFromElementText($)(bonusNumberElement[0]);
}

export function getLotteryEarlyBirdNumbers ($, table) {
  // if (!row) return null;
  // var earlyBirdNumberElements = row.querySelectorAll("span.lotcan-number");
  // var earlyBirdNumbers = getNumbersFromListOfElements(earlyBirdNumberElements);
  // return sortNumbersAsc(earlyBirdNumbers);
  let row = getLotteryEarlyBirdRow($, table);
  if (!row) return null;
  let earlyBirdNumberElements = $(row).find("span.lotcan-number");
  if (!earlyBirdNumberElements || !earlyBirdNumberElements.length) return null;
  let earlyBirdNumbers = getNumbersFromListOfElements($, earlyBirdNumberElements);
  return sortNumbersAsc(earlyBirdNumbers);
}

export function getLotteryEncoreNumber ($, table) {
  // if (!row) return null;
  // var encoreNumberElement = row.querySelector("span.lotcan-label");
  // return getNumberFromElementText(encoreNumberElement);
  let row = getLotteryEncoreRow($, table);
  if (!row) return null;
  let encoreNumberElement = $(row).find("span.lotcan-label");
  if (!encoreNumberElement || !encoreNumberElement.length) return null;
  return getNumberFromElementText($)(encoreNumberElement[0]);
}

export function getPrizePayoutsTable ($) {
  let prizeTables = $(".panel-info .panel-body > table tbody");
  if (!prizeTables || !prizeTables.length) {
      return null;
  }
  return prizeTables[0];
}

export function getPrizeInfoRows ($, table) {
  if (!table) return null;
  let prizeInfoRows = $(table).find("tr");
  if (!prizeInfoRows || !prizeInfoRows.length) return null;
  return prizeInfoRows;
}

export function getPrizeInfo ($, table) {
  let rows = getPrizeInfoRows ($, table);
  if (!rows || !rows.length) return null;
  let info = new Map();
  rows.each((i, row) => {
    let columns = $(row).find("td");
    if (!columns || !columns.length) return;
    let prize = new Map();
    // prize.set("match", $(columns[0]).text());
    prize.set("winners", getNumberFromElementText($)(columns[1]));
    prize.set("prize", getNumberFromCurrencyText($)(columns[2]));
    info.set($(columns[0]).text(), prize);
  });

  return info;
}

export function getStatTable ($) {
  let statTables = $(".panel-warning .panel-body > table tbody");
  if (!statTables || !statTables.length) {
      return null;
  }
  return statTables[0];
}

export function getStatInfoRows ($, table) {
  if (!table) return null;
  let statInfoRows = $(table).find("tr");
  if (!statInfoRows || !statInfoRows.length) return null;
  return statInfoRows;
}

export function getStatInfo ($, table) {
  let rows = getStatInfoRows ($, table);
  if (!rows || !rows.length) return null;
  let info = new Map();
  rows.each((i, row) => {
    let columns = $(row).find("td");
    if (!columns || !columns.length) return;
    let stat = new Map();
    // stat.set("metric", $(columns[0]).text().trim());
    // stat.set("value", getNumberFromCurrencyText($)(columns[1]));
    // info.set($(columns[0]).text().trim(), stat);
    let statValue = i !== 3 ? getNumberFromCurrencyText($)(columns[1]) : $(columns[1]).text().trim();
    info.set($(columns[0]).text().trim(), statValue);
  });

  return info;
}