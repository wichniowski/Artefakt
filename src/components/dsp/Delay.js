import React, { Component } from "react";
import { ChannelContext } from "./ChannelStrip";

class Delay extends Component {
  static contextType = ChannelContext;
  constructor(props, context) {
    super(props);
    const { audioContext, master } = context;
    const { delayTime, feedback } = this.props;
    this.delay = audioContext.createDelay();
    this.delay.delayTime.value = delayTime;

    this.feedback = audioContext.createGain();
    this.feedback.gain.value = feedback;

    this.filter = audioContext.createBiquadFilter();
    this.filter.frequency.value = 1000;

    this.delay.connect(this.feedback);
    this.feedback.connect(this.filter);
    this.filter.connect(this.delay);

    this.delay.connect(master.gain);
    master.gain = this.delay;
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

Delay.defaultProps = {
  delayTime: 0.2,
  feedback: 0.4
};

export default Delay;
