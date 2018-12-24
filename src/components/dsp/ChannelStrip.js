import React, { Component } from "react";
import PropTypes from "prop-types";
import { WebAudioContext } from "./Environment";
import Analyzer from "../ui/Analyzer";

export const ChannelContext = React.createContext();
class ChannelStrip extends Component {
  state = {};
  static contextType = WebAudioContext;

  componentWillMount() {
    const { audioContext, master } = this.context;
    const { gain } = this.props;
    this.channel = audioContext.createGain();
    this.channel.gain.setValueAtTime(gain, audioContext.currentTime);
    this.channel.connect(master.gain);
  }

  render() {
    const { children } = this.props;
    return (
      <ChannelContext.Provider
        value={{
          audioContext: this.context.audioContext,
          master: {
            gain: this.channel
          }
        }}
      >
        <Analyzer
          audioContext={this.context.audioContext}
          masterGain={this.channel}
        />
        {children}
      </ChannelContext.Provider>
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
