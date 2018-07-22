import React, { Component } from 'react'
import Calendar from './calendar'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      events: {}
    }
  }

  handleEventAdd = (event) => {
    const { events } = this.state
    if (!events[event.dateKey]) {
      events[event.dateKey] = []
    }
    events[event.dateKey].push(event)
    this.setState({ events })
  }

  render() {
    return (
      <div className="App">
        <Calendar
          defaultMonth="February"
          defaultYear={2018}
          events={this.state.events}
          onEventAdd={this.handleEventAdd}
        />
      </div>
    )
  }
}

export default App