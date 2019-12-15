import React from 'react';
import {ChatBox} from './components/ChatBox';
import './App.css';




const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBox></ChatBox>
      </header>
    </div>
  );
}

export default App;
