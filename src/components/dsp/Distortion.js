import React, { Component } from "react";

const makeDistortionCurve = amount => {
  let k = typeof amount === "number" ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = i * 2 / n_samples - 1;
    curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
  }
  return curve;
};

class Distortion extends Component {
  constructor(props) {
    super(props);
    const { context, masterGain } = props;
    this.waveshaper = context.createWaveShaper();
    this.waveshaper.curve = makeDistortionCurve(props.amount);
    this.waveshaper.oversample = "4x";
    this.waveshaper.connect(masterGain);
  }

  render() {
    const { children, context } = this.props;
    const childrenWithContext = React.Children.map(children, child =>
      React.cloneElement(child, {
        context: context,
        masterGain: this.waveshaper
      })
    );

    return (
      <div className="filter">
        <p>Waveshaper</p>
        {childrenWithContext}
      </div>
    );
  }
}

Distortion.defaultProps = {
  frequency: 1000
};

export default Distortion;
