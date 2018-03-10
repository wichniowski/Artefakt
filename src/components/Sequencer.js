import React, { Component } from "react";
import Scheduler from "../core/Scheduler";

class Sequencer extends Component {
  state = {
    note: 100,
    clockCount: 0
  };

  componentDidMount() {
    const scheduler = new Scheduler(
      this.props.context,
      () => this.setStep(),
      this.props.bpm
    );
    scheduler.handlePlay();
  }

  setStep = () => {
    this.setState({
      note: this.props.notes[this.state.clockCount],
      clockCount:
        this.state.clockCount + 1 < this.props.notes.length
          ? this.state.clockCount + 1
          : 0
    });
  };

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: this.props.context,
        masterGain: this.props.masterGain,
        note: this.state.note
      })
    );

    return (
      <div className="sequencer">
        <p>Sequencer</p>
        {childrenWithContext}
      </div>
    );
  }
}

Sequencer.defaultProps = {
  bpm: 60
};

export default Sequencer;
