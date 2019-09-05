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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Sequencer = require("../Sequencer");

var Kick =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Kick, _Component);

  function Kick() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Kick);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Kick)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "osc", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "gain", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentTime", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "frequencyAutomation", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setupOSC", function (props, context) {
      var audioContext = context.audioContext,
          master = context.master;
      _this.osc = audioContext.createOscillator();
      _this.osc.type = props.waveform;
      _this.gain = audioContext.createGain();

      _this.osc.connect(_this.gain);

      _this.gain.connect(master.gain);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setAutomation", function (automation) {
      if (automation) {
        if (automation.frequency) {
          _this.frequencyAutomation = automation.frequency;
        }
      }
    });
    return _this;
  }

  (0, _createClass2.default)(Kick, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.context.onStep(function (step) {
        if (step.note !== 0) {
          _this2.trigger();

          _this2.setAutomation(step.automation);
        }
      });
    }
  }, {
    key: "trigger",
    value: function trigger() {
      this.setupOSC(this.props, this.context);
      this.currentTime = this.context.audioContext.currentTime;
      this.osc.frequency.setValueAtTime(this.props.frequency + this.frequencyAutomation, this.currentTime);
      this.gain.gain.setValueAtTime(1, this.currentTime);
      this.osc.frequency.exponentialRampToValueAtTime(0.01, this.currentTime + this.props.amount);
      this.gain.gain.exponentialRampToValueAtTime(0.02, this.currentTime + this.props.release);
      this.osc.start(this.currentTime);
      this.osc.stop(this.currentTime + this.props.release);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, this.props.children);
    }
  }]);
  return Kick;
}(_react.Component);

Kick.displayName = "Kick";
(0, _defineProperty2.default)(Kick, "propTypes", {
  amount: _propTypes.default.number,
  frequency: _propTypes.default.number,
  waveform: _propTypes.default.any,
  release: _propTypes.default.number
});
(0, _defineProperty2.default)(Kick, "contextType", _Sequencer.SequencerContext);
(0, _defineProperty2.default)(Kick, "defaultProps", {
  amount: 0.5,
  frequency: 240,
  waveform: "sine",
  release: 0.5
});
var _default = Kick;
exports.default = _default;