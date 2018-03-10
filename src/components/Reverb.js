import React, { Component } from "react";
import SoundbankReverb from "soundbank-reverb";

class Reverb extends Component {
  constructor(props) {
    super(props);
    this.reverb = SoundbankReverb(props.context);
    this.reverb.connect(props.masterGain);

    this.reverb.time = props.decayTime;
    this.reverb.wet.value = props.wet;
    this.reverb.dry.value = props.dry;

    this.reverb.filterType = props.filterType;
    this.reverb.cutoff.value = props.cutoff;
  }

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: this.props.context,
        masterGain: this.reverb
      })
    );

    return <div>{childrenWithContext}</div>;
  }
}

export default Reverb;
