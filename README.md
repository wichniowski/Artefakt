# Reactor

## React Algorave Component Library

Prototype of a react and webaudio based live coding / algorave component library.

## Components

### Environment

Initializes the Webaudio Context

### ChannelStrip

| Name |  Type  |
| ---- | :----: |
| Gain | Number |

### Delay

| Name      |  Type  |
| --------- | :----: |
| delayTime | Number |
| feedback  | Number |

### Filter

| Name      |  Type  |
| --------- | :----: |
| frequency | Number |
| type      | String |

### Reverb

| Name       |  Type  |
| ---------- | :----: |
| decayTime  | Number |
| wet        | Number |
| dry        | Number |
| filterType | String |
| cutoff     | Number |

### Sampler

| Name   |  Type  |
| ------ | :----: |
| sample | String |

### Synth

| Name        |  Type  |
| ----------- | :----: |
| type        | String |
| frequncy    | Number |
| attackTime  | Number |
| releaseTime | Number |

### Sequencer

| Name  |     Type      |
| ----- | :-----------: |
| notes | Array<Number> |

See https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode for filtertypes
