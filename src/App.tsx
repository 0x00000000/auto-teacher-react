import React from 'react';

import './App.css';

import {TASK_TYPE_ADDICTION} from "./types";
import Training from './components/training';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Training
            tasksDefaultType={TASK_TYPE_ADDICTION}
        />
      </header>
    </div>
  );
}

export default App;
