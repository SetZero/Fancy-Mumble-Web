import React, { RefObject } from 'react';
import { Chat } from './Chat';
import ReactDOM from 'react-dom';

export interface ConnectProps {
}

export interface ConnectState {
    username: string
}

export class Connect extends React.Component<ConnectProps, ConnectState> {
    chatRef: RefObject<Chat> = React.createRef();
    wrapper: RefObject<HTMLDivElement> = React.createRef();

    constructor(props: ConnectProps) {
        super(props);
        this.state = {username: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: event.target.value});
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        ReactDOM.render(<Chat ref={this.chatRef}></Chat>, document.getElementById('chatWrapper'));
        this.chatRef.current?.connect("ws://localhost:8080", this.state.username);
        const loginElement = document.getElementById("loginWrapper")
        if(loginElement !== null) {
            loginElement.style.display = "none";
        }
        //<Chat ref={this.chatRef}></Chat>
        //ReactDOM.render(<Chat ref={this.chatRef}></Chat>, this.wrapper);
        //this.wrapper.current?.insertAdjacentElement('afterbegin', <Chat ref={this.chatRef}></Chat>));
        //this.wrapper.current?.insertBefore(<Chat ref={this.chatRef}></Chat>)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div id="loginWrapper">
                    <form onSubmit={this.handleSubmit}>
                    Username:
                    <input value={this.state.username}  onChange={this.handleChange}/>
                    <input type="submit" value="Connect"/>
                    </form>
                </div>
                <div ref={this.wrapper} id="chatWrapper"></div>
            </div>
        )
    }
}