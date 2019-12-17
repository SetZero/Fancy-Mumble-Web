import React from 'react';
import {Chat} from './components/Chat';
import {  } from './components/ChatBox';
import './App.css';
import {  } from './components/ChatMessage';




const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Chat location="ws://localhost:8080"></Chat>
      </header>
    </div>
  );
}

export default App;
