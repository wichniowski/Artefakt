import React, { Component } from "react";

class ChannelStrip extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.channel = props.context.createGain();
    this.channel.gain.setValueAtTime(props.gain, props.context.currentTime);
    this.channel.connect(props.masterGain);
  }

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: this.props.context,
        masterGain: this.channel
      })
    );

    return <div>{childrenWithContext}</div>;
  }
}

export default ChannelStrip;
