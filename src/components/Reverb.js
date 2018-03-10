import React, { Component } from "react";
import SoundbankReverb from "soundbank-reverb";

class Reverb extends Component {
  constructor(props) {
    super(props);
    const {
      context,
      masterGain,
      decayTime,
      wet,
      dry,
      filterType,
      cutoff
    } = props;
    this.reverb = SoundbankReverb(context);
    this.reverb.connect(masterGain);

    this.reverb.time = decayTime;
    this.reverb.wet.value = wet;
    this.reverb.dry.value = dry;

    this.reverb.filterType = filterType;
    this.reverb.cutoff.value = cutoff;
  }

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: this.props.context,
        masterGain: this.reverb
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

Reverb.defaultProps = {
  decayTime: 1,
  wet: 0.5,
  dry: 1,
  filterType: "highpass",
  cutoff: 100
};

export default Reverb;
