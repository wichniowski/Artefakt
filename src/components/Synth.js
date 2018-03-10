import React, { Component } from "react";

class Synth extends Component {
  constructor(props) {
    super(props);
    const { context, type, frequency, masterGain } = props;
    this.oscillator = context.createOscillator();
    this.oscillator.type = type;
    this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);

    this.vca = context.createGain();

    this.oscillator.connect(this.vca);
    this.vca.connect(masterGain);
    this.vca.gain.setValueAtTime(0, context.currentTime);
    this.oscillator.start();
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
      <div className="synth">
        <p>Synth</p>
      </div>
    );
  }
}

Synth.defaultProps = {
  type: "sine",
  frequency: 120
};

export default Synth;
