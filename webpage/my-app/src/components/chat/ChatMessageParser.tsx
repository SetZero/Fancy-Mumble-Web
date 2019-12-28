import React from "react";
import reactStringReplace from "react-string-replace"
import { SyntaxHighlighter } from "./SyntaxHighlighter";
import ReactDOMServer from 'react-dom/server';
import DOMPurify from "dompurify";

export class ChatMessageParser {
    private static readonly codeBlock: RegExp = /(```([A-Za-z]+)?\n?(.*?)\n?```)/;

    parse(message: string) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = DOMPurify.sanitize(message);
      this.improveLinks(tmp);
      const stripped = tmp.textContent || tmp.innerText || "";

      const plainmessage = stripped;
      const match = plainmessage.match(ChatMessageParser.codeBlock);
      if(match !== null && match.length > 3) {
          const language = match[2];
          const content = match[3];
          let replace = (<SyntaxHighlighter lang={language}>{content}</SyntaxHighlighter>);
          return replace;
      }
      return ((<p dangerouslySetInnerHTML={{__html: tmp.innerHTML}}></p>));
  }
  pasteListener(event: React.ClipboardEvent<HTMLDivElement>) {
    event.persist();
    if(event.clipboardData.files.length > 0 && !event.clipboardData.types.includes("text/html")) {
      Array.from(event.clipboardData.files).forEach((file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          const img: HTMLImageElement = document.createElement("img");
          img.setAttribute("src", reader.result as string);
          (event.target as HTMLDivElement).appendChild(img);
          event.preventDefault();
        }
      });
   }
   /*if(event.clipboardData.types.includes("text/plain")) {
      const element = event.clipboardData.getData("text/plain");
      (event.currentTarget as HTMLDivElement).nodeValue = element;
      event.preventDefault();
    }*/
  }

  private improveLinks(dom: HTMLElement) {
    const links = dom.getElementsByTagName("a");
    Array.from(links).forEach(element => {
      element.setAttribute("target", "_blank");
    });
  }
}