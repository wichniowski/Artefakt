import React, { Component } from "react";
import Tone from "tone";
import WebMidi from "webmidi";
import { ChannelContext } from "../ChannelStrip";
import Analyzer from "../legacy/ui/Analyzer";

interface SequencerProps {
  midi?: boolean;
  midiInputName?: string;
  midiChannel?: string;
  notes?: Array<number | string>;
  stepDurations?: Array<number | string>;
  stepVelocities?: Array<number | string>;
  automation?: { [key: string]: Array<number> };
  interval: string;
}

// Todo: Fix step type
export interface ISequencerContext {
  onStep: (step: any) => {};
  audioContext: AudioContext;
  master: GainNode;
}

export const SequencerContext = React.createContext({
  onStep: (step: any) => {},
  audioContext: null,
  master: null,
});

class Sequencer extends Component<SequencerProps> {
  static contextType = ChannelContext;
  static defaultProps = {
    interval: "4n",
    midiChannel: "1",
  };
  state = {
    transportReady: false,
  };
  transport: any;

  note = 100;
  clockCount = 0;

  midiInputName: string | null = null;
  midiListener: any;
  midiInput: any;

  constructor(props: SequencerProps) {
    super(props);

    if (props.midi) {
      this.setupMidiReceive();
    } else {
      this.setState({
        transportReady: true,
      });
    }
  }

  componentDidMount() {
    if (!this.props.midi) {
      Tone.Transport.start();
    }
  }

  setupMidiReceive = () => {
    const { midiInputName } = this.props;
    WebMidi.enable((err) => {
      const inputs = WebMidi.inputs.map((input) => input.name);
      console.log("Midi inputs:", inputs);

      const currentMidiInputName = midiInputName || inputs[0];
      this.midiInput = WebMidi.getInputByName(currentMidiInputName);
      this.setState({
        transportReady: true,
      });
    });
  };

  getStepProperty = (
    prop: (string | number)[] | undefined,
    stepNumber: number
  ) => {
    if (prop) {
      const step = prop[stepNumber];
      return step;
    } else {
      return undefined;
    }
  };

  getAutomation = () => {
    if (this.props.automation) {
      return Object.keys(this.props.automation)
        .map((key) => {
          return {
            [key]:
              (this.props.automation &&
                this.props.automation[key][this.clockCount]) ||
              0,
          };
        })
        .reduce((cur, prev) => {
          return {
            ...cur,
            ...prev,
          };
        }, {});
    }
  };

  onStep = (callback: (step: any) => void) => {
    if (this.props.midi) {
      this.midiInput.addListener("noteon", this.props.midiChannel, (e: any) => {
        callback({ note: Tone.Frequency.mtof(e.note.number), rawMidi: e });
      });
    } else {
      if (this.transport) {
        Tone.Transport.clear(this.transport);
      }
      this.transport = Tone.Transport.scheduleRepeat(
        () => {
          if (!this.props.notes) {
            return null;
          }

          this.clockCount =
            this.clockCount + 1 < this.props.notes.length
              ? this.clockCount + 1
              : 0;
          if (callback) {
            callback({
              note: this.getStepProperty(this.props.notes, this.clockCount),
              automation: this.getAutomation(),
              duration: this.getStepProperty(
                this.props.stepDurations,
                this.clockCount
              ),
              velocity: this.getStepProperty(
                this.props.stepVelocities,
                this.clockCount
              ),
            });
          }
        },
        this.props.interval,
        "1m"
      );
    }
  };

  componentWillUnmount() {
    if (!this.props.midi) {
      Tone.Transport.clear(this.transport);
    }
  }

  render() {
    console.log(this.state.transportReady);
    return (
      this.state.transportReady && (
        <SequencerContext.Provider
          value={{
            onStep: (step: any) => {
              this.onStep(step);
            },
            audioContext: this.context.audioContext,
            master: this.context.master,
          }}
        >
          {this.props.children}
        </SequencerContext.Provider>
      )
    );
  }
}

export default Sequencer;
