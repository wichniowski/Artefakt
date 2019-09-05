"use strict";

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _Sequencer = require("../Sequencer");

var Synth =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Synth, _Component);

  function Synth() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Synth);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Synth)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "oscillator", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "vca", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initDSP", function () {
      var _this$props = _this.props,
          type = _this$props.type,
          frequency = _this$props.frequency;
      var _this$context = _this.context,
          audioContext = _this$context.audioContext,
          master = _this$context.master;
      _this.oscillator = audioContext.createOscillator();
      _this.oscillator.type = type;

      _this.oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      _this.vca = audioContext.createGain();

      _this.oscillator.connect(_this.vca);

      _this.vca.connect(master.gain);

      _this.vca.gain.setValueAtTime(0, audioContext.currentTime);

      _this.oscillator.start();

      _this.initSeq();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initSeq", function () {
      // Todo: Define Step type
      _this.context.onStep(function (step) {
        if (step.note === 0) {
          return null;
        }

        _this.oscillator.frequency.setValueAtTime(step.note, _this.context.audioContext.currentTime);

        var now = _this.context.audioContext.currentTime;

        _this.vca.gain.cancelScheduledValues(now);

        _this.vca.gain.setValueAtTime(0, now * _this.props.releaseTime);

        _this.vca.gain.linearRampToValueAtTime(1, now + _this.props.attackTime);

        _this.vca.gain.linearRampToValueAtTime(0, now + _this.props.releaseTime);
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Synth, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initDSP();
      this.initSeq();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Synth;
}(_react.Component);

Synth.displayName = "Synth";
(0, _defineProperty2.default)(Synth, "propTypes", {
  type: _propTypes.default.any,
  frequency: _propTypes.default.number,
  releaseTime: _propTypes.default.number,
  attackTime: _propTypes.default.number
});
(0, _defineProperty2.default)(Synth, "contextType", _Sequencer.SequencerContext);
(0, _defineProperty2.default)(Synth, "defaultProps", {
  type: "sine",
  frequency: 120,
  attackTime: 0,
  releaseTime: 0.5
});
var _default = Synth;
exports.default = _default;