import React from 'react';
import {Chat} from './components/Chat';
import { ChatBox } from './components/ChatBox';
import './App.css';




const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Chat location="ws://localhost:8080">
          <ChatBox></ChatBox>
        </Chat>
      </header>
    </div>
  );
}

export default App;
