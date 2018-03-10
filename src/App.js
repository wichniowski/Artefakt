import React, { Component } from "react";
import Environment from "./components/Environment";
import Oscillator from "./components/Oscillator";
import Filter from "./components/Filter";
import Sampler from "./components/Sampler";
import ChannelStrip from "./components/ChannelStrip";
import Sequencer from "./components/Sequencer";
import "./App.css";

const tempo = 130;

class App extends Component {
  render() {
    return (
      <div className="Reactor">
        <Environment>
          <ChannelStrip gain={0.1}>
            <Filter frequency={1050} type="lowpass">
              <Sequencer notes={[140, 60, 60, 60]} bpm={tempo}>
                <Oscillator frequency={820} type="sawtooth" start />
              </Sequencer>
              <Sequencer notes={[0, 120, 0, 120]} bpm={tempo}>
                <Oscillator frequency={820} type="sawtooth" start />
              </Sequencer>
              <Sequencer
                notes={[120 * 3, 120 * 2, 120 * 4, 120 * 2]}
                bpm={tempo * 2}
              >
                <Oscillator frequency={820} type="sawtooth" start />
              </Sequencer>
            </Filter>
          </ChannelStrip>
          <Sequencer notes={[1, 1, 1, 1]} bpm={tempo}>
            <Sampler sample="../sounds/kick.wav" />
          </Sequencer>
          <Sequencer notes={[0, 1, 0, 1, 0, 1, 1, 1]} bpm={tempo}>
            <Sampler sample="../sounds/clap.wav" />
          </Sequencer>
          <ChannelStrip gain={0.4}>
            <Sequencer notes={[1, 1, 1, 1]} bpm={tempo * 4}>
              <Sampler sample="../sounds/hihat.wav" />
            </Sequencer>
          </ChannelStrip>
          <ChannelStrip gain={0.4}>
            <Sequencer notes={[1, 0, 1, 0]} bpm={tempo * 2}>
              <Sampler sample="../sounds/openhihat.wav" />
            </Sequencer>
          </ChannelStrip>
        </Environment>
      </div>
    );
  }
}

export default App;
