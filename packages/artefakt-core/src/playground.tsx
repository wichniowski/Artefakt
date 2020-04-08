import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Environment,
  ChannelStrip,
  Sequencer,
  Reverb,
  Filter,
  Poti,
  Analyzer,
  Tracker,
  Synth,
} from "./index";
import "./App.css";

function App() {
  return (
    <Environment bpm={160} withAnalyzer>
      <ChannelStrip gain={0.1}>
        <Sequencer notes={[500, 1000, 2000, 1500]}>
          <Synth type="sine" releaseTime={1} attackTime={0.2} />
        </Sequencer>
      </ChannelStrip>
    </Environment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
