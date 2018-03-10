import React, { Component } from "react";
import Environment from "./components/Environment";
import Oscillator from "./components/Oscillator";
import Filter from "./components/Filter";
import Sampler from "./components/Sampler";
import ChannelStrip from './components/ChannelStrip';
import Sequencer from "./components/Sequencer";
import "./App.css";

const tempo = 130;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Environment>
          <ChannelStrip gain={0.05}>
            <Filter frequency={1050} type="lowpass">
              <Sequencer notes={[100, 120, 400, 800]} bpm={tempo * 3}>
                <Oscillator frequency={820} type="triangle" start />
              </Sequencer>
              <Sequencer notes={[100, 200, 300, 1200]} bpm={tempo * 2}>
                <Oscillator frequency={820} type="saw" start />
              </Sequencer>
              <Sequencer notes={[100, 100, 100, 300]} bpm={tempo}>
                <Oscillator frequency={820} type="triangle" start />
              </Sequencer>
            </Filter>
          </ChannelStrip>
          <Sequencer notes={[1, 1, 1, 1]} bpm={tempo}>
            <Sampler sample="../sounds/kick.wav" />
          </Sequencer>
          <Sequencer notes={[0, 1, 0, 1]} bpm={tempo}>
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
