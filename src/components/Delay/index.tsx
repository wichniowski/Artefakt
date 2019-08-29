import React, { Component } from "react";
import { ChannelContext, IChannelContext } from "../ChannelStrip";

interface DelayProps {
  delayTime: number;
  feedback: number;
}

class Delay extends Component<DelayProps> {
  static contextType = ChannelContext;
  static defaultProps = {
    delayTime: 0.2,
    feedback: 0.2
  };
  delay!: DelayNode;
  feedback!: GainNode;
  filter!: BiquadFilterNode;

  constructor(props: DelayProps, context: IChannelContext) {
    super(props);
    const { delayTime, feedback } = props;
    const { audioContext, master } = context;

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
    // @ts-ignore
    master.gain = this.delay;
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default Delay;
