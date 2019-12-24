import React from "react";
import { Channel } from "../classes/network/Channel";

interface ChannelProps {
    channelRef: Channel;
}
interface ChannelState {
  channels: Map<number, Channel>;
}

export class ChannelComponent extends React.Component<ChannelProps, ChannelState> {

    constructor(props: ChannelProps) {
        super(props);

        this.state = {channels: new Map()};
        this.handleJoin = this.handleJoin.bind(this);
    }

    handleJoin(event: React.FormEvent<HTMLDivElement>) {
        this.props.channelRef.join();
        event.preventDefault();
    }

    render() {
        return (<div onClick={this.handleJoin}>
            {this.props.channelRef.$name} ({this.props.channelRef.$users.length})
            {this.props.channelRef.$users.map((user, i) => {
            return (<div key={i}> -> {user.$username}
                            {user.$selfDeaf ? "[D]" : ""}
                            {user.$selfMute ? "[M]" : ""}
                </div>)
            })}
            </div>)
    }
}

/**/