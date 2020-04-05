import React from "react";
import ReactDOM from "react-dom";
import {
  Environment,
  ChannelStrip,
  Sequencer,
  Midi,
  Kick,
  Reverb,
  Filter,
  Poti,
} from "./index";
import Synth from "./components/Synth";

function App() {
  return (
    <div className="App">
      <Poti
        max={6}
        onChange={(value) => {
          console.log(value);
        }}
      ></Poti>
      <Environment bpm={160} withAnalyzer>
        <ChannelStrip gain={0.6}>
          <Sequencer midi>
            <Filter frequency={1000}>
              <Reverb decayTime={4}>
                <Synth type="square" releaseTime={1} attackTime={1} />
              </Reverb>
            </Filter>
          </Sequencer>
          <Sequencer midi midiChannel="2">
            <Reverb decayTime={2}>
              <Synth type="sine" releaseTime={1} attackTime={0.2} />
            </Reverb>
          </Sequencer>
        </ChannelStrip>
        <ChannelStrip gain={0.4}>
          <Sequencer midi midiChannel="3">
            <Reverb decayTime={2}>
              <Synth type="triangle" releaseTime={1} attackTime={0.1} />
            </Reverb>
          </Sequencer>
          <Sequencer midi midiChannel="4">
            <Synth type="square" releaseTime={1} attackTime={1} />
          </Sequencer>
        </ChannelStrip>
        <ChannelStrip gain={0.2}>
          <Sequencer midi midiChannel="5">
            <Reverb decayTime={2}>
              <Synth type="square" releaseTime={0.2} attackTime={0.1} />
            </Reverb>
          </Sequencer>
        </ChannelStrip>
      </Environment>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
