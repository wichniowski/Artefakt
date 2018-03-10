import React, { Component } from "react";

const context = new AudioContext();

class Environment extends Component {
  state = {};
  constructor(props) {
		super(props);
		this.masterGain = context.createGain();
		this.masterGain.gain.setValueAtTime(1, context.currentTime);
		this.masterGain.connect(context.destination);
  }

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: context,
        masterGain: this.masterGain
      })
    );

    return <div>{childrenWithContext}</div>;
  }
}

export default Environment;
