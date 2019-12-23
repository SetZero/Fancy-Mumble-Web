import React from "react";
import { Channel } from "../classes/network/Channel";
import { Mumble } from "../classes/network/Mumble";

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
        this.handleJoin = this.handleJoin.bind(this);
      }

      handleJoin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
        return (<div>
            {Array.from(this.state.channels)
            .filter(e => e[1].$users.length > 0)
            .map(element => {
              //TODO: why is this invisible?
              return (
                <div>
                  <a key={element[1].$id.toString()}>{element[1].$name} ({element[1].$users.length})</a>
                  {element[1].$users.map(user => {
                  return (<div>-> {user.$username} 
                                    {user.$selfDeaf ? "[D]" : ""}
                                    {user.$selfMute ? "[M]" : ""}
                        </div>)
                  })}
                </div>
              )
            })}
            </div>);
      }
}