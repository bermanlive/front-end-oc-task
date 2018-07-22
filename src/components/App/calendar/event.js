import React from 'react'

import { months } from './months.json'

export default (props) => {
  const { date, name } = props
  return (
    <div className="calendar__events__event">
      {date.getDate()} {months[date.getMonth()]} {date.getFullYear()} {date.getHours()}:{date.getMinutes()} - {name}
    </div>
  )
}