"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChannelContext = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Environment = require("../Environment");

var _Analyzer = _interopRequireDefault(require("../legacy/ui/Analyzer"));

var ChannelContext = _react.default.createContext({});

exports.ChannelContext = ChannelContext;

var ChannelStrip =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ChannelStrip, _Component);

  function ChannelStrip(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, ChannelStrip);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ChannelStrip).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "channel", void 0);
    var audioContext = context.audioContext,
        master = context.master;
    var gain = props.gain;
    _this.channel = audioContext.createGain();

    _this.channel.gain.setValueAtTime(gain, audioContext.currentTime);

    _this.channel.connect(master.gain);

    return _this;
  }

  (0, _createClass2.default)(ChannelStrip, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          withAnalyzer = _this$props.withAnalyzer,
          children = _this$props.children;
      return _react.default.createElement(ChannelContext.Provider, {
        value: {
          audioContext: this.context.audioContext,
          master: {
            gain: this.channel
          }
        }
      }, withAnalyzer && _react.default.createElement(_Analyzer.default, {
        audioContext: this.context.audioContext,
        masterGain: this.channel
      }), children);
    }
  }]);
  return ChannelStrip;
}(_react.Component);

ChannelStrip.displayName = "ChannelStrip";
(0, _defineProperty2.default)(ChannelStrip, "propTypes", {
  gain: _propTypes.default.number,
  withAnalyzer: _propTypes.default.bool
});
(0, _defineProperty2.default)(ChannelStrip, "contextType", _Environment.WebAudioContext);
(0, _defineProperty2.default)(ChannelStrip, "defaultProps", {
  gain: 0.8,
  withAnalyzer: false
});
var _default = ChannelStrip;
exports.default = _default;