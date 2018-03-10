import React, { Component } from "react";
import Environment from "./components/Environment";
import Synth from "./components/Synth";
import Reverb from "./components/Reverb";
import Filter from "./components/Filter";
import Sampler from "./components/Sampler";
import ChannelStrip from "./components/ChannelStrip";
import Sequencer from "./components/Sequencer";
import "./App.css";

const tempo = 85;

class App extends Component {
  render() {
    return (
      <div className="Reactor">
        <Environment>
          <ChannelStrip gain={0.2}>
            <Reverb
              dry={0.6}
              wet={1}
              filterType="highpass"
              cutoff={100}
              decayTime={2}
            >
              <Filter frequency={1550} type="lowpass">
                <Sequencer
                  notes={[140, 60, 60, 60, 30, 30, 30, 30]}
                  bpm={tempo * 2}
                >
                  <Synth
                    frequency={820}
                    type="sawtooth"
                    attackTime={0.1}
                    releaseTime={1}
                    start
                  />
                </Sequencer>
                <Sequencer
                  notes={[0, 120, 0, 120]}
                  releaseTime={0.2}
                  bpm={tempo}
                >
                  <Synth frequency={820} type="sawtooth" start />
                </Sequencer>
                <Sequencer
                  notes={[120 * 3, 0, 120 * 2, 120 * 4, 120 * 2]}
                  bpm={tempo * 4}
                >
                  <Synth
                    frequency={820}
                    type="sawtooth"
                    attackTime={0.01}
                    releaseTime={0.11}
                    start
                  />
                </Sequencer>
              </Filter>
            </Reverb>
          </ChannelStrip>

          <Reverb
            dry={0.6}
            wet={1}
            filterType="highpass"
            cutoff={100}
            decayTime={1}
          >
            <Sequencer notes={[1, 1, 0, 0, 1, 0, 0, 1]} bpm={tempo * 2}>
              <Sampler sample="../sounds/kick.wav" />
            </Sequencer>
          </Reverb>

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

          <Reverb
            dry={0.6}
            wet={1}
            filterType="highpass"
            cutoff={100}
            decayTime={1}
          >
            <Sequencer notes={[0, 1, 0, 1, 0, 1, 0, 1]} bpm={tempo}>
              <Sampler sample="../sounds/clap.wav" />
            </Sequencer>
          </Reverb>
        </Environment>
      </div>
    );
  }
}

export default App;
