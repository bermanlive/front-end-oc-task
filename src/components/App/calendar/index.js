import React, { Component } from 'react'

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
    const firstDayThisMonth = new Date(year, months.indexOf(month), 1).getDay()
    console.log(firstDayThisMonth)
    let index = firstDayThisMonth === 0 ? 1 : -firstDayThisMonth + 1
    do {
      let day = new Date(year, months.indexOf(month), index)
      dates.push(day.getDate())
      index++
    } while (dates.length !== rows * days.length)
    return dates
  }



  render() {
    const dates = this.getDatesArray()
    return (
      <div className="calendar">
        <div className="calendar__header">
          <div>{this.state.month}</div>
          <div>{this.state.year}</div>
          <div className="calendar__row calendar__days">
            {days.map(day => <div key={day} className="calendar__cell">{day}</div>)}
          </div>
        </div>
        {(new Array(rows)).fill().map((_, rowIndex) => {
          return (
            <div key={rowIndex} className="calendar__row">
              {(new Array(days.length)).fill().map((_, columnIndex) => {
                const cellIndex = rowIndex * days.length + columnIndex
                return (
                  <div key={cellIndex} className="calendar__cell">
                    {dates[cellIndex]}
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