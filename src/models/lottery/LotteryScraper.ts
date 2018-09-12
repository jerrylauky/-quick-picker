import moment from "moment";
import request from "request-promise";
import cheerio from "cheerio";
import { getLotteryEncoreNumber, getLotteryBonusNumber } from "../../libs";
import { getLotteryTable, getLotteryEarlyBirdNumbers } from "../../libs";
import { getLotteryMainDrawNumbers, getStatInfo } from "../../libs";
import { getPrizePayoutsTable, getPrizeInfo, getStatTable } from "../../libs";
import { mapToObjectDeep } from "../../libs";
import Lottery from "./Lottery";
import { ScraperInfo } from "../scraper";
import FileReader from "../FileReader";
import CloudReader from "../CloudReader";

// http://www.netinstructions.com/simple-web-scraping-with-node-js-and-javascript/

export default class LotteryScraper {
  lottery: Lottery;
  config: ScraperInfo;
  drawResult: Map<{}, {}>;

  constructor (lottery: Lottery, scraperInfo: ScraperInfo) {
    this.lottery = lottery;
    this.config = scraperInfo;
    this.drawResult = new Map();
  }

  public getDrawResult (drawDate: Date): string | object {
    let result;
    let formattedDrawDate = moment(drawDate).format("YYYY-MM-DD");
    let targetUrl = this.config.getTargetUrl(new Map([["{drawDate}", formattedDrawDate]]));

    console.log("requesting " + formattedDrawDate);
    return request({
      uri: targetUrl,
      transform: function (body) {
        return cheerio.load(body);
      }
    }).then(function ($) {
      let lotteryTable = getLotteryTable($);
      let prizeTable = getPrizePayoutsTable($);
      let statTable = getStatTable($);
      let mainDrawNumbers = getLotteryMainDrawNumbers($, lotteryTable);
      let bonusNumber = getLotteryBonusNumber($, lotteryTable);
      let mainDrawAndBonusNumbers = Array.from(mainDrawNumbers);
      mainDrawAndBonusNumbers.splice(mainDrawAndBonusNumbers.length, 0, bonusNumber);
      mainDrawAndBonusNumbers.sort((a, b) => a - b);
      let result = {
        drawDate: formattedDrawDate,
        mainDrawNumbers: mainDrawNumbers,
        bonusNumber: bonusNumber,
        mainDrawAndBonusNumbers: mainDrawAndBonusNumbers,
        earlyBirdNumbers: getLotteryEarlyBirdNumbers($, lotteryTable),
        encoreNumber: getLotteryEncoreNumber($, lotteryTable),
        prizePayouts: getPrizeInfo($, prizeTable),
        statistics: getStatInfo($, statTable)
      };
      return result;
    }, function (err) {
      console.log("request err", formattedDrawDate, err);
    });
  }

  public saveDrawResult (reader: FileReader | CloudReader): void {
    let resultObject = mapToObjectDeep(this.drawResult);
    let parsedContent = JSON.stringify(resultObject);
    reader.write(parsedContent);
  }

  run (): void {
    let { outputOptions, drawOptions: { getLatestDrawResult, getAllDrawResults } } = this.config;
    let { saveOutputLocally } = outputOptions;
    let lastDrawDate = this.lottery.getLastDrawDate();

    let that = this;
    let drawRequests = [];
    let drawDates = [];
    if (getLatestDrawResult) {
      drawRequests.push(this.getDrawResult(lastDrawDate));
      drawDates.push(lastDrawDate);
    } else if (getAllDrawResults) {
      // let firstDrawDate = this.lottery.getFirstDrawDate();
      // let firstDrawDate = 1496293200000; // 2017-06-01
      // let firstDrawDate = 1533099600000 // 2018-08-01
      let firstDrawDate = 1535774400000 // 2018-09-01
      let drawDate = lastDrawDate;
      console.log(new Date(firstDrawDate));
      console.log(new Date(lastDrawDate));
      while (drawDate >= firstDrawDate) {
        drawDates.push(drawDate);
        console.log(new Date(drawDate));
        drawDate = this.lottery.getPrevDrawDate(drawDate);
      }
      console.log(drawDates);

      drawRequests = drawDates.reduce(function (promise, currentDrawDate, index) {
        return promise.then(function (previousDrawResult) {
          return new Promise(resolve => setTimeout(function () {
            return that.getDrawResult(currentDrawDate).then(function (currentDrawResult) {
              console.log(currentDrawDate);
              console.log(currentDrawResult);
              that.drawResult.set(currentDrawDate, currentDrawResult);
              resolve(currentDrawResult);
            });
          }, 3000));
        })
      }, Promise.resolve());

      drawRequests.then(function (finalResult) {
        console.log("=====finalResult=====");
        console.log(that.drawResult);
        if (saveOutputLocally) {
          let fileReader = new FileReader(outputOptions);
          that.saveDrawResult(fileReader);
        }
      });
    }
  }
}