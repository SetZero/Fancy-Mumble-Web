import React, { RefObject } from "react";
import Toast from 'react-bootstrap/Toast';
import ReactDOM from "react-dom";
import LRUCache, {Options} from "lru-cache";

class ToastInfo {
    toastWrapper?: HTMLElement;
    show: boolean = true;
    date: Date;

    constructor(toastWrapper: HTMLElement, show: boolean, date: Date) {
        this.show = show;
        this.toastWrapper = toastWrapper;
        this.date = date;
    }
}

export class ErrorDisplay extends React.Component {
    private errorOverlay: RefObject<HTMLDivElement> = React.createRef();
    private cache: LRUCache<Date, ToastInfo>;

    constructor(props: {}) {
        super(props);
        const option: Options<Date, ToastInfo> = {};
        option.max = 5;
        option.dispose = (k, v) => {
            v.toastWrapper?.remove();
            v.toastWrapper = undefined;
            v.show = true;
        }
        this.cache = new LRUCache(option);

        document.addEventListener("error", ((e: CustomEvent) => {
            var wrapper = document.createElement("DIV");
            this.errorOverlay.current?.appendChild(wrapper);
            const info = new ToastInfo(wrapper, true, new Date());
            const toast = this.showToast(e.detail, info);
            this.cache.set(info.date, info);
            ReactDOM.render(toast, wrapper);
        }) as EventListener);
    }

    showToast(detail: string, info: ToastInfo) {
        return (
            <Toast onClose={() => { this.handleClose(info) }}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Error</strong>
                    <small>2 seconds ago</small>
                </Toast.Header>
                <Toast.Body>{detail}</Toast.Body>
            </Toast>
          )
    }

    private handleClose(info?: ToastInfo) {
        if(info) {
            this.cache.del(info.date);
        }
    }

    render() {
        return(
            <div className="outer_error_wrapper" aria-live="polite" aria-atomic="true">
                <div id="error_overlay" ref={this.errorOverlay}></div>
            </div>
        )
    }
}