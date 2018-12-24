import React, { Component } from "react";
import Environment from "./components/dsp/Environment";
import Synth from "./components/dsp/Synth";
import "./Track.css";
import Sequencer from "./components/dsp/Sequencer";
import Sampler from "./components/dsp/Sampler";
import ChannelStrip from "./components/dsp/ChannelStrip";
import Reverb from "./components/dsp/Reverb";
import Filter from "./components/dsp/Filter";
import Kick from "./components/dsp/Kick";
import Delay from "./components/dsp/Delay";
import Distortion from "./components/dsp/Distortion";

class Track extends Component {
  render() {
    return (
      <Environment bpm={140}>
        <ChannelStrip>
          <Distortion>
            <Sequencer
              notes={[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]}
              interval="8n"
            >
              <Kick amount={1} frequency={240} waveform="sine" release={1} />
            </Sequencer>
          </Distortion>
        </ChannelStrip>
        <ChannelStrip gain={0.2}>
          <Reverb>
            <Delay delayTime={0.001}>
              <Sequencer
                notes={[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]}
                interval="4n"
              >
                <Kick amount={1} frequency={600} waveform="square" />
              </Sequencer>
            </Delay>
          </Reverb>
        </ChannelStrip>
        <ChannelStrip gain={0.2}>
          <Reverb decayTime={2}>
            <Sequencer notes={[60, 60, 0, 120, 0, 0, 480, 0]} interval="16n">
              <Synth type="sine" />
            </Sequencer>
          </Reverb>
        </ChannelStrip>
        <ChannelStrip gain={0.2}>
          <Reverb>
            <Delay delayTime={0.01}>
              <Sequencer notes={[1, 1, 0, 0, 0, 0, 1, 0]} interval="4n">
                <Kick amount={1} frequency={1200} waveform="square" />
              </Sequencer>
            </Delay>
          </Reverb>
        </ChannelStrip>
        <ChannelStrip gain={0.6}>
          <Reverb>
            <Filter frequency={10000} type="highpass">
              <Sequencer
                notes={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                interval="4n"
              >
                <Sampler sample="./sounds/hihat.wav" />
              </Sequencer>
            </Filter>
          </Reverb>
        </ChannelStrip>
        <ChannelStrip gain={0.6}>
          <Reverb>
            <Sequencer notes={[0, 1, 0, 1]} interval="2n">
              <Sampler sample="./sounds/clap.wav" />
            </Sequencer>
          </Reverb>
        </ChannelStrip>
      </Environment>
    );
  }
}

export default Track;
