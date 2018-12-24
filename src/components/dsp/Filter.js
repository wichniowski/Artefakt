import React, { Component } from "react";
import { ChannelContext } from "./ChannelStrip";

class Filter extends Component {
  static contextType = ChannelContext;
  componentWillMount() {
    const { frequency } = this.props;
    const { audioContext, master } = this.context;
    this.biquadFilter = audioContext.createBiquadFilter();
    this.biquadFilter.type = this.props.type;
    this.biquadFilter.frequency.value = frequency;
    this.biquadFilter.connect(master.gain);
    master.gain = this.biquadFilter;
  }

  componentWillReceiveProps(newProps) {
    this.biquadFilter.frequency.value = newProps.frequency;
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

Filter.defaultProps = {
  frequency: 100,
  type: "lowpass"
};

export default Filter;
