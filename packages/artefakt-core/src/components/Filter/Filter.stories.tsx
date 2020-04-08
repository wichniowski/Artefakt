import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Environment from "../Environment";
import Synth from "../Synth";
import Sequencer from "../Sequencer";
import ChannelStrip from "../ChannelStrip";
import Filter from ".";

storiesOf("Filter", module).add("default", () => (
  <Environment bpm={140}>
    <ChannelStrip gain={0.2}>
      <Sequencer
        notes={[1, 1, 1, 1, 2]}
        automation={{
          frequency: [200, 300, 400, 3000, 1000, 2000]
        }}
        interval="16n"
      >
        <Filter frequency={200}>
          <Sequencer notes={[300, 300, 300, 300]} interval="4n">
            <Synth type="sawtooth" />
          </Sequencer>
        </Filter>
      </Sequencer>
    </ChannelStrip>
  </Environment>
));
