import React, { Component } from "react";
import { ChannelContext } from "./ChannelStrip";

const makeDistortionCurve = amount => {
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

class Distortion extends Component {
  static contextType = ChannelContext;
  componentDidMount() {
    const { audioContext, master } = this.context;
    this.waveshaper = audioContext.createWaveShaper();
    this.waveshaper.curve = makeDistortionCurve(this.props.amount);
    this.waveshaper.oversample = "4x";
    this.waveshaper.connect(master.gain);
    master.gain = this.waveshaper;
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

Distortion.defaultProps = {
  frequency: 1000
};

export default Distortion;
