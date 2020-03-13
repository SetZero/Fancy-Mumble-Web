import React, { RefObject } from 'react';
import { Chat } from './Chat';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { ErrorDisplay } from './ErrorDisplay';

export interface ConnectProps {
}

export interface ConnectState {
    username: string
}

export class Connect extends React.Component<ConnectProps, ConnectState> {
    private chatRef: RefObject<Chat> = React.createRef();
    private wrapper: RefObject<HTMLDivElement> = React.createRef();
    private usernames : Array<string> = this.getPreviousUsernames();

    constructor(props: ConnectProps) {
        super(props);
        this.state = {username: this.usernames[0]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.connectWithPredefined = this.connectWithPredefined.bind(this);
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: event.target.value});
    }

    private buildWebSocketURI() {
        let loc = window.location, new_uri;
        if (loc.protocol === "https:") {
            new_uri = "wss:";
        } else {
            new_uri = "ws:";
        }
        new_uri += "//" + loc.hostname;
        new_uri += ":443" + loc.pathname;
        console.log(new_uri)
        return new_uri;
    }

    private showElement(element: string, style: string = 'block') {
        const loginSpinner = document.getElementById(element);
        if(loginSpinner) loginSpinner.style.display = style;
    }

    private hideElement(element: string) {
        const loginSpinner = document.getElementById(element);
        if(loginSpinner) loginSpinner.style.display = "none";
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.hideElement('chatWrapper');
        this.hideElement('page-info');
        this.showElement('login-spinner', 'inline-block');
        ReactDOM.render(<Chat ref={this.chatRef}></Chat>, document.getElementById('chatWrapper'));
        this.chatRef.current?.connect(this.buildWebSocketURI(), this.state.username);
        this.chatRef.current?.onSuccess(e => {
            this.hideElement('login-spinner');
            this.showElement('chatWrapper');
            const loginElement = document.getElementById("loginWrapper")
            if(loginElement !== null) {
                loginElement.style.display = "none";
            }

            var usernamesString = localStorage.getItem("usernames");
            if(usernamesString) {
                const usernames = JSON.parse(usernamesString);
                if(Array.isArray(usernames)) {
                    let arr = (usernames as Array<String>)
                    while(arr.length >= 5) {
                        arr.pop();
                    }
                    if(!arr.find(e => e === this.state.username)) {
                        arr.unshift(this.state.username);
                        const usernamesJSON = JSON.stringify(arr);
                        localStorage.setItem("usernames", usernamesJSON)
                    }
                }
            } else {
                const usernames = [this.state.username];
                const usernamesJSON = JSON.stringify(usernames);
                localStorage.setItem("usernames", usernamesJSON)
            }
        });

        this.chatRef.current?.onError(e => {
            this.hideElement('login-spinner');
            const loginElement = document.getElementById('login-error-viewer');
            ReactDOM.render(<Alert variant="danger">{e}</Alert>, loginElement);
        })
        //<Chat ref={this.chatRef}></Chat>
        //ReactDOM.render(<Chat ref={this.chatRef}></Chat>, this.wrapper);
        //this.wrapper.current?.insertAdjacentElement('afterbegin', <Chat ref={this.chatRef}></Chat>));
        //this.wrapper.current?.insertBefore(<Chat ref={this.chatRef}></Chat>)
    }

    private connectWithPredefined(event: React.MouseEvent<any>) {
        console.log((event.target as any).dataset.username);
        this.setState({username: (event.target as any).dataset.username});
        event.preventDefault();
    }

    private getPreviousUsernames() : Array<string> {
        var usernamesString = localStorage.getItem("usernames");
        if(usernamesString) {
            const usernames = JSON.parse(usernamesString);
            if(Array.isArray(usernames)) {
                return (usernames as Array<string>);
            }
        }
        return [];
    }

    render() {
        return (
            <div className="h-100">
                <ErrorDisplay></ErrorDisplay>
                <Container className="h-100 row h-100 justify-content-center align-items-center" style={{margin: "0 auto"}}  id="loginWrapper">
                    <Form  onSubmit={this.handleSubmit}>
                        <Row><Col id="login-error-viewer"></Col></Row>
                        <Row >
                        <Col md="auto">
                            <h1 id="login-title">Fancy Mumble Web</h1>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title=""
                                    id="input-group-dropdown-1"
                                    >
                                        {this.usernames.map((element, i) => {
                                            return (
                                                <Dropdown.Item key={i} onClick={this.connectWithPredefined} href="#" data-username={element}>{element}</Dropdown.Item>
                                            )
                                        })}
                                        </DropdownButton>
                                </InputGroup.Prepend>
                                <FormControl
                                onChange={this.handleChange}
                                value={this.state.username}
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />
                                <InputGroup.Append>
                                    <Button type="submit" variant="outline-secondary">
                                        Login
                                        <Spinner id="login-spinner" size="sm" animation="border" variant="info" />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <div ref={this.wrapper} id="chatWrapper"></div>
            </div>
        )
    }
}