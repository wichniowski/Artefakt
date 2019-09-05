"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WebAudioContext = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _tone = _interopRequireDefault(require("tone"));

var _Analyzer = _interopRequireDefault(require("../legacy/ui/Analyzer"));

var audioContext = new AudioContext();

var WebAudioContext = _react.default.createContext({
  audioContext: audioContext
});

exports.WebAudioContext = WebAudioContext;

var Environment =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Environment, _Component);

  function Environment(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Environment);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Environment).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "masterGain", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "aux", void 0);

    _tone.default.Transport.bpm.rampTo(props.bpm, 4);

    _tone.default.Transport.swing = 0;
    _this.masterGain = audioContext.createGain();
    _this.aux = audioContext.createGain();

    _this.masterGain.gain.setValueAtTime(1, audioContext.currentTime);

    _this.masterGain.connect(audioContext.destination);

    _this.masterGain.connect(_this.aux);

    return _this;
  }

  (0, _createClass2.default)(Environment, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Analyzer.default, {
        audioContext: audioContext,
        masterGain: this.masterGain
      }), _react.default.createElement(WebAudioContext.Provider, {
        value: {
          audioContext: audioContext,
          master: {
            gain: this.masterGain
          },
          aux: this.aux
        }
      }, children));
    }
  }]);
  return Environment;
}(_react.Component);

Environment.displayName = "Environment";
(0, _defineProperty2.default)(Environment, "propTypes", {
  bpm: _propTypes.default.number
});
(0, _defineProperty2.default)(Environment, "defaultProps", {
  bpm: 130
});
Environment.defaultProps = {
  bpm: 130
};
var _default = Environment;
exports.default = _default;