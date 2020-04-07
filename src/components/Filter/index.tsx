import React, { Component } from "react";
import { ChannelContext, IChannelContext } from "../ChannelStrip";
import { SequencerContext } from "../Sequencer";

interface FilterProps {
  frequency: number;
  q: number;
  detune: number;
  type: "lowpass" | "highpass" | "bandpass";
}

class Filter extends Component<FilterProps> {
  static contextType = ChannelContext;
  static defaultProps = {
    type: "lowpass",
    q: 1,
    detune: 0,
  };
  biquadFilter!: BiquadFilterNode;

  constructor(props: FilterProps, context: IChannelContext) {
    super(props);
    const { frequency, q, detune } = props;
    const { audioContext, master } = context;
    this.biquadFilter = audioContext.createBiquadFilter();
    this.biquadFilter.type = this.props.type;
    this.biquadFilter.frequency.value = frequency;
    this.biquadFilter.Q.value = q;
    this.biquadFilter.detune.value = detune;
    console.log(this.biquadFilter);
    this.biquadFilter.connect(master.gain);
    master.gain = this.biquadFilter;
  }

  componentDidUpdate() {
    this.biquadFilter.frequency.value = this.props.frequency;
    this.biquadFilter.Q.value = this.props.q;
    this.biquadFilter.detune.value = this.props.detune;
  }

  // TODO: add automation type
  setAutomation = (automation: any) => {
    if (automation && automation.frequency) {
      this.biquadFilter.frequency.value = automation.frequency;
    }
  };

  render() {
    return (
      <React.Fragment>
        <SequencerContext.Consumer>
          {(value) => {
            // Todo: Add step type
            value &&
              value.onStep((step: any) => this.setAutomation(step.automation));
            return null;
          }}
        </SequencerContext.Consumer>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Filter;
