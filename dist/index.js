"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChannelStrip = _interopRequireDefault(require("./components/ChannelStrip"));

var _Environment = _interopRequireDefault(require("./components/Environment"));

var _Distortion = _interopRequireDefault(require("./components/Distortion"));

var _Filter = _interopRequireDefault(require("./components/Filter"));

var _Kick = _interopRequireDefault(require("./components/Kick"));

var _Reverb = _interopRequireDefault(require("./components/Reverb"));

var _Sampler = _interopRequireDefault(require("./components/Sampler"));

var _Sequencer = _interopRequireDefault(require("./components/Sequencer"));

var _Synth = _interopRequireDefault(require("./components/Synth"));

var _default = {
  ChannelStrip: _ChannelStrip.default,
  Environment: _Environment.default,
  Distortion: _Distortion.default,
  Filter: _Filter.default,
  Kick: _Kick.default,
  Reverb: _Reverb.default,
  Sampler: _Sampler.default,
  Sequencer: _Sequencer.default,
  Synth: _Synth.default
};
exports.default = _default;