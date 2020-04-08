import React, { Component } from "react";
import { SequencerContext } from "../Sequencer";
import WebMidi from "webmidi";

export const MODE_RECEIVE = "receive";
export const MODE_SEND = "send";

interface MidiProps {
  note?: string;
  outputName?: string;
  channel?: number;
}
class Midi extends Component<MidiProps> {
  static contextType = SequencerContext;
  output: any = null;
  midiOutput: string | null = null;

  componentWillMount() {
    const { outputName } = this.props;

    WebMidi.enable((err) => {
      const inputs = WebMidi.inputs.map((input) => input.name);
      const outputs = WebMidi.outputs.map((output) => output.name);
      console.log("Midi inputs:", inputs);
      console.log("Midi outputs", outputs);

      // Set some default ports
      this.midiOutput = outputs[0];

      if (!this.midiOutput) {
        return null;
      }

      this.output = WebMidi.getOutputByName(outputName || this.midiOutput);
      if (this.output) {
        this.initSeq(this.output);
      }
    });
  }

  initSeq = (output: any) => {
    // Todo: Define Step type
    this.context.onStep((step: any) => {
      if (step.note === 0 || step.note === null || step.note === "-") {
        return null;
      }

      output.playNote(step.note, this.props.channel || 1, {
        duration: step.duration,
        velocity: step.velocity,
      });
    });
  };

  render() {
    return null;
  }
}

export default Midi;
