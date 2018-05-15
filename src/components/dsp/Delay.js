import React, { Component } from "react";
import PropTypes from "prop-types";

class Delay extends Component {
  constructor(props) {
    super(props);
    this.delay = props.context.createDelay();
    this.delay.delayTime.value = props.delayTime;

    this.feedback = props.context.createGain();
    this.feedback.gain.value = props.feedback;

    this.filter = props.context.createBiquadFilter();
    this.filter.frequency.value = 1000;

    this.delay.connect(this.feedback);
    this.feedback.connect(this.filter);
    this.filter.connect(this.delay);

    this.delay.connect(props.masterGain);
  }

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: this.props.context,
        masterGain: this.delay
      })
    );

    return (
      <div className="reverb">
        <p>Reverb</p>
        {childrenWithContext}
      </div>
    );
  }
}

Delay.defaultProps = {
  delayTime: 0.2,
  feedback: 0.4
};

export default Delay;
