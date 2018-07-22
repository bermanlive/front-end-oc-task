import React, { Component } from 'react'
import EventForm from './event-form'
import Event from './event'

import { months } from './months.json'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const rows = 6

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      year: props.defaultYear,
      month: props.defaultMonth
    }
  }

  getDatesArray() {
    const { year, month } = this.state
    const dates = []
    const firstDayThisMonth = new Date(year, months.indexOf(month), 1).getDay()
    let index = -firstDayThisMonth + 1
    do {
      let date = new Date(year, months.indexOf(month), index)
      dates.push(date)
      index++
    } while (dates.length !== rows * days.length)
    return dates
  }

  isDateThisMonth(date) {
    return date.getMonth() === months.indexOf(this.state.month)
  }

  isDateToday(date) {
    return this.isDateThisMonth(new Date()) && (date.getDate() === (new Date()).getDate())
  }

  handlePrevMonth = () => {
    let { year, month } = this.state
    const monthIndex = months.indexOf(month)
    if (monthIndex === 0) {
      year = year - 1
      month = months[months.length - 1]
    } else {
      month = months[monthIndex - 1]
    }
    this.setState({
      year,
      month
    })
  }

  handleNextMonth = () => {
    let { year, month } = this.state
    const monthIndex = months.indexOf(month)
    if (monthIndex === months.length - 1) {
      year = year + 1
      month = months[0]
    } else {
      month = months[monthIndex + 1]
    }
    this.setState({
      year,
      month
    })
  }

  handleDayClick = (event) => {
    this.setState({
      eventFormTarget: event.target,
      eventFormVisible: true
    })
  }

  handleEventSave = (event) => {
    const dateParts = event.date.split('/')
    console.log(dateParts)
    this.props.onEventAdd({
      dateKey: `${dateParts[1]}/${dateParts[2]}`,
      date: new Date(...dateParts.reverse(), event.hour, event.minute),
      name: event.name
    })
    this.setState({
      eventFormVisible: false
    })
  }

  sortEvents = (events) => {
    return events
  }

  render() {
    const dates = this.getDatesArray()
    const eventsKey = `${months.indexOf(this.state.month)}/${this.state.year}`
    const events = this.sortEvents(this.props.events[eventsKey] || [])
    return (
      <div className="calendar">
        <EventForm
          target={this.state.eventFormTarget}
          visible={this.state.eventFormVisible}
          onSave={this.handleEventSave}
        />
        <div className="calendar__header">
          <div>{this.state.month}</div>
          <div>{this.state.year}</div>
          <button onClick={this.handlePrevMonth}>Prev month</button>
          <button onClick={this.handleNextMonth}>Next month</button>
          <div className="calendar__row calendar__week">
            {days.map(day => <div key={day} className="calendar__week-cell">{day.substring(0, 2)}</div>)}
          </div>
        </div>
        {(new Array(rows)).fill().map((_, row) => {
          return (
            <div key={row} className="calendar__row">
              {(new Array(days.length)).fill().map((_, column) => {
                const index = row * days.length + column
                const todayClass = this.isDateToday(dates[index]) ? 'calendar__cell--today' : ''
                const thisMonthClass = this.isDateThisMonth(dates[index]) ? 'calendar__cell--this-month' : ``
                const formattedDate = `${dates[index].getDate()}/${dates[index].getMonth()}/${dates[index].getFullYear()}`
                return (
                  <div
                    key={index}
                    className={`calendar__cell ${todayClass} ${thisMonthClass}`}
                    onClick={this.handleDayClick}
                    data-date={formattedDate}
                  >
                    {dates[index].getDate()}
                  </div>
                )
              })}
            </div>
          )
        })}
        <div className="calendar__events-list">
          {events.map((event, index) => <Event key={`event_${index}`} {...event} />)}
        </div>
      </div>
    )
  }
}

export default Calendar