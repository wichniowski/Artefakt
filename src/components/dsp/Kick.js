import React, { Component } from "react";
import { SequencerContext } from "./Sequencer";

class Kick extends Component {
  static contextType = SequencerContext;

  componentDidMount() {
    this.context.onStep(note => {
      if (note !== 0) {
        this.trigger();
      }
    });
  }

  setupOSC = () => {
    const { audioContext, master } = this.context;
    this.osc = audioContext.createOscillator();
    this.osc.type = this.props.waveform;
    if (!this.gain) {
      this.gain = audioContext.createGain();
    }
    this.osc.connect(this.gain);
    this.gain.connect(master.gain);
  };

  trigger() {
    this.setupOSC();
    this.currentTime = this.context.audioContext.currentTime;
    this.osc.frequency.setValueAtTime(this.props.frequency, this.currentTime);
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

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

Kick.defaultProps = {
  amount: 0.5,
  frequency: 240,
  waveform: "sine",
  release: 0.5
};

export default Kick;
