import React, { Component } from "react";
import Scheduler from "../../core/Scheduler";
import PropTypes from "prop-types";
import Tone from "tone";
import { ChannelContext } from "./ChannelStrip";

export const SequencerContext = React.createContext();
class Sequencer extends Component {
  note = 100;
  clockCount = 0;
  static contextType = ChannelContext;

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

  onStep = callback => {
    if (this.transport) {
      Tone.Transport.clear(this.transport);
    }
    this.transport = Tone.Transport.scheduleRepeat(
      time => {
        if (callback) {
          callback(this.getNote());
        }
      },
      this.props.interval,
      "1m"
    );
  };

  componentWillUnmount() {
    console.log(this.transport);
    Tone.Transport.clear(this.transport);
  }

  render() {
    return (
      <SequencerContext.Provider
        value={{
          onStep: this.onStep,
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

Sequencer.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.number)
};

export default Sequencer;
