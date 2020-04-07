import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Environment,
  ChannelStrip,
  Sequencer,
  Reverb,
  Filter,
  Poti,
  Analyzer,
} from "./index";
import Synth from "./components/Synth";
import "./App.css";
import { css } from "emotion";
import Distortion from "./components/Distortion";

const styles = {
  app: css``,
  heading: css`
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1rem;
    margin-bottom: 0;
  `,
  description: css`
    margin: 0;
    font-size: 0.75rem;
  `,
  container: css`
    padding: 25px;
    color: white;
    background: black;
    width: 300px;
    margin: 50px auto;
  `,
  potis: css`
    display: flex;
    flex-wrap: wrap;
  `,
  header: css`
    display: flex;
  `,
  analyzer: css`
    align-self: end;
    margin-left: auto;
  `,
};

function App() {
  const [diversions, setDiversions] = useState({
    osc1: {
      value: 0,
      waveform: "sawtooth",
    },
    osc2: {
      value: 0,
      waveform: "square",
    },
    osc3: {
      value: 0,
      waveform: "sine",
    },
    osc4: {
      value: 0,
      waveform: "triangle",
    },
  });

  const waveforms = ["square", "sine", "sawtooth", "triangle"];
  const colorsByWaveform = {
    square: "purple",
    sine: "green",
    sawtooth: "yellow",
    triangle: "blue",
  };

  const [waveformIndex, setWaveformIndex] = useState(0);
  const [filterFreq, setFilterFreq] = useState(10000);
  const [filterQ, setFilterQ] = useState(1);
  const [filterDetune, setFilterDetune] = useState(0);
  const [distortionAmount, setDistortionAmount] = useState(40);
  const [reverb, setReverb] = useState(0.2);
  const [audioContextRef, setAudioContextRef] = useState({
    audioContext: null,
    masterGain: null,
  });
  const [midiChannel, setMidiChannel] = useState("1");
  const [attack, setAttack] = useState(0.2);
  const [release, setRelease] = useState(1);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.heading}>Interuptor</h1>
            <p className={styles.description}>Supersaw engine</p>
          </div>
          <div className={styles.analyzer}>
            {audioContextRef.audioContext && (
              <Analyzer
                canvasDimensions={{ width: 100, height: 70 }}
                //@ts-ignore
                audioContext={audioContextRef.audioContext}
                //@ts-ignore
                masterGain={audioContextRef.masterGain}
              />
            )}
          </div>
        </div>
        <div className={styles.potis}>
          {Object.keys(diversions).map((key) => (
            <Poti
              max={2}
              //@ts-ignore
              color={colorsByWaveform[diversions[key].waveform]}
              onShiftClick={() => {
                //@ts-ignore
                let nextIndex = waveforms.indexOf(diversions[key].waveform) + 1;
                if (nextIndex === waveforms.length) {
                  nextIndex = 0;
                }
                console.log(nextIndex);
                setDiversions({
                  ...diversions,
                  [key]: {
                    //@ts-ignore
                    ...diversions[key],
                    waveform: waveforms[nextIndex],
                  },
                });
              }}
              onChange={(value) => {
                setDiversions({
                  ...diversions,
                  [key]: {
                    //@ts-ignore
                    ...diversions[key],
                    value,
                  },
                });
              }}
            />
          ))}
          <Poti
            max={1}
            onChange={(value) => {
              setAttack(value);
            }}
          />
          <Poti
            max={1}
            onChange={(value) => {
              setRelease(value);
            }}
          />
          <Poti
            color="yellow"
            max={20000}
            onChange={(value) => {
              setFilterFreq(value);
            }}
          />
          <Poti
            color="green"
            max={20}
            onChange={(value) => {
              setFilterQ(value);
            }}
          />
          <Poti
            color="purple"
            max={3}
            onChange={(value) => {
              setFilterDetune(value);
            }}
          />
          <Poti
            color="white"
            max={1}
            onChange={(value) => {
              setReverb(value);
            }}
          />
          <Poti
            color="gray"
            max={100}
            onChange={(value) => {
              setDistortionAmount(value);
            }}
          />
        </div>
      </div>

      <Environment
        bpm={160}
        audioContextRef={(audioContext, masterGain) => {
          setAudioContextRef({ audioContext, masterGain });
        }}
      >
        <ChannelStrip gain={reverb}>
          <Sequencer midi>
            <Synth type="sine" releaseTime={1} attackTime={0.2} />
          </Sequencer>
        </ChannelStrip>
        <ChannelStrip gain={0.1}>
          <Sequencer midi midiChannel={midiChannel}>
            <Filter frequency={filterFreq} q={filterQ} detune={filterDetune}>
              <Distortion amount={distortionAmount}>
                <Reverb decayTime={2}>
                  {Object.keys(diversions).map((key) => (
                    <Synth
                      //@ts-ignore
                      type={diversions[key].waveform}
                      releaseTime={1}
                      attackTime={attack}
                      //@ts-ignore
                      tune={diversions[key].value}
                    />
                  ))}
                </Reverb>
              </Distortion>
            </Filter>
          </Sequencer>
        </ChannelStrip>
      </Environment>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
