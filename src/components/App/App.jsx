import React, { Component } from 'react'
import Calendar from './calendar'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      events: this.getEventsFromStorage()
    }
  }

  getEventsFromStorage = () => {
    const events = JSON.parse(localStorage.getItem('events'))
    if (!events) {
      return {}
    }
    return Object.keys(events).reduce((parsedEvents, key) => {
      parsedEvents[key] = events[key].map(event => {
        event.date = new Date(event.date)
        return event
      })
      return events
    }, {})
  }

  addEventToStorage = (event) => {
    const events = this.getEventsFromStorage()
    if (!events[event.dateKey]) {
      events[event.dateKey] = []
    }
    events[event.dateKey].push(event)
    localStorage.setItem('events', JSON.stringify(events))
  }

  handleEventAdd = (event) => {
    const { events } = this.state
    if (!events[event.dateKey]) {
      events[event.dateKey] = []
    }
    events[event.dateKey].push(event)
    this.setState({
      events
    })
    this.addEventToStorage(event)
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