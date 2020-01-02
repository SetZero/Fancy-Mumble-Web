import LRUCache, {Options} from "lru-cache";
import { Url } from "url";
import Queue from "better-queue"
import * as url from "url";

var fetchVideoInfo = require('youtube-info');

class PageInfo {
    title: string;
    description: string;
    image: Url;
    link: Url;


	constructor(title: string, description: string, image: Url, link: Url) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.link = link;
	}
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
        const pageInfo = this.cache.get(page.href ?? "");
        if(!pageInfo) {
            this.requestQueue
            .push(page)
            .on("finish", (result) => { callback(result) });
        } else {
            callback(pageInfo);
        }
    }

    private processPage(input: Url, cb: Queue.ProcessFunctionCb<PageInfo>) {

        switch(input.hostname) {
            case "www.youtube.com":
                this.handleYoutube(input, (info) => {
                    this.cache.set(input.href ?? "", info);
                    cb(null, info);
                });
                break;
            default:
        }

    }
    handleYoutube(input: Url, cb: (info: PageInfo) => void) {
        const query = input.query as any;
        if(query) {
            console.log("Query!");
            fetchVideoInfo(query.v, (err: any, videoInfo: any) => {
                if(videoInfo) {
                    cb(new PageInfo(videoInfo.title, videoInfo.description, url.parse(videoInfo.thumbnailUrl), url.parse(videoInfo.url)));
                }
            });
        }
    }
}