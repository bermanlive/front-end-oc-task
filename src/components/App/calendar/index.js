import React, { Component } from 'react'
import EventForm from './event-form'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
    const todayDate = new Date()
    const firstDayThisMonth = new Date(year, months.indexOf(month), 1).getDay()
    let index = -firstDayThisMonth + 1
    do {
      let day = new Date(year, months.indexOf(month), index)
      const isThisMonth = day.getMonth() === months.indexOf(month)
      const isToday = isThisMonth && (day.getDate() === todayDate.getDate())
      dates.push({
        isToday,
        isThisMonth,
        day: day.getDate()
      })
      index++
    } while (dates.length !== rows * days.length)
    return dates
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

  render() {
    const dates = this.getDatesArray()
    return (
      <div className="calendar">
        <EventForm
          target={this.state.eventFormTarget}
          visible={this.state.eventFormVisible}
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
        {(new Array(rows)).fill().map((_, rowIndex) => {
          return (
            <div key={rowIndex} className="calendar__row">
              {(new Array(days.length)).fill().map((_, columnIndex) => {
                const cellIndex = rowIndex * days.length + columnIndex
                const cellActiveClass = dates[cellIndex].isToday ? 'calendar__cell--today' : ''
                const cellThisMonthClass = dates[cellIndex].isThisMonth ? 'calendar__cell--this-month' : ``
                return (
                  <div
                    key={cellIndex}
                    className={`calendar__cell ${cellActiveClass} ${cellThisMonthClass}`}
                    onClick={this.handleDayClick}
                  >
                    {dates[cellIndex].day}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Calendar