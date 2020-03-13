import React from 'react';
import {  } from './components/ChatBox';
import {  } from './components/ChatMessage';
import { Connect } from './components/Connect';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';




const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <Connect></Connect>
      </div>
    </div>
  );
}

export default App;
