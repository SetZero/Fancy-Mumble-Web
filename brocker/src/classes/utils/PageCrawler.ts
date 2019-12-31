import LRUCache, {Options} from "lru-cache";
import { Url } from "url";
import Queue from "better-queue"

class PageInfo {
    
}

export class PageCrawler {
    private cache: LRUCache<string, PageInfo>;
    private requestQueue: Queue<Url, PageInfo> = new Queue((input, cb) => { this.processPage(input, cb); });

    constructor() {
        const option: Options<string, PageInfo> = {};
        option.max = 50;
        option.maxAge = 1000 * 60 * 60;
        //option.length = (n, key) => { return n.length * 2 + key.length; }
        //option.dispose = (key, n) => {}
        this.cache = new LRUCache(option);
    }

    getWebpage(page: Url, callback: (info: PageInfo) => void) {
        console.log("crawling...");
        const pageInfo = this.cache.get(page.toString());
        if(!pageInfo) {
            this.requestQueue
            .push(page)
            .on("finish", (result) => { callback(result) });
        } else {
            callback(pageInfo);
        }
    }

    private processPage(input: Url, cb: Queue.ProcessFunctionCb<PageInfo>) {
        console.log("Crawling: %s", input.hostname);

        const info = new PageInfo();
        this.cache.set(input.toString(), info);

        cb(null, info);
    }
}