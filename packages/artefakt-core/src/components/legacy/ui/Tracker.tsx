import React, { Component } from "react";
import { css, cx } from "emotion";
import WebMidi from "webmidi";

const styles = {
  tracker: css`
    flex: 1;
    background: black;
    display: inline-block;
  `,
  trackerList: css`
    list-style: none;
    padding: 0px;
  `,
  trackerListItem: css`
    margin-bottom: 10px;
  `,

  trackerListItemInput: css`
    outline: none;
    appearance: none;
    -moz-appearance: none;
    background: transparent;
    color: white;
    border: none;
    display: inline-block;
    width: 50px;
    -moz-appearance: textfield;
    text-align: center;
  `,
  trackListItemActive: css`
    color: red;
    &::placehoder {
      color: red;
    }
  `,
};

interface TrackerProps {
  notes: [number];
  onStep: (clockCount: number, step: any) => void;
  midiInputName: string | null;
  midiChannel: 1;
}

interface TrackerState {
  notes: [number];
  activeStep: number;
}

class Tracker extends Component<TrackerProps, TrackerState> {
  static defaultProps = {
    notes: [0, 0, 0, 0, 0, 0, 0, 0],
    onStep: () => {},
    midiInputName: null,
    midiChannel: 16,
  };
  state = {
    notes: this.props.notes,
    activeStep: 0,
  };

  midiInput: any = null;

  componentDidMount() {
    WebMidi.enable((err) => {
      const inputs = WebMidi.inputs.map((input) => input.name);
      console.log("Midi inputs:", inputs);

      const currentMidiInputName = this.props.midiInputName || inputs[0];
      this.midiInput = WebMidi.getInputByName(currentMidiInputName);
      this.midiInput.addListener("noteon", this.props.midiChannel, (e: any) => {
        if (this.state.activeStep + 1 > this.state.notes.length) {
          this.handleStep(0, this.state.notes[this.state.activeStep]);
        } else {
          this.handleStep(
            this.state.activeStep + 1,
            this.state.notes[this.state.activeStep]
          );
        }
      });
    });
  }

  setNote = (e: any, index: number) => {
    if (!isNaN(parseFloat(e.target.value))) {
      let notes = this.state.notes;
      notes[index] = parseInt(e.target.value);
      this.setState({
        notes,
      });
    }
  };

  handleStep = (clockCount: number, note: number) => {
    this.setState({
      activeStep: clockCount,
    });
    if (this.state.notes[clockCount] !== 0) {
      this.props.onStep(clockCount, this.state.notes[clockCount]);
    }
  };

  render() {
    return (
      <div className={styles.tracker}>
        <ul className={styles.trackerList}>
          {this.props.notes.map((note, index) => (
            <li className={styles.trackerListItem}>
              <input
                className={cx(styles.trackerListItemInput, {
                  [styles.trackListItemActive]: this.state.activeStep === index,
                })}
                min={0}
                placeholder="0"
                onChange={(e) => {
                  this.setNote(e, index);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Tracker;
