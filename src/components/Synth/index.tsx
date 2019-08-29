import React, { Component } from "react";
import { SequencerContext } from "../Sequencer";

interface SynthProps {
  type: OscillatorType;
  frequency: number;
  releaseTime: number;
  attackTime: number;
}

class Synth extends Component<SynthProps> {
  static contextType = SequencerContext;
  static defaultProps = {
    type: "sine",
    frequency: 120,
    attackTime: 0,
    releaseTime: 0.5
  };

  oscillator!: OscillatorNode;
  vca!: GainNode;

  componentDidMount() {
    this.initDSP();
    this.initSeq();
  }

  initDSP = () => {
    const { type, frequency } = this.props;
    const { audioContext, master } = this.context;
    this.oscillator = audioContext.createOscillator();
    this.oscillator.type = type;

    this.oscillator.frequency.setValueAtTime(
      frequency,
      audioContext.currentTime
    );

    this.vca = audioContext.createGain();

    this.oscillator.connect(this.vca);
    this.vca.connect(master.gain);
    this.vca.gain.setValueAtTime(0, audioContext.currentTime);
    this.oscillator.start();
    this.initSeq();
  };

  initSeq = () => {
    // Todo: Define Step type
    this.context.onStep((step: any) => {
      if (step.note === 0) {
        return null;
      }
      this.oscillator.frequency.setValueAtTime(
        step.note,
        this.context.audioContext.currentTime
      );
      const now = this.context.audioContext.currentTime;
      this.vca.gain.cancelScheduledValues(now);
      this.vca.gain.setValueAtTime(0, now * this.props.releaseTime);
      this.vca.gain.linearRampToValueAtTime(1, now + this.props.attackTime);
      this.vca.gain.linearRampToValueAtTime(0, now + this.props.releaseTime);
    });
  };

  render() {
    return null;
  }
}

export default Synth;
