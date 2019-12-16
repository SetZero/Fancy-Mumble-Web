import React from 'react';
import {WebSocketClient} from '../classes/WebSocketClient'

interface ChatProps {
  location: string
}
interface ChatState {
  value: string
}

export class Chat extends React.Component<ChatProps, ChatState> {
  private client: WebSocketClient;

  constructor(props: ChatProps) {
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
          {this.props.children}
          <input onChange={this.handleChange} value={this.state.value}/>
        </form>
      </div>
    )
  }
}