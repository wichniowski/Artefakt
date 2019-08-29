import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Environment from "../Environment";
import Synth from "../Synth";
import Sequencer from "../Sequencer";
import ChannelStrip from "../ChannelStrip";

storiesOf("Synth", module).add("default", () => (
  <Environment bpm={140}>
    <ChannelStrip gain={0.5}>
      <Sequencer
        notes={[240, 240 * 3.8, 0, 180 * 4, 60, 2400, 60]}
        interval="4n"
      >
        <Synth type="sawtooth" />
      </Sequencer>
    </ChannelStrip>
  </Environment>
));
