import React, { Component } from "react";
import { ChannelContext } from "./ChannelStrip";
import { SequencerContext } from "./Sequencer";

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

  setAutomation = automation => {
    if (automation && automation.frequency) {
      this.biquadFilter.frequency.value = automation.frequency;
    }
  };

  render() {
    return (
      <React.Fragment>
        <SequencerContext.Consumer>
          {value =>
            value && value.onStep(step => this.setAutomation(step.automation))
          }
        </SequencerContext.Consumer>
        {this.props.children}
      </React.Fragment>
    );
  }
}

Filter.defaultProps = {
  frequency: 100,
  type: "lowpass"
};

export default Filter;
