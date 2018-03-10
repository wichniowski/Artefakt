import React, { Component } from "react";
import BufferLoader from '../core/BufferLoader';

class Sampler extends Component {
  constructor(props) {
    super(props);
    this.bufferLoader = new BufferLoader(
      props.context,
      [
        props.sample,
      ],
      (buffer) => {
          this.buffer = buffer;
          this.finishedLoading(buffer)
      }
    );

    this.bufferLoader.load();
  }

  componentWillReceiveProps(newProps) {
    if(this.source && this.buffer && newProps.note !== 0) {
        this.finishedLoading(this.buffer);
    }
  }

  finishedLoading = (buffer, time) => {
    this.source = this.props.context.createBufferSource();
    this.source.buffer = buffer[0];
    this.source.connect(this.props.masterGain);
    this.source.start(0);
  }

  render() {
    return <div />;
  }
}

export default Sampler;
