import React, { Component } from "react";
import { SequencerContext } from "../Sequencer";
import WebMidi from "webmidi";

interface MidiProps {
  note?: string;
  outputName?: string;
  channel?: number;
}
class Midi extends Component<MidiProps> {
  static contextType = SequencerContext;
  output: any = null;

  componentWillMount() {
    const { outputName } = this.props;

    WebMidi.enable(err => {
      console.log("Midi inputs:", WebMidi.inputs.map(input => input.name));
      console.log("Midi outputs", WebMidi.outputs.map(output => output.name));

      if (outputName) {
        this.output = WebMidi.getOutputByName(outputName);
        if (this.output) {
          this.initSeq(this.output);
        }
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
        velocity: step.velocity
      });
    });
  };

  render() {
    return null;
  }
}

export default Midi;
