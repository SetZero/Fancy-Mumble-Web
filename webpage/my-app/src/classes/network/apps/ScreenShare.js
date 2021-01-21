export class ScreenShare {
    startCapture() {
        let settings = {
            "video": {
                "frameRate": 60,
                "resizeMode": "crop-and-scale",
                "cursor": "always",
                "logicalSurface": true
            },
            "audio": true,
        };

        return navigator.mediaDevices.getDisplayMedia(settings)
           .catch(err => { console.error("Error:" + err); return err; });
    }

    sendToElement(htmlElement) {
        let capture = this.startCapture();

        return capture.then((screen) => {
            console.log(screen);
            htmlElement.current.autoplay = true;
            htmlElement.current.srcObject = screen;
            return Promise.resolve(screen);
        }).catch((e) => { return Promise.reject(e); });
    }
}