import React, { Component } from "react";
import PropTypes, { array } from "prop-types";
import Tone from "tone";
import { ChannelContext } from "../ChannelStrip";

interface SequencerProps {
  notes: Array<number>;
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
  master: null
});

class Sequencer extends Component<SequencerProps> {
  static contextType = ChannelContext;
  static defaultProps = {
    interval: "4n"
  };
  transport: any;

  note = 100;
  clockCount = 0;

  componentDidMount() {
    Tone.Transport.start();
  }

  getNote = () => {
    if (this.props.notes) {
      this.note = this.props.notes[this.clockCount];
      this.clockCount =
        this.clockCount + 1 < this.props.notes.length ? this.clockCount + 1 : 0;
      return this.note;
    }
  };

  getAutomation = () => {
    if (this.props.automation) {
      return Object.keys(this.props.automation)
        .map(key => {
          return {
            [key]:
              (this.props.automation &&
                this.props.automation[key][this.clockCount]) ||
              0
          };
        })
        .reduce((cur, prev) => {
          return {
            ...cur,
            ...prev
          };
        }, {});
    }
  };

  onStep = (callback: (step: any) => void) => {
    if (this.transport) {
      Tone.Transport.clear(this.transport);
    }
    this.transport = Tone.Transport.scheduleRepeat(
      () => {
        if (callback) {
          callback({ note: this.getNote(), automation: this.getAutomation() });
        }
      },
      this.props.interval,
      "1m"
    );
  };

  componentWillUnmount() {
    Tone.Transport.clear(this.transport);
  }

  render() {
    return (
      <SequencerContext.Provider
        value={{
          onStep: (step: any) => this.onStep(step),
          audioContext: this.context.audioContext,
          master: this.context.master
        }}
      >
        {this.props.children}
      </SequencerContext.Provider>
    );
  }
}

Sequencer.defaultProps = {
  interval: "4n"
};

export default Sequencer;
