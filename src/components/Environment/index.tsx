import React, { Component } from "react";
import Tone from "tone";
import Analyzer from "../legacy/ui/Analyzer";
import { any } from "prop-types";

interface EnvironmentProps {
  bpm: number;
}

const audioContext = new AudioContext();
export const WebAudioContext = React.createContext({
  audioContext,
  master: {},
  aux: {}
});
class Environment extends Component<EnvironmentProps> {
  state = {};

  static defaultProps = {
    bpm: 130
  };
  masterGain: GainNode;
  aux: GainNode;

  constructor(props: EnvironmentProps) {
    super(props);
    Tone.Transport.bpm.rampTo(props.bpm, 4);
    Tone.Transport.swing = 0;

    this.masterGain = audioContext.createGain();
    this.aux = audioContext.createGain();
    this.masterGain.gain.setValueAtTime(1, audioContext.currentTime);
    this.masterGain.connect(audioContext.destination);
    this.masterGain.connect(this.aux);
  }

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Analyzer audioContext={audioContext} masterGain={this.masterGain} />
        <WebAudioContext.Provider
          value={{
            audioContext,
            master: { gain: this.masterGain },
            aux: this.aux
          }}
        >
          {children}
        </WebAudioContext.Provider>
      </React.Fragment>
    );
  }
}

Environment.defaultProps = {
  bpm: 130
};

export default Environment;
