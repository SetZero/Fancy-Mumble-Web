import React from 'react';
import DOMPurify from 'dompurify';
import {ChatBox} from './ChatBox';
import { ChatMessageClass } from './ChatMessage';
import {Mumble} from "../classes/network/Mumble";
import { TextMessage } from '../generated/Mumble_pb';
import { ChannelViewer } from './ChannelViewer';

interface ChatProps {
}
interface ChatState {
  value: string;
  location: string;
  username: string;
}

export class Chat extends React.Component<ChatProps, ChatState> {
  private childRef: React.RefObject<ChatBox> = React.createRef();
  private mumbleConnection: Mumble | undefined;
  private channelViewerRef: React.RefObject<ChannelViewer> = React.createRef();

  constructor(props: ChatProps) {
    super(props);

    this.state = {value: '', location: '', username: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  connect(host: string, user: string) {
    let newState = {location: host, username: user};
    this.setState(newState);
    console.log(newState);
    this.mumbleConnection = new Mumble(host, user);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mumbleConnection.textMessage.on((data) => {
      let message = (data as TextMessage);
      let username = this.mumbleConnection?.getUserById(message.getActor() as number)?.$username;
      this.addMessage(username, new Date(), message.getMessage())
    });
    if(this.channelViewerRef.current) {
      this.channelViewerRef.current.$mumbleConnection = this.mumbleConnection;
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
  }

  addMessage(username: string = "unknown", date: Date = new Date(), message: string = "") {
    this.childRef.current?.addMessage(
      new ChatMessageClass(username, date, (<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message)}}></p>))
    );
    this.setState({value: ''});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //this.client.sendMessage(this.state.value);
    this.mumbleConnection?.sendMessage(this.state.value);
    this.addMessage(this.state.username, new Date(), this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div className="chat">
        <p>Chat</p>
        <div className="channel-list">
        <ChannelViewer ref={this.channelViewerRef}></ChannelViewer>
        </div>
        {this.props.children}
        <ChatBox ref={this.childRef}>
        </ChatBox>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.value}/>
        </form>
      </div>
    )
  }
}