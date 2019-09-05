"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Synth = _interopRequireDefault(require("../dsp/Synth"));

var _Filter = _interopRequireDefault(require("../dsp/Filter"));

var _Tracker = _interopRequireDefault(require("../ui/Tracker"));

var _Delay = _interopRequireDefault(require("../dsp/Delay"));

var _ChannelStrip = _interopRequireDefault(require("../dsp/ChannelStrip"));

require("./SynthModule.css");

var generateScale = function generateScale() {
  var hz = [261.63, 293.66, 329.63, 369.99, 392.0, 440.0, 493.88];
  var scale = [];
  var factor = [0.5, 1, 2, 4];

  for (var i = 0; i <= 7; i++) {
    scale.push(hz[Math.floor(Math.random() * hz.length)] * factor[Math.floor(Math.random() * factor.length)]);
  }

  return scale;
};

var SynthModule =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SynthModule, _Component);

  function SynthModule() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SynthModule);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SynthModule)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      filterFreq: 900,
      attackTime: 0,
      releaseTime: 1,
      note: 1000,
      bpmFactor: 1,
      scale: generateScale()
    });
    return _this;
  }

  (0, _createClass2.default)(SynthModule, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "synth-module"
      }, _react.default.createElement(_ChannelStrip.default, {
        gain: 1
      }, _react.default.createElement(_Delay.default, {
        delayTime: 0.4
      }, _react.default.createElement(_Filter.default, {
        frequency: this.state.filterFreq
      }, _react.default.createElement(_Tracker.default, {
        notes: this.state.scale,
        bpm: this.props.bpm * this.state.bpmFactor
      }, _react.default.createElement(_Synth.default, {
        type: "sawtooth",
        attackTime: this.state.attackTime,
        releaseTime: this.state.releaseTime
      })), _react.default.createElement(_Tracker.default, {
        notes: [0, 0, 0, 0, 0, 0, 0, 0],
        bpm: this.props.bpm * this.state.bpmFactor,
        onStep: function onStep(_, note) {
          return _this2.setState({
            attackTime: note
          });
        }
      }), _react.default.createElement(_Tracker.default, {
        notes: [0, 0, 0, 0, 0, 0, 0, 0],
        bpm: this.props.bpm * this.state.bpmFactor,
        onStep: function onStep(_, note) {
          return _this2.setState({
            releaseTime: note
          });
        }
      }), _react.default.createElement(_Tracker.default, {
        notes: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
        bpm: this.props.bpm * this.state.bpmFactor,
        onStep: function onStep(_, note) {
          return _this2.setState({
            filterFreq: note
          });
        }
      })))));
    }
  }]);
  return SynthModule;
}(_react.Component);

SynthModule.displayName = "SynthModule";
var _default = SynthModule;
exports.default = _default;