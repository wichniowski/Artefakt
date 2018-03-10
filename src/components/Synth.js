import React, { Component } from "react";

class Synth extends Component {
  constructor(props) {
    super(props);
    this.oscillator = props.context.createOscillator();
    this.oscillator.type = props.type || "sine";
    this.oscillator.frequency.setValueAtTime(
      props.frequency,
      props.context.currentTime
    );

    this.vca = props.context.createGain();

    this.oscillator.connect(this.vca);
    this.vca.connect(props.masterGain);
    this.vca.gain.setValueAtTime(0, props.context.currentTime);
    props.start && this.oscillator.start();
  }

  componentWillReceiveProps(newProps) {
    this.oscillator.frequency.setValueAtTime(
      newProps.note,
      this.props.context.currentTime
    );

    const attack = this.props.attackTime || 0.1;
    const release = this.props.releaseTime || 0.5;
    const now = this.props.context.currentTime;

    this.vca.gain.cancelScheduledValues(now);
    this.vca.gain.setValueAtTime(0, now);
    this.vca.gain.linearRampToValueAtTime(1, now + attack);
    this.vca.gain.linearRampToValueAtTime(0, now + release);
  }

  render() {
    return (
      <div className="oscillator">
        <h1>Synth</h1>
        <h2>{this.props.type}</h2>
      </div>
    );
  }
}

export default Synth;
