import React, { useState } from 'react';
import {
  Environment,
  ChannelStrip,
  Sequencer,
  Reverb,
  Filter,
  Poti,
  Analyzer,
  Tracker,
  Synth,
  Distortion,
} from 'artefakt';
import { css } from 'emotion';

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
    border: 2px solid white;
    border-radius: 5px;
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
    margin-bottom: 25px;
  `,
  analyzer: css`
    align-self: end;
    margin-left: auto;
  `,
  trackers: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-top: 2px solid white;
    margin-top: 25px;
  `,
};

function App() {
  const [oscillators, setOscillators] = useState({
    osc1: {
      value: 0,
      waveform: 'sawtooth',
    },
    osc2: {
      value: 0,
      waveform: 'square',
    },
    osc3: {
      value: 0,
      waveform: 'sine',
    },
    osc4: {
      value: 0,
      waveform: 'triangle',
    },
  });

  const waveforms = ['square', 'sine', 'sawtooth', 'triangle'];
  const outlinesByWafeform = {
    square: 'solid',
    sine: 'dotted',
    sawtooth: 'dashed',
    triangle: 'double',
  };

  const [filterFreq, setFilterFreq] = useState(10000);
  const [filterQ, setFilterQ] = useState(1);
  const [filterDetune, setFilterDetune] = useState(0);
  const [distortionAmount, setDistortionAmount] = useState(40);
  const [subVolume, setSubVolume] = useState(0);
  const [reverbDecayTime, setReverbDecayTime] = useState(0.2);
  const [audioContextRef, setAudioContextRef] = useState({
    audioContext: null,
    masterGain: null,
  });
  const [midiChannel] = useState('1');
  const [attack, setAttack] = useState(0.2);
  const [release, setRelease] = useState(1);

  const renderOscPotis = () =>
    Object.keys(oscillators).map(key => (
      <Poti
        max={2}
        outlineStyle={outlinesByWafeform[oscillators[key].waveform]}
        onShiftClick={() => {
          let nextIndex = waveforms.indexOf(oscillators[key].waveform) + 1;
          if (nextIndex === waveforms.length) {
            nextIndex = 0;
          }
          setOscillators({
            ...oscillators,
            [key]: {
              ...oscillators[key],
              waveform: waveforms[nextIndex],
            },
          });
        }}
        onChange={(value: string) => {
          setOscillators({
            ...oscillators,
            [key]: {
              ...oscillators[key],
              value,
            },
          });
        }}
      />
    ));

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.heading}>Resovox</h1>
            <p className={styles.description}>Supersaw engine</p>
            <p className={styles.description}>Quattro Oscillazione</p>
          </div>
          <div className={styles.analyzer}>
            {audioContextRef.audioContext && (
              <Analyzer
                canvasDimensions={{ width: 100, height: 70 }}
                audioContext={audioContextRef.audioContext}
                masterGain={audioContextRef.masterGain}
              />
            )}
          </div>
        </div>
        <div className={styles.potis}>
          {renderOscPotis()}
          <Poti
            max={1}
            onChange={value => {
              setAttack(value);
            }}
          />
          <Poti
            max={1}
            onChange={value => {
              setRelease(value);
            }}
          />
          <Poti
            max={20000}
            onChange={value => {
              setFilterFreq(value);
            }}
          />
          <Poti
            max={20}
            onChange={value => {
              setFilterQ(value);
            }}
          />
          <Poti
            max={3}
            onChange={value => {
              setFilterDetune(value);
            }}
          />
          <Poti
            max={1}
            onChange={value => {
              // setSubVolume(value);
            }}
          />
          <Poti
            max={100}
            onChange={value => {
              setDistortionAmount(value);
            }}
          />
          <Poti
            max={3}
            onChange={value => {
              setReverbDecayTime(value);
            }}
          />
        </div>

        <div className={styles.trackers}>
          <Tracker
            key="freq"
            onStep={(_step, value) => {
              if (Number.isInteger(value) && value > 0) {
                setFilterFreq(value);
              }
            }}
          />
          <Tracker key="res" onStep={() => {}} />
          <Tracker
            key="attack"
            onStep={(_, value) => {
              // setAttack(value);
            }}
          />

          <Tracker
            key="release"
            onStep={(_, value) => {
              // setRelease(value);
            }}
          />

          <Tracker key="lorem" />
        </div>
      </div>

      <Environment
        bpm={160}
        audioContextRef={(audioContext, masterGain) => {
          setAudioContextRef({ audioContext, masterGain });
        }}
      >
        <ChannelStrip gain={subVolume}>
          <Sequencer midi>
            <Synth type="sine" releaseTime={1} attackTime={0.2} />
          </Sequencer>
        </ChannelStrip>
        <ChannelStrip gain={0.8}>
          <Sequencer midi midiChannel={midiChannel}>
            <Filter frequency={filterFreq} q={filterQ} detune={filterDetune}>
              <Distortion amount={distortionAmount}>
                <Reverb decayTime={reverbDecayTime}>
                  {Object.keys(oscillators).map(key => (
                    <Synth
                      type={oscillators[key].waveform}
                      releaseTime={release}
                      attackTime={attack}
                      tune={oscillators[key].value}
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

export default App;
