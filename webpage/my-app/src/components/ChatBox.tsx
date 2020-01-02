import React, { ReactElement } from 'react';
import { ChatMessageClass, ChatMessage } from './ChatMessage';

export interface ChatBoxProps {
    children: Array<ReactElement<ChatMessageClass>> | ReactElement<ChatMessageClass>;
}
interface ChatBoxState {
    messages: Array<ChatMessageClass>;
}

export class ChatBox extends React.Component<ChatBoxProps, ChatBoxState> {
    constructor(props: ChatBoxProps) {
        super(props);
        this.state = {messages: []};
    }

    addMessage(message: ChatMessageClass) {
        this.state.messages.push(message);
    }

    render() {
        let children = new Array<JSX.Element>();

        this.state.messages.forEach((element, i) =>  {
            children.push(<ChatMessage user={element.user} timestamp={element.timestamp.toUTCString()} key={i}>{element.message}</ChatMessage>);
        });

        return (
            <div>
                {children}
                {this.props.children}
            </div>
        )
    }
}