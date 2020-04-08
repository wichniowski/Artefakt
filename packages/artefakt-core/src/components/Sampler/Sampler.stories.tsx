import React from "react";
import { storiesOf } from "@storybook/react";

import Environment from "../Environment";
import Sequencer from "../Sequencer";
import Sampler from ".";
import ChannelStrip from "../ChannelStrip";

storiesOf("Sampler", module).add("default", () => (
  <Environment bpm={140}>
    <ChannelStrip gain={1.5}>
      <Sequencer notes={[0, 1, 0, 1, 0, 1, 0, 1]} interval="4n">
        <Sampler sample="./sounds/snare.wav" />
      </Sequencer>
    </ChannelStrip>
  </Environment>
));
