import React, { Component } from "react";
import Sequencer from "../dsp/Sequencer";
import "./Tracker.css";

class Tracker extends Component {
  state = {
    notes: this.props.notes
  };
  setNote = (e, index) => {
    if (!isNaN(parseFloat(e.target.value))) {
      let notes = this.state.notes;
      notes[index] = parseInt(e.target.value);
      this.setState({
        notes
      });
    }
  };

  handleStep = (clockCount, note) => {
    this.setState({
      activeStep: clockCount
    });
    this.props.onStep(clockCount, this.state.notes[clockCount]);
  };

  render() {
    return (
      <div className="tracker">
        <ul className="tracker_list">
          {this.props.notes.map((note, index) => (
            <li
              className={`tracker_list_item ${
                this.state.activeStep === index ? "active" : ""
              }`}
              key={index}
            >
              <input
                min={0}
                value={this.state.notes[index]}
                onChange={e => this.setNote(e, index)}
              />
            </li>
          ))}
        </ul>
        <Sequencer
          notes={this.state.notes}
          bpm={this.props.bpm}
          onStep={this.handleStep}
        >
          {this.props.children}
        </Sequencer>
      </div>
    );
  }
}

Tracker.defaultProps = {
  notes: [100, 200, 300, 400, 100, 200, 300, 400],
  onStep: () => {}
};

export default Tracker;
