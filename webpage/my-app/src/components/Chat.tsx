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
  private formRef: React.RefObject<HTMLFormElement> = React.createRef();

  constructor(props: ChatProps) {
    super(props);

    this.state = {value: '', location: '', username: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkSend = this.checkSend.bind(this);
    this.handleHTMLInput = this.handleHTMLInput.bind(this);
  }

  connect(host: string, user: string) {
    let newState = {location: host, username: user};
    this.setState(newState);
    console.log(newState);
    this.mumbleConnection = new Mumble(host, user);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHTMLInput = this.handleHTMLInput.bind(this);
    this.pasteListener = this.pasteListener.bind(this);

    this.mumbleConnection.textMessage.on((data) => {
      let message = (data as TextMessage);
      let username = this.mumbleConnection?.getUserById(message.getActor() as number)?.$username;
      this.addMessage(username, new Date(), message.getMessage())
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

  pasteListener(event: React.ClipboardEvent<HTMLDivElement>) {
    event.persist();
    if(event.clipboardData.files.length > 0 && !event.clipboardData.types.includes("text/html")) {
      console.log(event.clipboardData.files);
      Array.from(event.clipboardData.files).forEach((file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          const img: HTMLImageElement = document.createElement("img");
          img.setAttribute("src", reader.result as string);
          console.log(img);
          (event.target as HTMLDivElement).appendChild(img);
          event.preventDefault();
        }
      });
   };

  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  addMessage(username: string = "unknown", date: Date = new Date(), message: string = "") {
    this.childRef.current?.addMessage(
      new ChatMessageClass(username, date, (<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message)}}></p>))
    );
    this.setState({value: ''});
    this.updateScroll();
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //this.client.sendMessage(this.state.value);
    this.mumbleConnection?.sendMessageToCurrentChannel(this.state.value);
    this.addMessage(this.state.username, new Date(), this.state.value);
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
    console.log(element);
    if(element) element.scrollTop = element.scrollHeight;
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
                  <ContentEditable placeholder="Send message..." html={DOMPurify.sanitize(this.state.value)} onPaste={(e) => this.pasteListener(e)} onChange={this.handleHTMLInput} className="form-control input-box" id="main-text-input" onKeyPressCapture={this.checkSend}/>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}