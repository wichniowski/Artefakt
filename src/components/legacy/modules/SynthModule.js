import React, { Component } from "react";
import Synth from "../dsp/Synth";
import Filter from "../dsp/Filter";
import Tracker from "../ui/Tracker";
import Delay from "../dsp/Delay";
import ChannelStrip from "../dsp/ChannelStrip";
import "./SynthModule.css";

const generateScale = () => {
  const hz = [261.63, 293.66, 329.63, 369.99, 392.0, 440.0, 493.88];
  const scale = [];
  const factor = [0.5, 1, 2, 4];
  for (let i = 0; i <= 7; i++) {
    scale.push(
      hz[Math.floor(Math.random() * hz.length)] *
        factor[Math.floor(Math.random() * factor.length)]
    );
  }
  return scale;
};

class SynthModule extends Component {
  state = {
    filterFreq: 900,
    attackTime: 0,
    releaseTime: 1,
    note: 1000,
    bpmFactor: 1,
    scale: generateScale()
  };

  render() {
    return (
      <div className="synth-module">
        <ChannelStrip gain={1}>
          <Delay delayTime={0.4}>
            <Filter frequency={this.state.filterFreq}>
              <Tracker
                notes={this.state.scale}
                bpm={this.props.bpm * this.state.bpmFactor}
              >
                <Synth
                  type="sawtooth"
                  attackTime={this.state.attackTime}
                  releaseTime={this.state.releaseTime}
                />
              </Tracker>
              <Tracker
                notes={[0, 0, 0, 0, 0, 0, 0, 0]}
                bpm={this.props.bpm * this.state.bpmFactor}
                onStep={(_, note) => this.setState({ attackTime: note })}
              />
              <Tracker
                notes={[0, 0, 0, 0, 0, 0, 0, 0]}
                bpm={this.props.bpm * this.state.bpmFactor}
                onStep={(_, note) => this.setState({ releaseTime: note })}
              />
              <Tracker
                notes={[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]}
                bpm={this.props.bpm * this.state.bpmFactor}
                onStep={(_, note) => this.setState({ filterFreq: note })}
              />
            </Filter>
          </Delay>
        </ChannelStrip>
      </div>
    );
  }
}

export default SynthModule;
