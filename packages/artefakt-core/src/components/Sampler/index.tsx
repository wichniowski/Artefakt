import { Component } from "react";
import BufferLoader from "../../core/BufferLoader";
import { SequencerContext, ISequencerContext } from "../Sequencer";

interface SamplerProps {
  sample: string;
}

class Sampler extends Component<SamplerProps> {
  static contextType = SequencerContext;
  bufferLoader: BufferLoader;
  buffer!: AudioBuffer;
  source!: AudioBufferSourceNode;

  constructor(props: SamplerProps, context: ISequencerContext) {
    super(props);

    this.bufferLoader = new BufferLoader(
      context.audioContext,
      [props.sample],
      (buffer: AudioBuffer) => {
        this.buffer = buffer;

        this.finishedLoading(buffer);

        this.context.onStep((step: any) => {
          if (step.note !== 0) {
            this.play(this.buffer);
          }
        });
      }
    );

    this.bufferLoader.load();
  }

  finishedLoading = (buffer: AudioBuffer) => {
    this.source = this.context.audioContext.createBufferSource();

    // @ts-ignore
    this.source.buffer = buffer[0];
    this.source.connect(this.context.master.gain);
  };

  play(buffer: AudioBuffer) {
    this.finishedLoading(buffer);
    this.source.start(0);
  }

  render() {
    return null;
  }
}

export default Sampler;
