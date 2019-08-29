import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Environment from "../Environment";
import Sequencer from "../Sequencer";
import ChannelStrip from "./index";
import Filter from "../Filter";
import Kick from "../Kick";
import Delay from "../Delay";

storiesOf("ChannelStrip", module).add("default", () => (
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
  </Environment>
));
