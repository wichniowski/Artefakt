import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Environment from "../Environment";
import Synth from "../Synth";
import Sequencer from "../Sequencer";
import ChannelStrip from "../ChannelStrip";
import Reverb from "../Reverb";
import Filter from "../Filter";
import Delay from "../Delay";

storiesOf("Sequencer", module).add("default", () => (
  <Environment bpm={140}>
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
            </Filter>
          </Sequencer>
        </Delay>
      </Reverb>
    </ChannelStrip>
  </Environment>
));
