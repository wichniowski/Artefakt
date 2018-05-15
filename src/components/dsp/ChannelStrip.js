import React, { Component } from "react";
import PropTypes from "prop-types";

class ChannelStrip extends Component {
  state = {};
  constructor(props) {
    super(props);
    const { context, masterGain, gain } = props;
    this.channel = context.createGain();
    this.channel.gain.setValueAtTime(gain, context.currentTime);
    this.channel.connect(masterGain);
  }

  render() {
    const { children, context } = this.props;
    const childrenWithContext = React.Children.map(children, child =>
      React.cloneElement(child, {
        context: context,
        masterGain: this.channel
      })
    );

    return (
      <div className="channelstrip">
        <p>ChannelStrip</p>
        {childrenWithContext}
      </div>
    );
  }
}

ChannelStrip.defaultProps = {
  gain: 0.8
};

ChannelStrip.propTypes = {
  context: PropTypes.instanceOf(AudioContext),
  masterGain: PropTypes.instanceOf(GainNode),
  gain: PropTypes.number,
  children: PropTypes.node
};

export default ChannelStrip;
