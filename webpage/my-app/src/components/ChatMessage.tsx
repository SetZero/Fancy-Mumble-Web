import React from 'react';

interface ChatMessageProps {
    username: string;
    timestamp: number;
}
interface ChatMessageState {
    message: HTMLBaseElement;
}

export class ChatMessage extends React.Component<ChatMessageProps, ChatMessageState> {

}