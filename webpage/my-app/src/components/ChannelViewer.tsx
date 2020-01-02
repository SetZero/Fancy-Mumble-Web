import React, { RefObject } from "react";
import { Channel } from "../classes/network/Channel";
import { Mumble } from "../classes/network/Mumble";
import { ChannelComponent } from "./Channel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import Fuse from "fuse.js";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface ChannelViewerModalState {
  visibleChannels: Array<Channel>;
  search: string;
}

class ChannelViewerModal extends React.Component<ModalProps, ChannelViewerModalState> {

    private searchList: Array<{ channel: Channel; }> = [];

    constructor(props: ChannelViewerProps) {
        super(props);

        this.state = {visibleChannels: [], search: ""};
        this.searchItem = this.searchItem.bind(this);
    }

    private searchItem(event: React.ChangeEvent<HTMLInputElement>) {
        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [{
              name: "channel.name",
              weight: 0.7
            },
            {
                name: "channel.users.username",
                weight: 0.3
            }]
          };
          var fuse = new Fuse(this.searchList, options); // "list" is the item array
          var result = fuse.search(event.target.value);
          this.setState({visibleChannels: result.map(e => e.channel), search: event.target.value});
    }

    set $channelList(channelList: Map<number, Channel>) {
        //this.setState({visibleChannels: Array.from(channelList.values())});
        this.searchList = Array.from(channelList.values()).map((e) => { return {channel: e} });
    }
    render() {
        return (
        <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Channel Search
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="channelSearchInput">
                        <Form.Label column sm={2}>
                        Search
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control value={this.state.search} onChange={this.searchItem} type="text" placeholder="search channel..." />
                        </Col>
                    </Form.Group>
                </Form>
                    {Array.from(this.state.visibleChannels)
                    .slice(0, 25)
                    .map((element, i) => {
                        return (
                            <ChannelComponent key={i} channelRef={element}></ChannelComponent>
                        )
                    })}
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
    }
  }

interface ChannelViewerProps {
}
interface ChannelViewerState {
  channels: Map<number, Channel>;
  showChannelOverview: boolean;
}

export class ChannelViewer extends React.Component<ChannelViewerProps, ChannelViewerState> {
    private mumbleConnection: Mumble | undefined;
    private channelViewerModalRef: RefObject<ChannelViewerModal> = React.createRef();

    constructor(props: ChannelViewerProps) {
        super(props);

        this.state = {channels: new Map(), showChannelOverview: false};
    }

    set $mumbleConnection(mumbleConnection: Mumble) {
        this.mumbleConnection = mumbleConnection;
        this.mumbleConnection.channelEvent.on(() => {
            if(this.mumbleConnection !== undefined) {
                this.setState({channels: this.mumbleConnection.$channelList});
                const element = this.channelViewerModalRef.current;
                if(element) element.$channelList = this.state.channels;
            }
        })
    }

    render() {
    return (<div id="channel-viewer">
        <Container>
            <Row className="justify-content-md-center h-100">
                <ButtonToolbar>
                    <Button variant="secondary" onClick={() => { this.setState({showChannelOverview: true}) } } size="sm">Search Channel...</Button>
                </ButtonToolbar>
            </Row>
        </Container>
        <Container>
            {Array.from(this.state.channels)
            .filter(e => e[1].$users.length > 0)
            .map((element, i) => {
                return (
                    <ChannelComponent key={i} channelRef={element[1]}></ChannelComponent>
                )
            })}
        </Container>

        <ChannelViewerModal ref={this.channelViewerModalRef} show={this.state.showChannelOverview} onHide={() => this.setState({showChannelOverview: false})} />
        </div>);
    }
}