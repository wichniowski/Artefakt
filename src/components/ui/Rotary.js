import React, { Component } from "react";
import "./Rotary.css";

class Rotary extends Component {
  state = {
    locked: false,
    rotation: 0
  };
  getPercentageByMaxValue(percent) {
    return this.props.max / 100 * percent;
  }

  setPercentage = (event, direct) => {
    if (!this.state.locked) {
      return;
    }

    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    console.log(x);
    const percent = 100 * x / event.currentTarget.offsetWidth;

    console.log(percent);

    this.props.onChange(this.getPercentageByMaxValue(percent));
    this.setState({
      rotation: `${Math.floor(percent)}`,
      [this.props.parameter]: this.getPercentageByMaxValue(percent)
    });
  };
  render() {
    return (
      <div>
        <div
          style={{ transform: `rotate(${this.state.rotation}deg)` }}
          onMouseMove={event => this.setPercentage(event, false)}
          onMouseDown={() => this.setState({ locked: true })}
          onMouseUp={() => this.setState({ locked: false })}
          className="rotary"
          ref={ref => (this.rotary = ref)}
        >
          <div className="dash" />
        </div>
      </div>
    );
  }
}

export default Rotary;
