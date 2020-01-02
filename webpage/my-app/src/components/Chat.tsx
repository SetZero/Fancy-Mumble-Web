import React from 'react';
import DOMPurify from 'dompurify';
import {ChatBox} from './ChatBox';
import { ChatMessageClass } from './ChatMessage';
import {Mumble} from "../classes/network/Mumble";
import { TextMessage, ServerConfig } from '../generated/Mumble_pb';
import { ChannelViewer } from './ChannelViewer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ContentEditable, { ContentEditableEvent }  from 'react-contenteditable';
import { User } from '../classes/network/User';
import { ChatMessageParser } from './chat/ChatMessageParser';
import { WebSocketClient } from '../classes/WebSocketClient';

interface ChatProps {
}
interface ChatState {
  value: string;
  location: string;
  selfUser: User | undefined;
}

export class Chat extends React.Component<ChatProps, ChatState> {
  private childRef: React.RefObject<ChatBox> = React.createRef();
  private channelViewerRef: React.RefObject<ChannelViewer> = React.createRef();
  private formRef: React.RefObject<HTMLFormElement> = React.createRef();

  private helperConnection: WebSocketClient<string> | undefined;
  private mumbleConnection: Mumble | undefined;
  private messageParser: ChatMessageParser = new ChatMessageParser();

  constructor(props: ChatProps) {
    super(props);

    this.state = {value: '', location: '', selfUser: undefined};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkSend = this.checkSend.bind(this);
    this.handleHTMLInput = this.handleHTMLInput.bind(this);
  }

  connect(host: string, user: string) {
    this.mumbleConnection = new Mumble(host, user);
    this.helperConnection = new WebSocketClient(host + "helper", "" as string, true);
    this.messageParser.$helperConnection = this.helperConnection;

    this.mumbleConnection.serverConfigEvent.on((e) => {
      let newState = {location: host, selfUser: this.mumbleConnection?.$userList.get(this.mumbleConnection.$mySessionID ?? -1)};
      this.setState(newState);
    })


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHTMLInput = this.handleHTMLInput.bind(this);
    this.messageParser.pasteListener = this.messageParser.pasteListener.bind(this);

    this.mumbleConnection.textMessage.on((data) => {
      let message = (data as TextMessage);
      let user = this.mumbleConnection?.getUserById(message.getActor() as number);
      if(user) {
        this.addMessage(user, new Date(), message.getMessage())
      }
    });
    if(this.channelViewerRef.current) {
      this.channelViewerRef.current.$mumbleConnection = this.mumbleConnection;
    }
  }

  handleHTMLInput(event: ContentEditableEvent) {
    this.setState({value: event.target.value.toString()});
  }

  checkSend(event: React.KeyboardEvent<HTMLDivElement>) {
      if(event.key === "Enter") {
        if(!event.shiftKey && !event.ctrlKey) {
        this.formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }));
        event.preventDefault();
      }
    }
  }


  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  addMessage(user: User, date: Date = new Date(), message: string = "") {
    const output = this.messageParser.parse(message);
    this.childRef.current?.addMessage(
      new ChatMessageClass(user, date, output)
    );
    this.setState({value: ''});
    this.updateScroll();
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //this.client.sendMessage(this.state.value);
    this.mumbleConnection?.sendMessageToCurrentChannel(this.state.value);
    if(this.state.selfUser) {
      this.addMessage(this.state.selfUser, new Date(), this.state.value);
    }
    event.preventDefault();
  }

  public onError(handler: (data?: string | undefined) => void) {
    this.mumbleConnection?.rejectEvent.on(handler);
  }

  public onSuccess(handler: (data?: ServerConfig | undefined) => void) {
    this.mumbleConnection?.serverConfigEvent.on(handler);
  }


  private updateScroll(){
    var element = document.getElementById("chat-content");
    if(element) element.scrollTop = element.scrollHeight;
  }

  private pasteEvent(e: React.ClipboardEvent<HTMLDivElement>) {
    this.messageParser.pasteListener(e, this.messageParser);
  }

  render() {
    return (
      <Container fluid={true} className="h-100">
        <Row className="justify-content-md-center h-100">
          <Col xs lg="4" id="sidebar">
            <ChannelViewer ref={this.channelViewerRef}></ChannelViewer>
          </Col>
          <Col lg="8" id="h-100">
            <Row id="chat-content">
              <Col lg="12">
                {this.props.children}
                <ChatBox ref={this.childRef}>
                </ChatBox>
              </Col>
            </Row>
            <Row id="chat-input">
              <Col lg="12">
                <form onSubmit={this.handleSubmit} ref={this.formRef}>
                  <Form.Control onChange={this.handleChange} value={this.state.value} hidden/>
                  <ContentEditable placeholder="Send message..." html={DOMPurify.sanitize(this.state.value)} onPaste={(e) => {this.pasteEvent(e)} } onChange={this.handleHTMLInput} className="form-control input-box" id="main-text-input" onKeyPressCapture={this.checkSend}/>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}