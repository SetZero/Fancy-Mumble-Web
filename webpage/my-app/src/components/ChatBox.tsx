import React from 'react';
import {WebSocketClient} from '../classes/WebSocketClient'

interface ChatBoxProps {
  location: string
}
interface ChatBoxState {
  value: string
}

export class ChatBox extends React.Component<ChatBoxProps, ChatBoxState> {
  private client: WebSocketClient;

  constructor(props: ChatBoxProps) {
    super(props);

    this.client = new WebSocketClient(this.props.location);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.client.sendMessage(this.state.value);
    this.setState({value: ''});
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Chat</p>
          <input onChange={this.handleChange} value={this.state.value}/>
        </form>
      </div>
    )
  }
}