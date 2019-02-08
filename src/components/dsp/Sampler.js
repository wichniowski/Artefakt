import React, { Component } from "react";
import BufferLoader from "../../core/BufferLoader";
import { SequencerContext } from "./Sequencer";

class Sampler extends Component {
  static contextType = SequencerContext;
  componentDidMount() {
    this.bufferLoader = new BufferLoader(
      this.context.audioContext,
      [this.props.sample],
      buffer => {
        this.buffer = buffer;
        this.finishedLoading(buffer);

        this.context.onStep(step => {
          if (step.note !== 0) {
            this.play(this.buffer);
          }
        });
      }
    );

    this.bufferLoader.load();
  }

  finishedLoading = (buffer, time) => {
    this.source = this.context.audioContext.createBufferSource();
    this.source.buffer = buffer[0];
    this.source.connect(this.context.master.gain);
  };

  play(buffer) {
    this.finishedLoading(buffer);
    this.source.start(0);
  }

  render() {
    return null;
  }
}

export default Sampler;
