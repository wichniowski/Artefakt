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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _ChannelStrip = require("../ChannelStrip");

var Delay =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Delay, _Component);

  function Delay(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Delay);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Delay).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "delay", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "feedback", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "filter", void 0);
    var delayTime = props.delayTime,
        feedback = props.feedback;
    var audioContext = context.audioContext,
        master = context.master;
    _this.delay = audioContext.createDelay();
    _this.delay.delayTime.value = delayTime;
    _this.feedback = audioContext.createGain();
    _this.feedback.gain.value = feedback;
    _this.filter = audioContext.createBiquadFilter();
    _this.filter.frequency.value = 1000;

    _this.delay.connect(_this.feedback);

    _this.feedback.connect(_this.filter);

    _this.filter.connect(_this.delay);

    _this.delay.connect(master.gain); // @ts-ignore


    master.gain = _this.delay;
    return _this;
  }

  (0, _createClass2.default)(Delay, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, this.props.children);
    }
  }]);
  return Delay;
}(_react.Component);

Delay.displayName = "Delay";
(0, _defineProperty2.default)(Delay, "propTypes", {
  delayTime: _propTypes.default.number,
  feedback: _propTypes.default.number
});
(0, _defineProperty2.default)(Delay, "contextType", _ChannelStrip.ChannelContext);
(0, _defineProperty2.default)(Delay, "defaultProps", {
  delayTime: 0.2,
  feedback: 0.2
});
var _default = Delay;
exports.default = _default;