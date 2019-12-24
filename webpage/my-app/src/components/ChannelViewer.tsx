import React from "react";
import { Channel } from "../classes/network/Channel";
import { Mumble } from "../classes/network/Mumble";
import { ChannelComponent } from "./Channel";

interface ChannelViewerProps {
}
interface ChannelViewerState {
  channels: Map<number, Channel>;
}

export class ChannelViewer extends React.Component<ChannelViewerProps, ChannelViewerState> {
    private mumbleConnection: Mumble | undefined;

    constructor(props: ChannelViewerProps) {
        super(props);

        this.state = {channels: new Map()};
    }

    set $mumbleConnection(mumbleConnection: Mumble) {
    this.mumbleConnection = mumbleConnection;
    this.mumbleConnection.channelEvent.on(() => {
        if(this.mumbleConnection !== undefined) {
            this.setState({channels: this.mumbleConnection.$channelList});
        }
        })
    }

    render() {
    return (<div id="channel-viewer">
        {Array.from(this.state.channels)
        .filter(e => e[1].$users.length > 0)
        .map((element, i) => {
            return (
                <ChannelComponent key={i} channelRef={element[1]}></ChannelComponent>
            )
        })}
        </div>);
    }
}