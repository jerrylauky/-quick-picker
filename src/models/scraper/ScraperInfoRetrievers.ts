import ScraperInfo from "./ScraperInfo";

export default class ScraperInfoRetrievers {
  static lottarioScraperInfo () {
    return new ScraperInfo (
      "http://www.lotterycanada.com/ontario-lottario/{drawDate}",
      {
        getLatestDrawResult: false, 
        getAllDrawResults: true
      },
      {
        saveOutputLocally: true,
        outputFile: "/Users/lkam/workspace/quick-picker/src/bin/result.json"
      }
    );
  }
}