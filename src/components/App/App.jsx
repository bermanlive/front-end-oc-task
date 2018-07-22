import React, { Component } from 'react';

import Calendar from './calendar'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar defaultMonth="February" defaultYear={2018} />
      </div>
    );
  }
}

export default App;
