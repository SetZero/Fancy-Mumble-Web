import React, { ReactElement } from 'react';

export class ChatMessageClass {
    username: string;
    timestamp: Date;
    message: ReactElement;

    constructor(username: string, timestamp: Date, message: ReactElement) {
        this.username = username;
        this.timestamp = timestamp;
        this.message = message;
    }
}

interface ChatMessageProps {
    username: string;
    timestamp: string;
}
interface ChatMessageState {
}

export class ChatMessage extends React.Component<ChatMessageProps, ChatMessageState> {
    render() {
        return (
            <div className="message">
                <span className="message-header"><b>{this.props.username}</b> - {this.props.timestamp}</span>
                <div className="inner-message">{this.props.children}</div>
            </div>
        )
    }
}