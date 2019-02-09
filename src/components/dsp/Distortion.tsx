import React, { Component } from "react";
import { ChannelContext, IChannelContext } from "./ChannelStrip";

const createDistortionCurve = (amount: number) => {
  let k = typeof amount === "number" ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
};

interface DistortionProps {
  frequency?: number;
  amount: number;
}

class Distortion extends Component<DistortionProps> {
  static contextType = ChannelContext;
  static defaultProps = {
    frequency: 1000,
    amount: 1
  };

  waveshaper: WaveShaperNode;

  constructor(props: DistortionProps, context: IChannelContext) {
    super(props);
    const { audioContext, master } = context;
    this.waveshaper = audioContext.createWaveShaper();
    this.waveshaper.curve = createDistortionCurve(props.amount);
    this.waveshaper.oversample = "4x";
    this.waveshaper.connect(master.gain);
    // @ts-ignore
    master.gain = this.waveshaper;
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default Distortion;
