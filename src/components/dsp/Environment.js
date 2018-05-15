import React, { Component } from "react";
import "./Environment.css";

const context = new AudioContext();

class Environment extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.masterGain = context.createGain();
    this.aux = context.createGain();
    this.masterGain.gain.setValueAtTime(1, context.currentTime);
    this.masterGain.connect(context.destination);
    this.masterGain.connect(this.aux);
  }

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: context,
        masterGain: this.masterGain,
        aux: this.aux
      })
    );

    return (
      <div className="environment">
        <p>Environment</p>
        {childrenWithContext}
      </div>
    );
  }
}

export default Environment;
