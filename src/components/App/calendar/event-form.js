import React, { Component } from 'react'

class EventForm extends Component {

  state = {}

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
    const targetRect = target.getBoundingClientRect()
    const popupRect = this.ref.getBoundingClientRect()
    this.setState({
      target,
      x: targetRect.x - (popupRect.width / 2) + (targetRect.width / 2),
      y: targetRect.y + targetRect.height + 10
    })
  }

  handleSetRef = (ref) => {
    this.ref = ref
  }

  render() {
    return (
      <div
        className="calendar-event-form"
        ref={this.handleSetRef}
        style={{
          left: this.state.x,
          top: this.state.y,
          visibility: this.props.visible ? 'visible' : 'hidden'
        }}
      >
        <div className="calendar-event-form__arrow-up"></div>
        <div className="calendar-event-form__time">
          <input
            type="number"
            placeholder="Hour"
            onChange={this.handleChangHour}
          />
          <input
            type="number"
            placeholder="Minute"
            onChange={this.handleChangeMinute}
          />
        </div>
        <div className="calendar-event-form__name">
          <input type="text" placeholder="Event name" />
        </div>
        <div className="calendar-event-form__bottom">
          <button>Save</button>
        </div>
      </div>
    )
  }
}

export default EventForm