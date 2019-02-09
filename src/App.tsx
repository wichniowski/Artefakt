import React from "react";
import Environment from "./components/dsp/Environment";
import Synth from "./components/dsp/Synth";
import "./App.css";
import Sequencer from "./components/dsp/Sequencer";
import Sampler from "./components/dsp/Sampler";
import ChannelStrip from "./components/dsp/ChannelStrip";
import Reverb from "./components/dsp/Reverb";
import Filter from "./components/dsp/Filter";
import Kick from "./components/dsp/Kick";
import Delay from "./components/dsp/Delay";

const Lullaby = () => (
  <Environment bpm={140}>
    <ChannelStrip gain={2}>
      <Delay delayTime={0.2}>
        <Sequencer
          notes={[1, 1, 1, 1, 1, 1, 1, 1]}
          automation={{ frequency: [5000, 300, 500, 600, 5000, 400, 300, 200] }}
        >
          <Filter frequency={300}>
            <Sequencer notes={[1, 1, 0, 0, 1, 0, 0, 0]}>
              <Kick frequency={240} waveform="square" />
            </Sequencer>
          </Filter>
        </Sequencer>
      </Delay>
    </ChannelStrip>
    <ChannelStrip gain={1.5}>
      <Reverb decayTime={3}>
        <Delay delayTime={0.2}>
          <Sequencer notes={[0, 0, 1, 0, 0, 0, 1, 0]} interval="4n">
            <Sampler sample="./sounds/snare.wav" />
          </Sequencer>
        </Delay>
      </Reverb>
    </ChannelStrip>
    <ChannelStrip gain={0.5}>
      <Reverb decayTime={4}>
        <Delay delayTime={0.2}>
          <Sequencer
            notes={[1, 1, 1, 1, 2]}
            automation={{ frequency: [200, 500, 800, 1000, 100] }}
            interval="1n"
          >
            <Filter frequency={200}>
              <Sequencer
                notes={[240, 240 * 3.8, 0, 180 * 4, 60, 2400, 60]}
                interval="4n"
              >
                <Synth type="sawtooth" />
              </Sequencer>
              <Sequencer
                notes={[240, 240 * 3.8, 0, 180 * 4, 60, 2400, 60].reverse()}
                interval="4n"
              >
                <Synth type="square" />
              </Sequencer>
              <Sequencer
                notes={[240, 180, 120, 360, 480, 240, 60]
                  .reverse()
                  .map(item => item / 0.3)}
                interval="3n"
              >
                <Synth type="sawtooth" />
              </Sequencer>
              <Sequencer
                notes={[240, 240 * 2, 0, 180 * 4, 60, 2400, 60]
                  .reverse()
                  .map(item => item / 0.5)}
                interval="8n"
              >
                <Synth type="square" />
              </Sequencer>
              <Sequencer
                notes={[60, 100, 0, 180, 60, 240, 60]
                  .reverse()
                  .map(item => item / 0.5)}
                interval="4n"
              >
                <Synth type="sine" />
              </Sequencer>
            </Filter>
          </Sequencer>
        </Delay>
      </Reverb>
    </ChannelStrip>
  </Environment>
);

export default Lullaby;
