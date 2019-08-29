import React, { Component } from "react";
import { SequencerContext } from "../Sequencer";
import { IChannelContext } from "../ChannelStrip";

interface KickProps {
  amount: number;
  frequency: number;
  waveform: OscillatorType;
  release: number;
}

class Kick extends Component<KickProps> {
  static contextType = SequencerContext;
  static defaultProps = {
    amount: 0.5,
    frequency: 240,
    waveform: "sine",
    release: 0.5
  };
  osc!: OscillatorNode;
  gain!: GainNode;
  currentTime!: number;

  frequencyAutomation = 0;

  componentDidMount() {
    this.context.onStep((step: any) => {
      if (step.note !== 0) {
        this.trigger();
        this.setAutomation(step.automation);
      }
    });
  }

  setupOSC = (props: KickProps, context: IChannelContext) => {
    const { audioContext, master } = context;
    this.osc = audioContext.createOscillator();
    this.osc.type = props.waveform;
    this.gain = audioContext.createGain();
    this.osc.connect(this.gain);
    this.gain.connect(master.gain);
  };

  trigger() {
    this.setupOSC(this.props, this.context);
    this.currentTime = this.context.audioContext.currentTime;
    this.osc.frequency.setValueAtTime(
      this.props.frequency + this.frequencyAutomation,
      this.currentTime
    );
    this.gain.gain.setValueAtTime(1, this.currentTime);

    this.osc.frequency.exponentialRampToValueAtTime(
      0.01,
      this.currentTime + this.props.amount
    );

    this.gain.gain.exponentialRampToValueAtTime(
      0.02,
      this.currentTime + this.props.release
    );

    this.osc.start(this.currentTime);
    this.osc.stop(this.currentTime + this.props.release);
  }

  setAutomation = (automation: any) => {
    if (automation) {
      if (automation.frequency) {
        this.frequencyAutomation = automation.frequency;
      }
    }
  };

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default Kick;
