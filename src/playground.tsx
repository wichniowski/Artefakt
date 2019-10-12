import React from "react";
import ReactDOM from "react-dom";
import { Environment, ChannelStrip, Sequencer, Midi } from "./index";

const randomMelody = (length: number, minOctave = 2, maxOctave = 7) => {
  const notes = ["C", "D#", "F", "G", "G#", "A#", "-"];
  return new Array(length)
    .fill(Math.floor(Math.random() * (maxOctave - minOctave + 1)) + minOctave)
    .map(octave => {
      const note = notes[Math.floor(Math.random() * notes.length)];
      return note === "-" ? note : `${note}${octave}`;
    });
};

function App() {
  const midiOutput = "IAC Driver Virtual Midi";
  const x = "-";
  console.log(randomMelody(10, 2, 6));
  return (
    <div className="App">
      <Environment bpm={160}>
        <ChannelStrip>
          {/* <Sequencer notes={randomMelody(16, 3, 4)} interval="8n">
            <Midi outputName={midiOutput} />
          </Sequencer> */}
          <Sequencer notes={randomMelody(10, 5, 6)} interval="16n">
            <Midi outputName={midiOutput} />
          </Sequencer>
          <Sequencer
            notes={[
              "F3",
              "F3",
              x,
              x,
              "D#3",
              "G4",
              x,
              x,
              x,
              x,
              x,
              x,
              "C2",
              x,
              x
            ]}
            interval="8n"
          >
            <Midi outputName={midiOutput} channel={2} />
          </Sequencer>
          <Sequencer
            notes={["C2", "-", "E2", "-", "C2", "D2", "C#2", "C2"]}
            interval="8n"
          >
            <Midi outputName={midiOutput} channel={4} />
          </Sequencer>
          <Sequencer notes={["C#2", "C#2", "C#2"]} interval="8n">
            <Midi outputName={midiOutput} channel={5} />
          </Sequencer>
        </ChannelStrip>
      </Environment>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
