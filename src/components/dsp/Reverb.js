import React, { Component } from "react";
import SoundbankReverb from "soundbank-reverb";
import { ChannelContext } from "./ChannelStrip";

class Reverb extends Component {
  static contextType = ChannelContext;
  constructor(props, context) {
    super(props);
    const { decayTime, wet, dry, filterType, cutoff } = props;
    this.reverb = SoundbankReverb(context.audioContext);
    this.reverb.connect(context.master.gain);
    context.master.gain = this.reverb;

    this.reverb.time = decayTime;
    this.reverb.wet.value = wet;
    this.reverb.dry.value = dry;

    this.reverb.filterType = filterType;
    this.reverb.cutoff.value = cutoff;
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

Reverb.defaultProps = {
  decayTime: 1,
  wet: 0.5,
  dry: 1,
  filterType: "highpass",
  cutoff: 100
};

export default Reverb;
