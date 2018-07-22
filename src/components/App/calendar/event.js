import React from 'react'

export default (props) => {
  const { date, name } = props
  return (
    <div className="calendar__events__event">
      {date.getDate()} {date.getMonth()} {date.getFullYear()} {date.getHours()}:{date.getMinutes()} - {name}
    </div>
  )
}