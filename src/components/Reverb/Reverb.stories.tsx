import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Environment from "../Environment";
import Sequencer from "../Sequencer";
import Sampler from "../Sampler";
import ChannelStrip from "../ChannelStrip";
import Reverb from ".";

storiesOf("Reverb", module).add("default", () => (
  <Environment bpm={140}>
    <ChannelStrip gain={1.5}>
      <Reverb decayTime={10}>
        <Sequencer notes={[0, 0, 1, 0, 0, 0, 1, 0]} interval="4n">
          <Sampler sample="./sounds/snare.wav" />
        </Sequencer>
      </Reverb>
    </ChannelStrip>
  </Environment>
));
