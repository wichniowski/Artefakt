import React, { Component } from "react";
//@ts-ignore
import SoundbankReverb from "soundbank-reverb";
import { ChannelContext, IChannelContext } from "../ChannelStrip";

interface ReverbProps {
  decayTime?: number;
  wet?: number;
  dry?: number;
  filterType?: string;
  cutoff?: number;
}

class Reverb extends Component<ReverbProps> {
  static contextType = ChannelContext;
  static defaultProps = {
    decayTime: 1,
    wet: 0.5,
    dry: 1,
    filterType: "highpass",
    cutoff: 100
  };

  reverb: SoundbankReverb;

  constructor(props: ReverbProps, context: IChannelContext) {
    super(props);
    const { decayTime, wet, dry, filterType, cutoff } = props;
    const { audioContext, master } = context;
    this.reverb = SoundbankReverb(audioContext);
    this.reverb.connect(master.gain);

    this.reverb.time = decayTime;
    this.reverb.wet.value = wet;
    this.reverb.dry.value = dry;

    this.reverb.filterType = filterType;
    this.reverb.cutoff.value = cutoff;
    master.gain = this.reverb;
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default Reverb;
