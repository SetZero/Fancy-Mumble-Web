import React from 'react';
import {ChatBox} from './components/ChatBox';
import './App.css';




const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBox location="ws://localhost:8080"></ChatBox>
      </header>
    </div>
  );
}

export default App;
