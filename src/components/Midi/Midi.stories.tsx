import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Midi from "./index";
import Environment from "../Environment";
import Synth from "../Synth";
import Sequencer from "../Sequencer";
import Sampler from "../Sampler";
import ChannelStrip from "../ChannelStrip";
import Reverb from "../Reverb";
import Filter from "../Filter";
import Kick from "../Kick";
import Delay from "../Delay";

storiesOf("Midi", module).add("default", () => (
  <Environment>
    <ChannelStrip>
      <Sequencer notes={["C3", "F3", "G3"]}>
        <Midi outputName="IAC Driver Virtual Midi" />
      </Sequencer>
    </ChannelStrip>
  </Environment>
));
