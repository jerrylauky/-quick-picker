// node_modules/tsc/bin/tsc --module commonjs --target ES6 --outDir "build/compiled" src/bin/lottery_scraper.ts
// node build/compiled/bin/lottery_scraper.js

import { Lottario, LotteryScraper } from "../models/lottery";
import { ScraperInfoRetrievers } from "../models/scraper";

let lottery = new Lottario();
let scraperInfo = ScraperInfoRetrievers.lottarioScraperInfo();
let scraper = new LotteryScraper(lottery, scraperInfo);
scraper.run();