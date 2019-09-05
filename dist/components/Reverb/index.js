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

var _soundbankReverb = _interopRequireDefault(require("soundbank-reverb"));

var _ChannelStrip = require("../ChannelStrip");

//@ts-ignore
var Reverb =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Reverb, _Component);

  function Reverb(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Reverb);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Reverb).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "reverb", void 0);
    var decayTime = props.decayTime,
        wet = props.wet,
        dry = props.dry,
        filterType = props.filterType,
        cutoff = props.cutoff;
    var audioContext = context.audioContext,
        master = context.master;
    _this.reverb = (0, _soundbankReverb.default)(audioContext);

    _this.reverb.connect(master.gain);

    _this.reverb.time = decayTime;
    _this.reverb.wet.value = wet;
    _this.reverb.dry.value = dry;
    _this.reverb.filterType = filterType;
    _this.reverb.cutoff.value = cutoff;
    master.gain = _this.reverb;
    return _this;
  }

  (0, _createClass2.default)(Reverb, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, this.props.children);
    }
  }]);
  return Reverb;
}(_react.Component);

Reverb.displayName = "Reverb";
(0, _defineProperty2.default)(Reverb, "propTypes", {
  decayTime: _propTypes.default.number,
  wet: _propTypes.default.number,
  dry: _propTypes.default.number,
  filterType: _propTypes.default.string,
  cutoff: _propTypes.default.number
});
(0, _defineProperty2.default)(Reverb, "contextType", _ChannelStrip.ChannelContext);
(0, _defineProperty2.default)(Reverb, "defaultProps", {
  decayTime: 1,
  wet: 0.5,
  dry: 1,
  filterType: "highpass",
  cutoff: 100
});
var _default = Reverb;
exports.default = _default;