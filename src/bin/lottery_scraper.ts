// node_modules/tsc/bin/tsc -m "commonjs" --outDir "build/compiled" src/bin/lottery_scraper.ts
// node dist/bin/lottery_scraper.js

import { Lottario, LotteryScraper } from "../models/lottery/index";
import { ScraperInfoRetrievers } from "../models/scraper/index";

let lottery = new Lottario();
let scraperInfo = ScraperInfoRetrievers.lottarioScraperInfo();
let scraper = new LotteryScraper(lottery, scraperInfo);
console.log(lottery);
console.log(scraperInfo);
console.log(scraper);

// scraper.run();