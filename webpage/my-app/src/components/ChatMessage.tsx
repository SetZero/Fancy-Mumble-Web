import React, { ReactElement } from 'react';
import { User } from '../classes/network/User';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export class ChatMessageClass {
    user: User;
    timestamp: Date;
    message: ReactElement;

    constructor(username: User, timestamp: Date, message: ReactElement) {
        this.user = username;
        this.timestamp = timestamp;
        this.message = message;
    }
}

interface ChatMessageProps {
    user: User;
    timestamp: string;
}
interface ChatMessageState {
}

export class ChatMessage extends React.Component<ChatMessageProps, ChatMessageState> {
    render() {
        return (
            <Container className="message">
                <Row>
                    <Col lg="1" className="justify-content-center align-items-center">
                        <Image src={this.props.user.$texture} rounded fluid/>
                    </Col>
                    <Col>
                        <span className="message-header"><b>{this.props.user.$username}</b> - {this.props.timestamp}</span>
                        <div className="inner-message">{this.props.children}</div>
                    </Col>
                </Row>
            </Container>
        )
    }
}