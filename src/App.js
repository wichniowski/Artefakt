import React, { Component } from "react";
import Environment from "./components/Environment";
import Synth from "./components/Synth";
import Reverb from "./components/Reverb";
import Distortion from "./components/Distortion";
import Filter from "./components/Filter";
import Sampler from "./components/Sampler";
import Delay from "./components/Delay";
import ChannelStrip from "./components/ChannelStrip";
import Sequencer from "./components/Sequencer";
import "./App.css";

const tempo = 85;

class App extends Component {
  render() {
    return (
      <div className="Reactor">
        <Environment>
          <ChannelStrip gain={0.8}>
            <Filter frequency={900} type="lowpass">
              <Reverb wet={1} time={1}>
                <Distortion amount={400}>
                  <Sequencer
                    notes={[120, 80, 95, 60].map(val => val / 2)}
                    bpm={tempo / 2}
                  >
                    <Synth type="sawtooth" attackTime={0.01} releaseTime={3} />
                  </Sequencer>
                </Distortion>
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
              <Distortion amount={800}>
                <Sequencer notes={[1, 1, 0, 0, 1, 0, 0, 0]} bpm={tempo * 2}>
                  <Sampler sample="./sounds/808kick.wav" />
                </Sequencer>
                <Sequencer notes={[1, 1]} bpm={tempo * 2}>
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
              </Distortion>
            </Reverb>
          </ChannelStrip>
        </Environment>
      </div>
    );
  }
}

export default App;
