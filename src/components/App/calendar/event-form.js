import React, { Component } from 'react'

class EventForm extends Component {

  state = {
    hour: '',
    minute: '',
    name: ''
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.align(this.state.target)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.target) {
      this.align(nextProps.target)
    }
  }

  align(target) {
    if (target) {
      const targetRect = target.getBoundingClientRect()
      const popupRect = this.ref.getBoundingClientRect()
      this.setState({
        target,
        x: targetRect.x - (popupRect.width / 2) + (targetRect.width / 2),
        y: targetRect.y + targetRect.height + 10
      })
    }
  }

  handleSetRef = (ref) => {
    this.ref = ref
  }

  handleChangeHour = (event) => {
    this.setState({
      hour: event.target.value
    })
  }

  handleChangeMinute = (event) => {
    this.setState({
      minute: event.target.value
    })
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleSaveButtonClick = () => {
    this.props.onSave({
      date: this.props.target.getAttribute('data-date'),
      hour: this.state.hour,
      minute: this.state.minute,
      name: this.state.name
    })
    this.setState({
      hour: '',
      minute: '',
      name: ''
    })
  }

  render() {
    return (
      <div
        className="calendar__event-form"
        ref={this.handleSetRef}
        style={{
          left: this.state.x,
          top: this.state.y,
          visibility: this.props.visible ? 'visible' : 'hidden'
        }}
      >
        <div className="calendar__event-form__arrow-up"></div>
        <div className="calendar__event-form__time">
          <input
            type="number"
            placeholder="Hour"
            value={this.state.hour}
            onChange={this.handleChangeHour}
          />
          <input
            type="number"
            placeholder="Minute"
            value={this.state.minute}
            onChange={this.handleChangeMinute}
          />
        </div>
        <div className="calendar__event-form__name">
          <input
            type="text"
            placeholder="Event name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div className="calendar__event-form__bottom">
          <button onClick={this.handleSaveButtonClick}>Save</button>
        </div>
      </div>
    )
  }
}

export default EventForm