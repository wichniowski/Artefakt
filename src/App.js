import React, { Component } from "react";
import Environment from "./components/dsp/Environment";
import Synth from "./components/dsp/Synth";
import Reverb from "./components/dsp/Reverb";
import Distortion from "./components/dsp/Distortion";
import Filter from "./components/dsp/Filter";
import Rotary from "./components/ui/Rotary";
import Sampler from "./components/dsp/Sampler";
import Delay from "./components/dsp/Delay";
import ChannelStrip from "./components/dsp/ChannelStrip";
import Sequencer from "./components/dsp/Sequencer";
import "./App.css";

const tempo = 85;

class App extends Component {
  state = {
    filterFreq: 900
  };
  render() {
    return (
      <div className="Reactor">
        <Rotary
          max={10000}
          onChange={value => {
            this.setState({
              filterFreq: value
            });
          }}
        />
        <Environment>
          <ChannelStrip gain={0.5}>
            <Filter frequency={this.state.filterFreq} type="lowpass">
              <Reverb wet={1} time={1}>
                <Sequencer
                  notes={[120, 80, 95, 60].map(val => val / 2)}
                  bpm={tempo / 2}
                >
                  <Synth type="sawtooth" attackTime={0.01} releaseTime={1} />
                </Sequencer>
                <Delay delayTime={0.6}>
                  <Sequencer
                    notes={[120, 160, 160, 120, 0, 240].map(value => value * 3)}
                    bpm={tempo * 4}
                  >
                    <Synth type="sine" attackTime={0.01} releaseTime={0.1} />
                  </Sequencer>
                </Delay>
              </Reverb>
            </Filter>
          </ChannelStrip>
          <ChannelStrip gain={0.9}>
            <Reverb wet={0.8} time={2}>
              <Sequencer notes={[1, 1, 0, 1, 1, 0, 1, 0]} bpm={tempo * 2}>
                <Sampler sample="./sounds/808kick.wav" />
              </Sequencer>
              <Sequencer notes={[1, 1]} bpm={tempo * 4}>
                <Sampler sample="./sounds/hihat.wav" />
              </Sequencer>
              <Sequencer notes={[0, 1]} bpm={tempo * 2}>
                <Sampler sample="./sounds/openhihat.wav" />
              </Sequencer>
              <Delay delayTime={2} feedback={0.2}>
                <Sequencer notes={[0, 1]} bpm={tempo}>
                  <Sampler sample="./sounds/hihat.wav" />
                </Sequencer>
              </Delay>
            </Reverb>
          </ChannelStrip>
        </Environment>
      </div>
    );
  }
}

export default App;
