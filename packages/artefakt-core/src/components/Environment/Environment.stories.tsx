import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Environment from ".";
import Synth from "../Synth";
import Sequencer from "../Sequencer";
import Sampler from "../Sampler";
import ChannelStrip from "../ChannelStrip";
import Reverb from "../Reverb";
import Filter from "../Filter";
import Kick from "../Kick";
import Delay from "../Delay";

storiesOf("Environment", module).add("default", () => (
  <Environment bpm={140}>
    <ChannelStrip gain={0.3}>
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
    <ChannelStrip gain={0.5}>
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
));
