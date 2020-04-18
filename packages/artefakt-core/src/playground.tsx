import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Environment,
  ChannelStrip,
  Sequencer,
  VJ,
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
    <Environment bpm={160}>
      <Sequencer midi>
        <VJ
          videos={[
            {
              id: "eRpMctqzVOI",
              note: "C",
            },
            {
              id: "L7he8tHtPXM",
              note: "D",
            },
            {
              id: "5xwLFRdewgE",
              note: "E",
            },
            {
              id: "y8nONfU8Mog",
              note: "F",
            },
            {
              id: "UjCdB5p2v0Y",
              note: "G",
            },
            {
              id: "aFsNz5VMyC8",
              note: "A",
            },
            {
              id: "5l2V72BzlbM",
              note: "B",
            },
          ]}
        ></VJ>
      </Sequencer>
      <ChannelStrip gain={0.1}></ChannelStrip>
    </Environment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
