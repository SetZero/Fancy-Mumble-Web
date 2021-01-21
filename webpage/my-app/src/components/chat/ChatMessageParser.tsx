import React from "react";
import { SyntaxHighlighter } from "./SyntaxHighlighter";
import DOMPurify from "dompurify";
import { WebSocketClient } from "../../classes/WebSocketClient";
import Card from 'react-bootstrap/Card';
import ReactDOM from "react-dom";

export class ChatMessageParser {
    private static readonly codeBlock: RegExp = /(```([A-Za-z]+)?\n?((?:.|\n)*?)\n?```)/;
    private helperConnection: WebSocketClient<string> | undefined;
    private eventMap = new Map<number, HTMLElement | React.RefObject<HTMLElement>>();

    /**
     * Getter $helperConnection
     * @return {WebSocketClient<string>}
     */
	public get $helperConnection(): WebSocketClient<string> | undefined {
		return this.helperConnection;
    }

    public set $helperConnection(value: WebSocketClient<string> | undefined)  {
        this.helperConnection = value;
        this.helperConnection?.addMessageListener((data) => {
            const message = JSON.parse(data as string);
            const element = this.eventMap.get(message.timestamp);
            this.eventMap.delete(message.timestamp);

            if(message.messageType === "error") {
                document.dispatchEvent(new CustomEvent("error", { detail: message.payload }));
                return;
            }

            if(message.messageType === "link") {
                var tmp = document.createElement("DIV");
                tmp.innerHTML = (message.payload.description as string);

                const content = (<Card style={{ width: '18rem' }}>
                            <a target="_blank" href={message.payload.link.href} rel="noopener noreferrer">
                                <Card.Img variant="top" src={message.payload.image.href} />
                            </a>
                            <Card.Body>
                            <Card.Title>
                                <a target="_blank" href={message.payload.link.href} rel="noopener noreferrer">
                                    {message.payload.title}
                                </a>
                            </Card.Title>
                            <Card.Text>
                                {tmp.innerText.substr(0, 150)}
                            </Card.Text>
                            </Card.Body>
                        </Card>);
                const container = (element as React.RefObject<HTMLElement>)?.current;
                if(container) {
                    ReactDOM.render(content, container);
                }
                return;
            }

            const link: HTMLAnchorElement = document.createElement("a");
            link.setAttribute("href", message.payload);
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
            const img: HTMLImageElement = document.createElement("img");
            img.setAttribute("src", message.payload);
            link.appendChild(img);
            link.append("(Image)");
            (element as HTMLElement)?.appendChild(link);

            console.log(message.payload);
        })
    }

    parse(message: string) {
        message = message.replace(/<br\s*[\/]?>/gi, "\n");
        let insertRef: React.RefObject<HTMLDivElement> = React.createRef();
        var tmp = document.createElement("DIV");
        tmp.innerHTML = DOMPurify.sanitize(message);
        this.findLinks(tmp);
        this.improveLinks(tmp, insertRef);
        const stripped = tmp.innerText || tmp.textContent || "";

        const plainmessage = stripped;
        const match = plainmessage.match(ChatMessageParser.codeBlock);
        if(match !== null && match.length > 3) {
            const language = match[2];
            const content = match[3];
            let replace = (<SyntaxHighlighter lang={language}>{content}</SyntaxHighlighter>);
            return replace;
        }
        return (<div ref={insertRef} dangerouslySetInnerHTML={{__html: tmp.innerHTML}}></div>);
    }

    pasteListener(event: React.ClipboardEvent<HTMLDivElement>, self: ChatMessageParser) {
        event.persist();
        if(event.clipboardData.files.length > 0 && !event.clipboardData.types.includes("text/html")) {
            event.preventDefault();
            Array.from(event.clipboardData.files).forEach((file) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const date = Date.now();
                    self.helperConnection?.sendMessage(JSON.stringify({messageType: "image",
                                                                        host: window.location.hostname,
                                                                        protocol: window.location.protocol,
                                                                        type: file.type,
                                                                        payload: reader.result,
                                                                        timestamp: date}));
                    self.eventMap.set(date, event.target as HTMLElement);
                }
            });
        }
    }

    private findLinks(text: HTMLElement) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const checkItems = Array.from(text.childNodes);
        checkItems.filter((e) => e.nodeType !== Node.TEXT_NODE).forEach((e) => this.findLinks(e as HTMLElement));
        checkItems.push(text);
        checkItems.filter((e) => e.nodeType === Node.TEXT_NODE).forEach((e) => {
            const newContent = e.textContent?.replace(urlRegex, function(url) {
                return '<a href="' + url + '">' + url + '</a>';
            }) ?? ""
            const container = document.createElement("span");
            container.innerHTML = newContent;
            e.textContent = "";
            e.parentElement?.appendChild(container);
        })
    }

    private improveLinks(dom: HTMLElement, ref: React.RefObject<HTMLElement>) {
        const links = dom.getElementsByTagName("a");
        Array.from(links).forEach(element => {
            element.setAttribute("target", "_blank");
            const location = element.getAttribute("href");
            if(location) {
                const date = Date.now();
                this.helperConnection?.sendMessage(JSON.stringify({messageType: "link", payload: location, timestamp: date}));
                this.eventMap.set(date, ref);
            }
        });
    }
}