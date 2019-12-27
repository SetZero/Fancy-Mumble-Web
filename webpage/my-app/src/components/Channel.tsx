import React from "react";
import { Channel } from "../classes/network/Channel";
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

interface ChannelProps {
    channelRef: Channel;
}
interface ChannelState {
  channels: Map<number, Channel>;
}

export class ChannelComponent extends React.Component<ChannelProps, ChannelState> {
    private readonly maxChannelLength = 35;

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
            <span className="channel-info">{this.props.channelRef.$name.substring(0, this.maxChannelLength)}</span>
            <Badge pill variant="info">{this.props.channelRef.$users.length}</Badge>
            {this.props.channelRef.$users.map((user, i) => {
            return (<div key={i}>
                            <Image width="20" height="20" src={user.$texture} roundedCircle />
                            <span className="channel-user-info">
                                {user.$username}
                                {user.$selfDeaf ? "[D]" : ""}
                                {user.$selfMute ? "[M]" : ""}
                            </span>
                </div>)
            })}
            </div>)
    }
}

/**/