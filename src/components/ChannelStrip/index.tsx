import React, { Component } from "react";
import { WebAudioContext } from "../Environment";
import Analyzer from "../legacy/ui/Analyzer";

export interface IChannelContext {
  audioContext: AudioContext;
  master: {
    gain: GainNode;
  };
}

interface ChannelStripProps {
  gain: number;
  withAnalyzer: boolean;
}

export const ChannelContext = React.createContext({});

class ChannelStrip extends Component<ChannelStripProps> {
  static contextType = WebAudioContext;
  static defaultProps = {
    gain: 0.8,
    withAnalyzer: false
  };

  channel!: GainNode;

  constructor(props: ChannelStripProps, context: IChannelContext) {
    super(props);
    const { audioContext, master } = context;
    const { gain } = props;
    this.channel = audioContext.createGain();
    this.channel.gain.setValueAtTime(gain, audioContext.currentTime);
    this.channel.connect(master.gain);
  }

  render() {
    const { withAnalyzer, children } = this.props;
    return (
      <ChannelContext.Provider
        value={{
          audioContext: this.context.audioContext,
          master: {
            gain: this.channel
          }
        }}
      >
        {withAnalyzer && (
          <Analyzer
            audioContext={this.context.audioContext}
            masterGain={this.channel}
          />
        )}
        {children}
      </ChannelContext.Provider>
    );
  }
}

export default ChannelStrip;
