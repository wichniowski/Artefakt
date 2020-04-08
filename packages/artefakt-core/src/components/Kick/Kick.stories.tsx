import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Environment from "../Environment";
import Sequencer from "../Sequencer";
import ChannelStrip from "../ChannelStrip";
import Kick from ".";

storiesOf("Kick", module).add("default", () => (
  <Environment bpm={140}>
    <ChannelStrip gain={2}>
      <Sequencer notes={[1, 1, 1, 1, 1, 1, 1, 1]}>
        <Kick frequency={240} waveform="sine" />
      </Sequencer>
    </ChannelStrip>
  </Environment>
));
