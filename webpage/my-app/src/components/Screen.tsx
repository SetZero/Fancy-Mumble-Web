import React from 'react';
import { ScreenShare } from '../classes/network/apps/ScreenShare'
import Row from 'react-bootstrap/Row';



interface ScreenProps {
}
interface ScreenState {
}

export class Screen extends React.Component<ScreenProps, ScreenState> {
    private videoRef: React.RefObject<HTMLVideoElement> = React.createRef();
    private videoContainer: React.RefObject<HTMLDivElement> = React.createRef();
    constructor(props: ScreenProps) {
        super(props);

        /*let share = new ScreenShare();
        let el = share.sendToElement(this.videoRef);
            el.then(() => {this.videoContainer.current?.classList.add("display")})
            .catch(() => {this.videoContainer.current?.classList.remove("display");});*/
    }
    render() {
        return (
            <div className="h-100 container-fluid videoFeed" ref={this.videoContainer}>
                <Row className="justify-content-md-center h-100">
                    <video width="320" height="240" controls ref={this.videoRef}></video>
                </Row>
            </div>
        )
    }
}