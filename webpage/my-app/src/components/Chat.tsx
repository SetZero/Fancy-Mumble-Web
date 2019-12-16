import React, { ReactElement } from 'react';
import {WebSocketClient} from '../classes/WebSocketClient';
import {ChatBoxProps, ChatBox} from './ChatBox';
import { ChatMessageClass, ChatMessage } from './ChatMessage';

interface ChatProps {
  location: string;
}
interface ChatState {
  value: string;
  username: string;
}

export class Chat extends React.Component<ChatProps, ChatState> {
  private client: WebSocketClient;
  private childRef: React.RefObject<ChatBox> = React.createRef();

  constructor(props: ChatProps) {
    super(props);

    this.client = new WebSocketClient(this.props.location);
    this.state = {value: '', username: 'Demo'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.client.sendMessage(this.state.value);
    this.childRef.current?.addMessage(
      new ChatMessageClass(this.state.username, new Date(), (<p>{this.state.value}</p>))
    );

    this.setState({value: ''});
    event.preventDefault();
  }
  render() {
    return (
      <div className="chat">
        <p>Chat</p>
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