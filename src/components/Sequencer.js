import React, { Component } from "react";

class Filter extends Component {
  state = {
    note: 100,
    clockCount: 0
  };
  componentDidMount() {
    this.clock = setInterval(() => {
      this.setStep();
    }, 60000 / this.props.bpm);
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

    return <div>{childrenWithContext}</div>;
  }
}

export default Filter;
